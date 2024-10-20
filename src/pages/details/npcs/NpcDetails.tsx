import { useDnDApi } from 'api/dndDb';
import { Client, NpcDto } from 'api/model';
import { Button } from 'components/Button/Button';
import { GeneratedForm } from 'components/form/GeneratedForm';
import { useAuth } from 'hooks/useAuth';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import { npcForm } from './NpcDetails.form';

const client = new Client();

export const NpcDetails = () => {
  const { campaignId, npcId } = useParams<{
    campaignId: string;
    npcId: string;
  }>();
  const navigate = useNavigate();

  client.setAuthToken(useAuth().token);

  const {
    loading,
    invoke,
    response: npc,
  } = useDnDApi(() =>
    client.npcs_GetNpcById(campaignId ?? '', npcId ?? '', null, ''),
  );

  useEffect(() => {
    if (npcId) {
      invoke();
    }
  }, [npcId]);

  const form = useForm<Required<NpcDto>>({
    mode: 'onBlur',
  });

  const { formState, handleSubmit, reset } = form;
  useEffect(() => {
    if (npc) {
      reset(npc);
    }
  }, [npc]);

  const updateNpc = async (payload: NpcDto) => {
    if (campaignId) {
      payload = { ...payload, campaign_id: campaignId };
      if (npcId) {
        await client.npcs_UpdateNpcPUT(campaignId, npcId, payload);
      } else {
        await client.npcs_CreateNpc(campaignId, payload);
        navigate('../npcs');
      }
    }
  };

  return !loading ? (
    <div className="form__main-container--padding">
      <form onSubmit={handleSubmit(updateNpc)} className="form__main-container">
        <div className="form__header">
          <h1>{npc?.name ?? 'Create Npc'}</h1>
        </div>

        <div className="form__content">
          <GeneratedForm
            formBuilder={npcForm}
            form={form}
            errors={formState.errors}
          />
        </div>

        <div className="form__footer">
          <div>
            <Button styling="success" type="submit">
              {npcId ? 'Edit Npc' : 'Create'}
            </Button>
          </div>
        </div>
      </form>
    </div>
  ) : (
    <ClipLoader />
  );
};
