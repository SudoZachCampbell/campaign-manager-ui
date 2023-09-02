import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { useDnDApi } from '../api/dndDb';
import { useAuth } from '../hooks/useAuth';
import './MonsterDetails.styles.scss';
import { MonstersClient } from '../api/client/MonstersClient';
import { Monster } from '../api/model/Monster';
import { MonsterType } from '../api/model/MonsterType';
import { Alignment } from '../api/model/Alignment';
import { GeneratedForm } from '../components/form/GeneratedForm';
import { monsterForm } from '../sections/monsterDetails/MonsterDetails.form';

interface MonsterDetailsProps {}

const client = new MonstersClient();

export const MonsterDetails = ({}: MonsterDetailsProps) => {
  const { id: monsterId } = useParams<{ id: string }>();
  const navigate = useNavigate();

  client.setAuthToken(useAuth().token);

  const {
    loading,
    invoke,
    response: monster,
  } = useDnDApi((id: string) => client.getMonsterById(id, null, ''));

  useEffect(() => {
    if (monsterId) {
      invoke();
    }
  }, [monsterId]);

  const form = useForm<Required<Monster>>({
    defaultValues: {
      alignment: Alignment.None,
      monsterType: MonsterType.None,
      strength: 10,
      dexterity: 10,
      constitution: 10,
      intelligence: 10,
      wisdom: 10,
      charisma: 10,
      armorClass: 0,
      hitPoints: 0,
    },
    mode: 'onBlur',
  });

  const updateMonster = async (payload: Monster) => {
    if (monsterId) {
    } else {
      await client.createMonster(payload);
      navigate(`/monsters`);
    }
  };

  return (
    <>
      <div>
        <h1>{monster?.name ?? 'Create Monster'}</h1>
      </div>
      <form onSubmit={form.handleSubmit(updateMonster)}>
        <div>
          <GeneratedForm
            formBuilder={monsterForm}
            control={form.control}
            errors={form.formState.errors}
          />
        </div>
        <input value="Create" type="submit" />
      </form>
    </>
  );
};
