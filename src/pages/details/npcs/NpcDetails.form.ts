import { NpcDto } from 'api/model';
import { FormInput } from 'components/form/Form.model';

export const npcForm: FormInput<Required<NpcDto>>[] = [
  {
    name: 'epithet',
    label: 'Title',
    type: 'text',
    required: true,
    styling: {
      width: '5rem',
    },
  },
  {
    name: 'name',
    label: 'Name',
    type: 'text',
    required: true,
  },
  {
    name: 'lore',
    tabbed: true,
    label: 'Lore',
    type: 'subForm',
    fields: [
      {
        name: 'beliefs',
        label: 'Beliefs',
        type: 'textarea',
      },
      {
        name: 'useful_knowledge',
        label: 'Useful Knowledge',
        type: 'textarea',
      },
      {
        name: 'secrets',
        label: 'Secrets',
        type: 'textarea',
      },
      {
        name: 'background',
        label: 'Background',
        type: 'textarea',
      },
      {
        name: 'affiliations',
        label: 'Affiliations',
        type: 'textarea',
      },
      {
        name: 'occupation',
        label: 'Occupation',
        type: 'textarea',
      },
    ],
  },
  {
    name: 'attributes',
    tabbed: true,
    label: 'Attributes',
    type: 'subForm',
    fields: [
      {
        name: 'alive_status',
        label: 'Alive',
        type: 'boolean',
        defaultValue: true,
      },
      {
        name: 'race',
        label: 'Race',
        type: 'text',
        styling: {
          newRow: true,
        },
      },
      {
        name: 'age',
        label: 'Age',
        type: 'text',
      },
      {
        name: 'gender',
        label: 'Gender',
        type: 'text',
      },
      {
        name: 'appearance',
        label: 'Appearance',
        type: 'textarea',
      },
      {
        name: 'passions',
        label: 'Passions',
        type: 'textarea',
      },
      {
        name: 'flaws',
        label: 'Flaws',
        type: 'textarea',
      },
    ],
  },
];
