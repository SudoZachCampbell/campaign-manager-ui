import { BuildingDto } from 'api/model';
import { FormInput } from 'components/form/Form.model';

export const buildingForm = (
  campaignId: string,
): FormInput<Required<BuildingDto>>[] => [
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
      return client.locales_GetLocales(campaignId);
    },
    name: 'locale_id',
  },
];
