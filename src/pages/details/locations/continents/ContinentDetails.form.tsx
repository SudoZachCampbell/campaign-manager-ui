import { ContinentDto } from 'api/model';
import { FormInput } from 'components/form/Form.model';

export const continentForm = (
  campaignId: string,
): FormInput<Required<ContinentDto>>[] => [
  {
    name: 'name',
    label: 'Name',
    type: 'text',
    required: true,
  },
  {
    name: 'description',
    label: 'Description',
    type: 'textarea',
    required: false,
  },
  {
    type: 'idLookup',
    label: 'World',
    dataFetch: async (client) => {
      return client.worlds_GetWorlds(campaignId);
    },
    name: 'world_id',
  },
];
