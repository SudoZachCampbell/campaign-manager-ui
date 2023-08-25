import { useEffect, useState, useMemo, FC } from 'react';
import { useForm, UseFormReturn } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { useDnDApi } from '../api/dndDb';
import { useAuth } from '../hooks/useAuth';
import './MonsterDetails.styles.scss';
import { MonsterDetailsForm } from '../sections/monsterDetails/MonsterDetailsForm';
import { Link } from '../components/Link';
import _ from 'lodash';
import { MonsterActionsForm } from '../sections/monsterDetails/MonsterActionsForm';
import { MonstersClient } from '../api/client/monstersClient';
import { Monster } from '../api/model/monster';
import { MonsterType } from '../api/model/monsterType';
import { Alignment } from '../api/model/alignment';

interface MonsterDetailsProps {}

const client = new MonstersClient();

type MonsterDetailsTab =
  | 'details'
  | 'speed'
  | 'actions'
  | 'reactions'
  | 'legendaryActions'
  | 'specialAbilities';

const tabs: Record<MonsterDetailsTab, FC<{ form: UseFormReturn<Monster> }>> = {
  details: MonsterDetailsForm,
  speed: MonsterDetailsForm,
  actions: MonsterActionsForm,
  reactions: MonsterDetailsForm,
  legendaryActions: MonsterDetailsForm,
  specialAbilities: MonsterDetailsForm,
};

export const MonsterDetails = ({}: MonsterDetailsProps) => {
  const [currentTabName, setCurrentTabName] =
    useState<MonsterDetailsTab>('details');
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

  const form = useForm<Monster>({
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

  const ActiveTab = tabs[currentTabName];

  return (
    <>
      <div>
        <h1>{monster?.name ?? 'Create Monster'}</h1>
      </div>
      <div className="monsterdetails__container">
        <div className="monsterdetails__tabs">
          {Object.keys(tabs).map((tab) => (
            <Link
              className={`remove-formatting${
                currentTabName === tab ? ' selected' : ' unselected'
              }`}
              onClick={() => setCurrentTabName(tab as MonsterDetailsTab)}
            >
              {_.startCase(tab)}
            </Link>
          ))}
        </div>
        <div className="monsterdetails__form__container">
          <form onSubmit={form.handleSubmit(updateMonster)}>
            <ActiveTab form={form} />
            <input value="Create" type="submit" />
          </form>
        </div>
      </div>
    </>
  );
};
