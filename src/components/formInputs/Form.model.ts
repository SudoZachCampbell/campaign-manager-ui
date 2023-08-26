import { ArrayPath, FieldValues, Path } from 'react-hook-form';

export interface FormSelectOption {
  label: string;
  value: string;
}

interface FormInputBase {
  label?: string;
}

interface FormInputText<T> extends FormInputBase {
  name: Path<T>;
  type: 'text';
}

interface FormInputNumber<T> extends FormInputBase {
  name: Path<T>;
  type: 'number';
  step?: string;
  min?: string;
  max?: string;
}

interface FormInputSelect<T> extends FormInputBase {
  name: Path<T>;
  type: 'select';
  options: FormSelectOption[];
}

type FormFieldArray<T> = FormInputBase &
  {
    [K in keyof T]: {
      type: 'fieldArray';
      name: K;
      fields: FormInput<T[K]>[];
    };
  }[keyof T];

export type FormInput<T> =
  | FormInputText<T>
  | FormInputNumber<T>
  | FormInputSelect<T>
  | FormFieldArray<T>;
