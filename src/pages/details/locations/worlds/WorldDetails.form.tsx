import { WorldDto } from 'api/model';
import { FormInput } from 'components/form/Form.model';

export const worldForm: FormInput<Required<WorldDto>>[] = [
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
