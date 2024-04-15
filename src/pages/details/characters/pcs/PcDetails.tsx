import { GeneratedForm } from 'components/form/GeneratedForm';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import { useDnDApi } from '../../../../api/dndDb';
import { PcDto, PcsClient } from '../../../../api/model';
import { Button } from '../../../../components/Button/Button';
import { useAuth } from '../../../../hooks/useAuth';
import { pcForm } from './PcDetails.form';

const client = new PcsClient();

export const PcDetails = () => {
  const { campaignId, pcId } = useParams<{
    campaignId: string;
    pcId: string;
  }>();
  const navigate = useNavigate();

  client.setAuthToken(useAuth().token);

  const {
    loading,
    invoke,
    response: pc,
  } = useDnDApi(() => client.getPcById(campaignId ?? '', pcId ?? '', null, ''));

  useEffect(() => {
    if (pcId) {
      invoke();
    }
  }, [pcId]);

  const form = useForm<Required<PcDto>>({
    mode: 'onBlur',
  });

  const { formState, handleSubmit, reset } = form;

  useEffect(() => {
    if (pc) {
      reset(pc);
    }
  }, [pc]);

  const updatePc = async (payload: PcDto) => {
    if (campaignId) {
      payload = { ...payload, campaign_id: campaignId };
      if (pcId) {
        await client.updatePcPUT(campaignId, pcId, payload);
      } else {
        await client.createPc(campaignId, payload);
      }
      navigate('../pcs');
    }
  };

  return !loading ? (
    <>
      <form
        onSubmit={handleSubmit(updatePc)}
        className="monsterform__main-container"
      >
        <div className="monsterform__header">
          <h1>{pc?.name ?? 'Create Player Character'}</h1>
          <div>
            <Button type="submit">Create</Button>
          </div>
        </div>

        <div className="monsterform__content">
          <GeneratedForm
            formBuilder={pcForm}
            form={form}
            errors={formState.errors}
          />
        </div>
      </form>
    </>
  ) : (
    <ClipLoader />
  );
};
