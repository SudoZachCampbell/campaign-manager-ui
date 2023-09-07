import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import { useDnDApi } from '../../../api/dndDb';
import { Player, PlayersClient } from '../../../api/model';
import { Button } from '../../../components/Button/Button';
import { GeneratedForm } from '../../../components/form/GeneratedForm';
import { useAuth } from '../../../hooks/useAuth';
import { playerForm } from './PlayerDetails.form';

const client = new PlayersClient();

export const PlayerDetails = () => {
  const { id: playerId } = useParams<{ id: string }>();
  const navigate = useNavigate();

  client.setAuthToken(useAuth().token);

  const {
    loading,
    invoke,
    response: monster,
  } = useDnDApi((id: string) => client.getPlayerById(playerId ?? '', null, ''));

  useEffect(() => {
    if (playerId) {
      invoke();
    }
  }, [playerId]);

  const { control, formState, handleSubmit, reset } = useForm<Required<Player>>(
    {
      mode: 'onBlur',
    },
  );

  const updateMonster = async (payload: Player) => {
    console.log(`PlayerDetails.tsx:39 payload`, payload);
    // if (monsterId) {
    // } else {
    //   await client.createMonster(payload);
    //   navigate(`/monsters`);
    // }
  };

  return !loading ? (
    <>
      <form
        onSubmit={handleSubmit(updateMonster)}
        className="monsterform__main-container"
      >
        <div className="monsterform__header">
          <h1>{monster?.name ?? 'Create Player'}</h1>
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
