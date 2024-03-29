import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import { useDnDApi } from '../../../api/dndDb';
import { Pc, PcsClient } from '../../../api/model';
import { Button } from '../../../components/Button/Button';
import { GeneratedForm } from '../../../components/form/GeneratedForm';
import { useAuth } from '../../../hooks/useAuth';
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

  const { control, formState, handleSubmit, reset } = useForm<Required<Pc>>({
    mode: 'onBlur',
  });

  useEffect(() => {
    if (pc) {
      reset(pc);
    }
  }, [pc]);

  const updatePc = async (payload: Pc) => {
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
            <Button text="Create" submit type="submit" />
          </div>
        </div>

        <div className="monsterform__content">
          <GeneratedForm
            formBuilder={pcForm}
            control={control}
            errors={formState.errors}
          />
        </div>
      </form>
    </>
  ) : (
    <ClipLoader />
  );
};
