import { LocaleDto } from 'api/model';
import { FormInput } from 'components/form/Form.model';

export const localeForm = (
  campaignId: string,
): FormInput<Required<LocaleDto>>[] => [
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
      return client.regions_GetRegions(campaignId);
    },
    name: 'region_id',
  },
];
