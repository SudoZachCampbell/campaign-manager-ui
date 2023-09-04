import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { useDnDApi } from '../api/dndDb';
import { useAuth } from '../hooks/useAuth';
import './MonsterDetails.styles.scss';
import { MonstersClient, Monster, MonsterType, Alignment } from '../api/model';
import { GeneratedForm } from '../components/form/GeneratedForm';
import { monsterForm } from '../sections/monsterDetails/MonsterDetails.form';
import { ClipLoader } from 'react-spinners';
import { Select, SelectOption } from '../components/inputs/Select';
import { APIReference, FEClient } from '../api/FE/fe.model';

interface MonsterDetailsProps {}

const client = new MonstersClient();
const feClient = new FEClient();

export const MonsterDetails = ({}: MonsterDetailsProps) => {
  const [fEMonsters, setFEMonsters] = useState<APIReference[]>();

  const { id: monsterId } = useParams<{ id: string }>();
  const navigate = useNavigate();

  client.setAuthToken(useAuth().token);

  const collectOpenMonsters = async () => {
    const { results } = await feClient.monsters();
    setFEMonsters(results);
  };

  useEffect(() => {
    collectOpenMonsters();
  }, []);

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
    defaultValues: {
      alignment: Alignment.None,
      type: MonsterType.None,
      strength: 10,
      dexterity: 10,
      constitution: 10,
      intelligence: 10,
      wisdom: 10,
      charisma: 10,
      armor_class: 0,
      hit_points: 0,
    },
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
      <form
        onSubmit={handleSubmit(updateMonster)}
        className="form__main-container"
      >
        <div>
          <h1>{monster?.name ?? 'Create Monster'}</h1>
          {fEMonsters ? (
            <Select
              onChange={(event) => {
                feClient
                  .monsters2(event.target.value)
                  .then((monster) => setMonster(monster as unknown as Monster));
              }}
              options={fEMonsters.map<SelectOption>(({ index, name }) => ({
                value: index ?? '',
                label: name ?? '',
              }))}
            />
          ) : null}
        </div>
        <GeneratedForm
          formBuilder={monsterForm}
          control={control}
          errors={formState.errors}
        />
        <input value="Create" type="submit" />
      </form>
    </>
  ) : (
    <ClipLoader />
  );
};
