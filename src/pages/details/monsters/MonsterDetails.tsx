import { Modal } from '@mui/material';
import { APIReference, FEClient } from 'api/FE/fe.model';
import { useDnDApi } from 'api/dndDb';
import { Client, MonsterDto } from 'api/model';
import { Button } from 'components/Button/Button';
import { GeneratedForm } from 'components/form/GeneratedForm';
import { Select, SelectOption } from 'components/inputs/Select';
import { useAuth } from 'hooks/useAuth';
import 'pages/details/Details.styles.scss';
import { FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import { feToCampaignManagerMonsterMutator } from 'utils/dataAdapter';
import { monsterForm } from './MonsterDetails.form';

interface MonsterDetailsProps {}

const client = new Client();
const feClient = new FEClient();

export const MonsterDetails: FC<MonsterDetailsProps> = ({}) => {
  const [selectingMonster, setSelectingMonster] = useState<boolean>(false);

  const { id: monsterId } = useParams<{
    id: string;
    campaignId?: string;
  }>();
  const navigate = useNavigate();

  client.setAuthToken(useAuth().token);

  const {
    loading,
    invoke,
    response: monster,
  } = useDnDApi(() =>
    client.monsters_GetMonsterById(monsterId ?? '', null, ''),
  );

  useEffect(() => {
    if (monsterId) {
      invoke();
    }
  }, [monsterId]);

  const form = useForm<Required<MonsterDto>>({
    mode: 'onBlur',
  });

  const { formState, handleSubmit, reset } = form;

  useEffect(() => {
    if (monster) {
      reset(monster);
    }
  }, [monster]);

  const updateMonster = async (payload: MonsterDto) => {
    if (monsterId) {
      await client.monsters_UpdateMonsterPUT(monsterId, payload);
    } else {
      await client.monsters_CreateMonster(payload);
      navigate(`/compendium/monsters`);
    }
  };

  return !loading ? (
    <div className="form__main-container--padding">
      <MonsterModal
        open={selectingMonster}
        onClose={(monster?: MonsterDto) => {
          if (monster) {
            reset(monster);
          }
          setSelectingMonster(false);
        }}
      />
      <form
        onSubmit={handleSubmit(updateMonster)}
        className="form__main-container"
      >
        <div className="form__header">
          <h1>{monster?.name ?? 'Create Monster'}</h1>
          <Button type="info" onClick={(_) => setSelectingMonster(true)}>
            From Monster
          </Button>
        </div>

        <div className="form__content">
          <GeneratedForm
            formBuilder={monsterForm}
            form={form}
            errors={formState.errors}
          />
        </div>

        <div className="form__footer">
          <div>
            <Button type="submit">Create</Button>
          </div>
        </div>
      </form>
    </div>
  ) : (
    <ClipLoader />
  );
};

interface MonsterModalProps {
  open: boolean;
  onClose: (monster?: MonsterDto) => void;
}

const MonsterModal: FC<MonsterModalProps> = ({ open, onClose }) => {
  const [fEMonsters, setFEMonsters] = useState<APIReference[]>();
  const [monster, setMonster] = useState<MonsterDto>();

  const collectOpenMonsters = async () => {
    const { results } = await feClient.monsters();
    setFEMonsters(results);
  };

  useEffect(() => {
    collectOpenMonsters();
  }, []);

  return (
    <Modal open={open} onClose={() => onClose(monster)}>
      <div className="monsterform__modal">
        <Select
          onChange={(event) => {
            feClient
              .monsters2(event.target.value)
              .then((monster) =>
                setMonster(feToCampaignManagerMonsterMutator(monster)),
              );
          }}
          options={
            fEMonsters?.map<SelectOption>(({ index, name }) => ({
              value: index ?? '',
              label: name ?? '',
            })) ?? []
          }
        />
      </div>
    </Modal>
  );
};
