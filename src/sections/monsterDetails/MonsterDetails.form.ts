import { FormInput } from '../../components/form/Form.model';
import _ from 'lodash';
import { Monster } from '../../api/model/Monster';
import { MonsterType } from '../../api/model/MonsterType';
import { Size } from '../../api/model/Size';
import { Alignment } from '../../api/model/Alignment';

export const monsterForm: FormInput<Required<Monster>>[] = [
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
    tabbed: true,
    fields: [
      {
        type: 'text',
        label: 'Name',
        name: 'name',
      },
      {
        type: 'text',
        name: 'type',
        label: 'Type',
      },
      {
        type: 'number',
        name: 'count',
        label: 'Count',
      },
      {
        type: 'fieldArray',
        name: 'damage',
        fields: [
          {
            name: 'damageDice',
            label: 'Damage Dice',
            type: 'text',
          },
        ],
      },
    ],
  },
  {
    name: 'legendaryActions',
    type: 'fieldArray',
    tabbed: true,
    fields: [
      {
        type: 'text',
        label: 'Name',
        name: 'name',
      },
      {
        type: 'text',
        name: 'type',
        label: 'Type',
      },
      {
        type: 'number',
        name: 'count',
        label: 'Count',
      },
      {
        type: 'fieldArray',
        name: 'damage',
        fields: [
          {
            name: 'damageDice',
            label: 'Damage Dice',
            type: 'text',
          },
        ],
      },
    ],
  },
  {
    name: 'proficiencies',
    type: 'fieldArray',
    tabbed: true,
    fields: [
      { name: 'name', type: 'text', label: 'Name' },
      { name: 'value', type: 'number', label: 'Value' },
    ],
  },
];
