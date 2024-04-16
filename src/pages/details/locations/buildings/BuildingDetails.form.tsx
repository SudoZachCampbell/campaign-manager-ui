import { BuildingDto } from 'api/model';
import { FormInput } from 'components/form/Form.model';

export const buildingForm: FormInput<Required<BuildingDto>>[] = [
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
];
