import { useDnDApi } from 'api/dndDb';
import { Client, PcDto } from 'api/model';
import { Button } from 'components/Button/Button';
import { GeneratedForm } from 'components/form/GeneratedForm';
import { useAuth } from 'hooks/useAuth';
import 'pages/details/Details.styles.scss';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import { pcForm } from './PcDetails.form';

const client = new Client();

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
  } = useDnDApi(() =>
    client.pcs_GetPcById(campaignId ?? '', pcId ?? '', null, ''),
  );

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
        await client.pcs_UpdatePcPUT(campaignId, pcId, payload);
      } else {
        await client.pcs_CreatePc(campaignId, payload);
      }
      navigate('../pcs');
    }
  };

  return !loading ? (
    <div className="form__main-container--padding">
      <form onSubmit={handleSubmit(updatePc)} className="form__main-container">
        <div className="form__header">
          <h1>{pc?.name ?? 'Create Player Character'}</h1>
        </div>

        <div className="form__content">
          <GeneratedForm
            formBuilder={pcForm}
            form={form}
            errors={formState.errors}
          />
        </div>

        <div className="form__footer">
          <div>
            <Button styling="success" type="submit">
              {pcId ? 'Edit Pc' : 'Create'}
            </Button>
          </div>
        </div>
      </form>
    </div>
  ) : (
    <ClipLoader />
  );
};
