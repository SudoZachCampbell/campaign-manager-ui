import { Typography } from '@mui/material';
import _ from 'lodash';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { Campaign, CampaignType, Monster, MonstersClient } from '../api/Model';
import { ApiType, useDnDApi } from '../api/dndDb';
import { FormSelect } from '../components/formInputs/FormSelect';
import { FormTextField } from '../components/formInputs/FormTextField';
import { useAuth } from '../hooks/useAuth';
import Details from '../layouts/Details';

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

  const { handleSubmit, control } = useForm<Monster>({ mode: 'onBlur' });

  const updateMonster = async (payload: Monster) => {
    if (monsterId) {
    } else {
      await client.createMonster(payload);
      navigate(`/monsters`);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(updateMonster)}>
        <Controller
          name='name'
          control={control}
          render={({ field: { onChange, onBlur, name, value } }) => (
            <FormTextField
              onChange={onChange}
              onBlur={onBlur}
              name={name}
              value={value}
              label='Name'
            />
          )}
        />
        <Controller
          name='type'
          control={control}
          render={({ field: { onChange, onBlur, name, value } }) => (
            <FormSelect
              onChange={onChange}
              onBlur={onBlur}
              name={name}
              value={value}
              options={Object.values(CampaignType).map((type) => ({
                value: type.toString(),
                label: _.startCase(type.toString()),
              }))}
            />
          )}
        />
        <input value='Create' type='submit' />
      </form>
    </div>
  );
};
