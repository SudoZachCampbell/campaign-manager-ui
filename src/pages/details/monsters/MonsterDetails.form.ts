import { AlignmentDto, MonsterDto, MonsterTypeDto, SizeDto } from 'api/model';
import { FormInput } from 'components/form/Form.model';
import { generateOptionsFromEnum } from 'components/form/Form.utils';

export const monsterForm: FormInput<Required<MonsterDto>>[] = [
  {
    name: 'name',
    label: 'Name',
    type: 'text',
  },
  {
    name: 'type',
    label: 'Monster Type',
    type: 'select',
    options: generateOptionsFromEnum(MonsterTypeDto),
    defaultValue: MonsterTypeDto.None,
    styling: {
      newRow: true,
    },
  },
  {
    name: 'alignment',
    label: 'Alignment',
    type: 'select',
    options: generateOptionsFromEnum(AlignmentDto),
    defaultValue: AlignmentDto.Unaligned,
  },
  {
    name: 'size',
    label: 'Size',
    type: 'select',
    options: generateOptionsFromEnum(SizeDto),
    defaultValue: SizeDto.Tiny,
  },
  {
    name: 'strength',
    label: 'Strength',
    type: 'number',
    step: '1',
    max: '30',
    min: '0',
    defaultValue: 10,
    styling: {
      newRow: true,
    },
  },
  {
    name: 'dexterity',
    label: 'Dexterity',
    type: 'number',
    step: '1',
    max: '30',
    min: '0',
    defaultValue: 10,
  },
  {
    name: 'constitution',
    label: 'Constitution',
    type: 'number',
    step: '1',
    max: '30',
    min: '0',
    defaultValue: 10,
  },
  {
    name: 'intelligence',
    label: 'Intelligence',
    type: 'number',
    step: '1',
    max: '30',
    min: '0',
    defaultValue: 10,
    styling: {
      newRow: true,
    },
  },
  {
    name: 'wisdom',
    label: 'Wisdom',
    type: 'number',
    step: '1',
    max: '30',
    min: '0',
    defaultValue: 10,
  },
  {
    name: 'charisma',
    label: 'Charisma',
    type: 'number',
    step: '1',
    max: '30',
    min: '0',
    defaultValue: 10,
  },
  {
    name: 'challenge_rating',
    label: 'CR',
    type: 'number',
    min: '0',
    defaultValue: 10,
    styling: {
      newRow: true,
    },
  },
  {
    name: 'armor_class',
    label: 'AC',
    type: 'number',
    step: '1',
    min: '0',
    defaultValue: 10,
  },
  {
    name: 'hit_points',
    label: 'HP',
    type: 'number',
    step: '1',
    min: '0',
    defaultValue: 0,
  },
  {
    name: 'hit_dice',
    label: 'Hit Dice',
    type: 'text',
    styling: {
      width: '10%',
    },
  },
  {
    name: 'languages',
    label: 'Languages',
    type: 'textarea',
  },
  {
    name: 'senses',
    label: 'Senses',
    type: 'fieldArray',
    tabbed: true,
    titleField: 'name',
    fields: [
      {
        type: 'text',
        label: 'Name',
        name: 'name',
      },
      {
        type: 'text',
        name: 'value',
        label: 'Value',
        styling: {
          width: '10%',
          newRow: true,
        },
      },
    ],
  },
  {
    name: 'speed',
    label: 'Speed',
    type: 'fieldArray',
    tabbed: true,
    titleField: 'name',
    fields: [
      {
        type: 'text',
        label: 'Name',
        name: 'name',
      },
      {
        type: 'number',
        name: 'value',
        label: 'Value',
        step: '1',
      },
      {
        type: 'text',
        name: 'measurement',
        label: 'Value',
      },
    ],
  },
  {
    name: 'actions',
    label: 'Actions',
    type: 'fieldArray',
    tabbed: true,
    titleField: 'name',
    fields: [
      {
        type: 'text',
        label: 'Name',
        name: 'name',
      },
      {
        type: 'text',
        name: 'desc',
        label: 'Description',
      },
      {
        type: 'text',
        name: 'multiattack_type',
        label: 'Type',
      },
      {
        type: 'number',
        name: 'count',
        label: 'Count',
      },
      {
        type: 'subForm',
        name: 'usage',
        label: 'Usage',
        fields: [
          {
            name: 'type',
            label: 'Type',
            type: 'text',
          },
          {
            name: 'dice',
            label: 'Dice',
            type: 'text',
          },
          {
            name: 'min_value',
            label: 'Min Value',
            type: 'number',
          },
        ],
      },
      {
        name: 'damage',
        label: 'Damage',
        type: 'fieldArray',
        titleField: 'damage_dice',
        fields: [
          {
            name: 'damage_dice',
            label: 'Damage Dice',
            type: 'text',
          },
        ],
      },
      {
        name: 'actions',
        label: 'Sub Actions',
        type: 'fieldArray',
        titleField: 'action_name',
        fields: [
          {
            name: 'action_name',
            label: 'Name',
            type: 'text',
          },
          {
            name: 'count',
            label: 'Count',
            type: 'number',
          },
        ],
      },
    ],
  },
  {
    name: 'reactions',
    label: 'Reactions',
    type: 'fieldArray',
    titleField: 'name',
    tabbed: true,
    fields: [
      {
        name: 'name',
        label: 'Name',
        type: 'text',
      },
      {
        name: 'desc',
        label: 'Description',
        type: 'text',
      },
    ],
  },
  {
    name: 'special_abilities',
    label: 'Special Abilities',
    type: 'fieldArray',
    tabbed: true,
    titleField: 'name',
    fields: [
      {
        type: 'text',
        label: 'Name',
        name: 'name',
      },
      {
        type: 'text',
        name: 'desc',
        label: 'Description',
      },
      {
        type: 'subForm',
        name: 'usage',
        label: 'Usage',
        fields: [
          {
            name: 'type',
            label: 'Type',
            type: 'text',
          },
          {
            name: 'times',
            label: 'Times',
            type: 'number',
          },
          {
            name: 'min_value',
            label: 'Min Value',
            type: 'number',
          },
        ],
      },
    ],
  },
  {
    name: 'legendary_actions',
    label: 'Legendary Actions',
    type: 'fieldArray',
    tabbed: true,
    titleField: 'name',
    fields: [
      {
        type: 'text',
        label: 'Name',
        name: 'name',
      },
      {
        type: 'text',
        name: 'desc',
        label: 'Description',
      },
      {
        type: 'text',
        name: 'multiattack_type',
        label: 'Type',
      },
      {
        type: 'number',
        name: 'count',
        label: 'Count',
      },
      {
        type: 'fieldArray',
        label: 'Damage',
        name: 'damage',
        titleField: 'damage_dice',
        fields: [
          {
            name: 'damage_dice',
            label: 'Damage Dice',
            type: 'text',
          },
        ],
      },
    ],
  },
  {
    name: 'proficiencies',
    label: 'Proficiencies',
    type: 'fieldArray',
    tabbed: true,
    titleField: 'name',
    fields: [
      { name: 'name', type: 'text', label: 'Name' },
      { name: 'value', type: 'number', label: 'Value' },
    ],
  },
];
