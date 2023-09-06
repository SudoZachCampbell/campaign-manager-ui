import { FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { useDnDApi } from '../../../api/dndDb';
import { useAuth } from '../../../hooks/useAuth';
import './MonsterDetails.styles.scss';
import {
  MonstersClient,
  Monster,
  MonsterType,
  Alignment,
} from '../../../api/model';
import { GeneratedForm } from '../../../components/form/GeneratedForm';
import { monsterForm } from './MonsterDetails.form';
import { ClipLoader } from 'react-spinners';
import { APIReference, FEClient } from '../../../api/FE/fe.model';
import { Button } from '../../../components/Button/Button';
import { Modal } from '@mui/material';
import { Select, SelectOption } from '../../../components/inputs/Select';

interface MonsterDetailsProps {}

const client = new MonstersClient();
const feClient = new FEClient();

export const MonsterDetails: FC<MonsterDetailsProps> = ({}) => {
  const [selectingMonster, setSelectingMonster] = useState<boolean>(false);

  const { id: monsterId } = useParams<{ id: string }>();
  const navigate = useNavigate();

  client.setAuthToken(useAuth().token);

  const {
    loading,
    invoke,
    response: monster,
  } = useDnDApi((id: string) =>
    client.getMonsterById(monsterId ?? '', null, ''),
  );

  useEffect(() => {
    if (monsterId) {
      invoke();
    }
  }, [monsterId]);

  const { control, formState, handleSubmit, reset } = useForm<
    Required<Monster>
  >({
    mode: 'onBlur',
  });

  const setMonster = (newMonster: Monster) => {
    reset(newMonster);
  };

  useEffect(() => {
    if (monster) {
      setMonster(monster);
    }
  }, [monster]);

  const updateMonster = async (payload: Monster) => {
    console.log(`MonsterDetails.tsx:53 payload`, payload);
    // if (monsterId) {
    // } else {
    //   await client.createMonster(payload);
    //   navigate(`/monsters`);
    // }
  };

  return !loading ? (
    <>
      <MonsterModal
        open={selectingMonster}
        onClose={(monster?: Monster) => {
          if (monster) {
            setMonster(monster);
          }
          setSelectingMonster(false);
        }}
      />
      <form
        onSubmit={handleSubmit(updateMonster)}
        className="monsterform__main-container"
      >
        <div className="monsterform__header">
          <h1>{monster?.name ?? 'Create Monster'}</h1>
          <div>
            <Button
              text="From Monster"
              type="info"
              onClick={(_) => setSelectingMonster(true)}
            />
            <Button text="Create" submit type="submit" />
          </div>
        </div>

        <div className="monsterform__content">
          <GeneratedForm
            formBuilder={monsterForm}
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

interface MonsterModalProps {
  open: boolean;
  onClose: (monster?: Monster) => void;
}

const MonsterModal: FC<MonsterModalProps> = ({ open, onClose }) => {
  const [fEMonsters, setFEMonsters] = useState<APIReference[]>();
  const [monster, setMonster] = useState<Monster>();

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
              .then((monster) => setMonster(monster as unknown as Monster));
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
