import { FieldValues, Path } from 'react-hook-form';

export interface FormSelectOption {
  label: string;
  value: string;
}

interface FormInputBase {
  label: string;
  tabbed?: boolean;
  required?: boolean;
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

export type FormSubForm<T extends FieldValues> = FormInputBase &
  {
    [K in Extract<keyof T, string>]: {
      type: 'subForm';
      name: K;
      fields: FormInput<T[K]>[];
    };
  }[Extract<keyof T, string>];

export type FormFieldArray<T extends FieldValues> = FormInputBase &
  {
    [K in Extract<keyof T, string>]: {
      type: 'fieldArray';
      name: K;
      fields: FormInput<Required<T[K][number]>>[];
    };
  }[Extract<keyof T, string>];

export type FormInput<T extends FieldValues> =
  | FormInputText<T>
  | FormInputNumber<T>
  | FormInputSelect<T>
  | FormSubForm<T>
  | FormFieldArray<T>;
