import React from 'react';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Field } from '../../../interfaces/Models';
import { useDnDApi } from '../../../api/dndDb';
import _ from 'lodash';
import { FieldType } from '../../../interfaces/Lookups';
import { NpcsClient, Npc } from '../../../api/model';
import { useAuth } from '../../../hooks/useAuth';
import { useForm } from 'react-hook-form';
import { GeneratedForm } from '../../../components/form/GeneratedForm';
import { Button } from '../../../components/Button/Button';
import { ClipLoader } from 'react-spinners';
import { npcForm } from './NpcDetails.form';

const client = new NpcsClient();

export const NpcDetails = () => {
  const { id: npcId } = useParams<{ id: string }>();
  const navigate = useNavigate();

  client.setAuthToken(useAuth().token);

  const {
    loading,
    invoke,
    response: monster,
  } = useDnDApi((id: string) => client.getNpcById(npcId ?? '', null, ''));

  useEffect(() => {
    if (npcId) {
      invoke();
    }
  }, [npcId]);

  const { control, formState, handleSubmit, reset } = useForm<Required<Npc>>({
    mode: 'onBlur',
  });

  const updateMonster = async (payload: Npc) => {
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
        className="monsterform__main-container"
      >
        <div className="monsterform__header">
          <h1>{monster?.name ?? 'Create Npc'}</h1>
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
