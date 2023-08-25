import { Path } from 'react-hook-form';

export interface FormSelectOption {
  label: string;
  value: string;
}

interface FormInputBase<T> {
  name: Path<T>;
  label?: string;
}

interface FormInputText<T> extends FormInputBase<T> {
  type: 'text';
}

interface FormInputNumber<T> extends FormInputBase<T> {
  type: 'number';
  step?: string;
  min?: string;
  max?: string;
}

interface FormInputSelect<T> extends FormInputBase<T> {
  type: 'select';
  options: FormSelectOption[];
}

interface FormFieldArray<T> extends FormInputBase<T> {
  type: 'fieldArray';
  fields: FormInput<keyof T>[];
}

export type FormInput<T> =
  | FormInputText<T>
  | FormInputNumber<T>
  | FormInputSelect<T>
  | FormFieldArray<T>;
