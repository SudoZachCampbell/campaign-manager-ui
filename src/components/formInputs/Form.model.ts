import { FieldValues, Path } from 'react-hook-form';

export interface FormSelectOption {
  label: string;
  value: string;
}

interface FormInputBase {
  label?: string;
}

export type FormInputText<T extends FieldValues> = FormInputBase & {
  name: Path<T extends any[] ? T[number] : T>;
  type: 'text';
};

export type FormInputNumber<T extends FieldValues> = FormInputBase & {
  name: Path<T extends any[] ? T[number] : T>;
  type: 'number';
  step?: string;
  min?: string;
  max?: string;
};

export type FormInputSelect<T extends FieldValues> = FormInputBase & {
  name: Path<T extends any[] ? T[number] : T>;
  type: 'select';
  options: FormSelectOption[];
};

export type FormFieldArray<T extends FieldValues> = FormInputBase &
  {
    [K in keyof T]: {
      type: 'fieldArray';
      name: K;
      fields: FormInput<T[K]>[];
    };
  }[keyof T];

export type FormInput<T extends FieldValues> =
  | FormInputText<T>
  | FormInputNumber<T>
  | FormInputSelect<T>
  | FormFieldArray<T>;
