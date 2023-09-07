import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import { useDnDApi } from '../../../api/dndDb';
import { Pc, PcsClient } from '../../../api/model';
import { Button } from '../../../components/Button/Button';
import { GeneratedForm } from '../../../components/form/GeneratedForm';
import { useAuth } from '../../../hooks/useAuth';
import { playerForm } from './PlayerDetails.form';

const client = new PcsClient();

export const PlayerDetails = () => {
  const { id: pcId } = useParams<{ id: string }>();
  const navigate = useNavigate();

  client.setAuthToken(useAuth().token);

  const {
    loading,
    invoke,
    response: pc,
  } = useDnDApi(() => client.getPcById(pcId ?? '', null, ''));

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

  const updatePlayer = async (payload: Pc) => {
    if (pcId) {
      await client.updatePcPUT(pcId, payload);
    } else {
      await client.createPc(payload);
    }
    navigate('/players');
  };

  return !loading ? (
    <>
      <form
        onSubmit={handleSubmit(updatePlayer)}
        className="monsterform__main-container"
      >
        <div className="monsterform__header">
          <h1>{pc?.name ?? 'Create Player'}</h1>
          <div>
            <Button text="Create" submit type="submit" />
          </div>
        </div>

        <div className="monsterform__content">
          <GeneratedForm
            formBuilder={playerForm}
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
