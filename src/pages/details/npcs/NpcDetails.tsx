import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import { useDnDApi } from '../../../api/dndDb';
import { Npc, NpcsClient } from '../../../api/model';
import { Button } from '../../../components/Button/Button';
import { GeneratedForm } from '../../../components/form/GeneratedForm';
import { useAuth } from '../../../hooks/useAuth';
import { npcForm } from './NpcDetails.form';

const client = new NpcsClient();

export const NpcDetails = () => {
  const { id: npcId } = useParams<{ id: string }>();
  const navigate = useNavigate();

  client.setAuthToken(useAuth().token);

  const {
    loading,
    invoke,
    response: npc,
  } = useDnDApi(() => client.getNpcById(npcId ?? '', null, ''));

  useEffect(() => {
    if (npcId) {
      invoke();
    }
  }, [npcId]);

  const { control, formState, handleSubmit, reset } = useForm<Required<Npc>>({
    mode: 'onBlur',
  });

  useEffect(() => {
    if (npc) {
      reset(npc);
    }
  }, [npc]);

  const updateNpc = async (payload: Npc) => {
    if (npcId) {
      await client.updateNpcPUT(npcId, payload);
    } else {
      await client.createNpc(payload);
      navigate(`/npcs`);
    }
  };

  return !loading ? (
    <>
      <form
        onSubmit={handleSubmit(updateNpc)}
        className="monsterform__main-container"
      >
        <div className="monsterform__header">
          <h1>{npc?.name ?? 'Create Npc'}</h1>
          <div>
            <Button text="Create" submit type="submit" />
          </div>
        </div>

        <div className="monsterform__content">
          <GeneratedForm
            formBuilder={npcForm}
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
