import * as React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Field } from '../interfaces/Models';
import { Typography } from '@mui/material';
import { ApiType, useDnDApi } from '../api/dndDb';
import _ from 'lodash';
import Details from '../layouts/Details';
import { FieldType } from '../interfaces/Lookups';
import { Monster, MonstersClient } from '../api/Model';

const ignoreFields: string[] = [
  'picture',
  'buildings',
  'locales',
  'npcs',
  'reactions',
  'speed',
  'proficiencies',
  'actions',
  'legendary_actions',
  'special_abilities',
];

const expand = ['Buildings', 'Locales'];

const client = new MonstersClient();

const fields: Field<Monster>[] = [
  {
    name: 'name',
    type: FieldType.String,
  },
  {
    name: 'size',
    type: FieldType.String,
  },
  {
    name: 'hitDice',
    type: FieldType.String,
  },
  {
    name: 'languages',
    type: FieldType.String,
  },
  {
    name: 'challengeRating',
    type: FieldType.Number,
  },
  {
    name: 'passivePerception',
    type: FieldType.Number,
  },
  {
    name: 'monsterType',
    type: FieldType.Enum,
  },
  {
    name: 'strength',
    type: FieldType.Number,
  },
  {
    name: 'dexterity',
    type: FieldType.Number,
  },
  {
    name: 'constitution',
    type: FieldType.Number,
  },
  {
    name: 'intelligence',
    type: FieldType.Number,
  },
  {
    name: 'wisdom',
    type: FieldType.Number,
  },
  {
    name: 'charisma',
    type: FieldType.Number,
  },
  {
    name: 'armorClass',
    type: FieldType.String,
  },
  {
    name: 'hitPoints',
    type: FieldType.String,
  },
  {
    name: 'alignment',
    type: FieldType.Enum,
  },
];

interface MonsterDetailsProps {}

export default function MonsterDetails() {
  const { id: monsterId } = useParams<{ id: string }>();

  const {
    loading,
    invoke,
    response: monster,
  } = useDnDApi((id: string) => client.getMonsterById(id, expand.join(',')));

  useEffect(() => {
    invoke(monsterId);
  }, [monsterId]);

  const tabs = {
    headers: ['Pictures', 'Location'],
    data: [<Pictures />, <Location />],
  };

  const loadingCheck = loading ? (
    <Typography>Loading</Typography>
  ) : monster ? (
    <Details
      entity={monster}
      type={ApiType.MONSTER}
      ignoreFields={ignoreFields}
      expand={expand}
      tabs={tabs}
      fields={fields}
      onSave={() => {}}
    />
  ) : (
    <p>Error loading monster</p>
  );

  return loadingCheck;
}

function Pictures() {
  return <Typography>Test Pictures</Typography>;
}

function Location() {
  return <Typography>Test Location</Typography>;
}
