import { AlignmentDto, PcDto, SizeDto } from 'api/model';
import { FormInput } from 'components/form/Form.model';
import _ from 'lodash';

export const pcForm: FormInput<Required<PcDto>>[] = [
  {
    name: 'name',
    label: 'Character Name',
    type: 'text',
  },
  {
    name: 'level',
    label: 'Level',
    type: 'number',
  },
  {
    name: 'background',
    label: 'Background',
    type: 'text',
  },
  {
    name: 'faction',
    label: 'Faction',
    type: 'text',
  },
  {
    name: 'race',
    label: 'Race',
    type: 'text',
  },
  {
    name: 'xp',
    label: 'XP',
    type: 'number',
  },
  {
    name: 'inspiration',
    label: 'Inspiration',
    type: 'boolean',
    defaultValue: false,
  },
  {
    name: 'alignment',
    label: 'Alignment',
    type: 'select',
    options: Object.values(AlignmentDto).map((value) => ({
      value: value.toString(),
      label: _.startCase(value.toString()),
    })),
    defaultValue: AlignmentDto.Unaligned,
  },
  {
    name: 'size',
    label: 'Size',
    type: 'select',
    options: Object.values(SizeDto).map((value) => ({
      value: value.toString(),
      label: _.startCase(value.toString()),
    })),
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
    name: 'armor_class',
    label: 'Armor Class',
    type: 'number',
    step: '1',
    min: '0',
    defaultValue: 10,
  },
  {
    name: 'hit_points',
    label: 'Hit Points',
    type: 'number',
    step: '1',
    min: '0',
    defaultValue: 0,
  },
  {
    name: 'hit_dice',
    label: 'Hit Dice',
    type: 'text',
  },
  {
    name: 'languages',
    label: 'Languages',
    type: 'textarea',
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
    name: 'reactions',
    label: 'Reactions',
    type: 'fieldArray',
    tabbed: true,
    titleField: 'name',
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
