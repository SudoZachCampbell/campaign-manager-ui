import { LocaleDto } from 'api/model';
import { FormInput } from 'components/form/Form.model';

export const localeForm: FormInput<Required<LocaleDto>>[] = [
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
