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

interface FormFieldArray<T extends any[]> extends FormInputBase {
  type: 'fieldArray';
  name: ArrayPath<T>;
  fields: FormInput<ValueOf<T>>[];
}

type ValueOf<T extends any[]> = T[number];

export type FormInput<T> = T[keyof T] extends any[]
  ? FormFieldArray<T[keyof T]>
  : FormInputText<T> | FormInputNumber<T> | FormInputSelect<T>;
