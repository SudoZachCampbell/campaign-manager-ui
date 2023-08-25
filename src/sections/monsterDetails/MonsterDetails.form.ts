import { FormInput } from '../../components/formInputs/Form.model';
import _ from 'lodash';
import { Controller } from 'react-hook-form';
import { FormTextField } from '../../components/formInputs/FormTextField';
import { Monster } from '../../api/model/monster';
import { MonsterType } from '../../api/model/monsterType';
import { Size } from '../../api/model/size';
import { Alignment } from '../../api/model/alignment';

export const monsterForm: FormInput<Monster>[] = [
  {
    name: 'name',
    label: 'Name',
    type: 'text',
  },
  {
    name: 'monsterType',
    label: 'Monster Type',
    type: 'select',
    options: Object.values(MonsterType).map((monsterType) => ({
      value: monsterType.toString(),
      label: _.startCase(monsterType.toString()),
    })),
  },
  {
    name: 'alignment',
    type: 'select',
    options: Object.values(Alignment).map((monsterType) => ({
      value: monsterType.toString(),
      label: _.startCase(monsterType.toString()),
    })),
  },
  {
    name: 'size',
    type: 'select',
    options: Object.values(Size).map((monsterType) => ({
      value: monsterType.toString(),
      label: _.startCase(monsterType.toString()),
    })),
  },
  {
    name: 'strength',
    label: 'Strength',
    type: 'number',
    step: '1',
    max: '20',
    min: '0',
  },
  {
    name: 'dexterity',
    label: 'Dexterity',
    type: 'number',
    step: '1',
    max: '20',
    min: '0',
  },
  {
    name: 'constitution',
    label: 'Constitution',
    type: 'number',
    step: '1',
    max: '20',
    min: '0',
  },
  {
    name: 'intelligence',
    label: 'Intelligence',
    type: 'number',
    step: '1',
    max: '20',
    min: '0',
  },
  {
    name: 'wisdom',
    label: 'Wisdom',
    type: 'number',
    step: '1',
    max: '20',
    min: '0',
  },
  {
    name: 'charisma',
    label: 'Charisma',
    type: 'number',
    step: '1',
    max: '20',
    min: '0',
  },
  {
    name: 'passivePerception',
    label: 'Passive Perception',
    step: '1',
    type: 'number',
    min: '0',
  },
  {
    name: 'challengeRating',
    label: 'Challenge Rating',
    type: 'number',
    min: '0',
  },
  {
    name: 'armorClass',
    label: 'Armor Class',
    type: 'number',
    step: '1',
    min: '0',
  },
  {
    name: 'hitPoints',
    label: 'Hit Points',
    type: 'number',
    step: '1',
    min: '0',
  },
  {
    name: 'hitDice',
    label: 'Hit Dice',
    type: 'text',
  },
  {
    name: 'languages',
    label: 'Languages',
    type: 'text',
  },
  {
    name: 'proficiencies',
    label: 'Proficiencies',
    type: 'text',
  },
  {
    name: 'actions',
    type: 'fieldArray',
    fields: [
      {
        type: 'text',
        label: 'Name',
        name: 'name',
      },
      {
        type: 'text',
        label: 'Type',
        name: 'type',
      },
    ],
  },
];
