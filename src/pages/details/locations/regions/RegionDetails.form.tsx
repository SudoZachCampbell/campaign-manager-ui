import { RegionDto } from 'api/model';
import { FormInput } from 'components/form/Form.model';

export const regionForm = (
  campaignId: string,
): FormInput<Required<RegionDto>>[] => [
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
    label: 'Continent',
    dataFetch: async (client) => {
      return client.continents_GetContinents(campaignId);
    },
    name: 'continent_id',
  },
];
