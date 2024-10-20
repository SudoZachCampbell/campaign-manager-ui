import { BaseDto, Client } from 'api/model';
import { CSSProperties } from 'react';
import { FieldValues, Path } from 'react-hook-form';

export interface FormSelectOption {
  label: string;
  value: string;
}

interface FormInputBase {
  label: string;
  tabbed?: boolean;
  required?: boolean;
  styling?: {
    width?: CSSProperties['width'];
    newRow?: boolean;
  };
}

export type FormInputText<T extends FieldValues> = FormInputBase & {
  name: Path<T extends any[] ? T[number] : T>;
  type: 'text';
  defaultValue?: string;
};

export type FormIdLookup<T extends FieldValues> = FormInputBase & {
  name: Path<T extends any[] ? T[number] : T>;
  type: 'idLookup';
  dataFetch: (client: Client) => Promise<BaseDto[]>;
  defaultValue?: string;
};

export type FormInputTextArea<T extends FieldValues> = FormInputBase & {
  name: Path<T extends any[] ? T[number] : T>;
  type: 'textarea';
  defaultValue?: string;
};

export type FormInputNumber<T extends FieldValues> = FormInputBase & {
  name: Path<T extends any[] ? T[number] : T>;
  type: 'number';
  step?: string;
  min?: string;
  max?: string;
  defaultValue?: number;
};

export type FormInputBoolean<T extends FieldValues> = FormInputBase & {
  name: Path<T extends any[] ? T[number] : T>;
  type: 'boolean';
  defaultValue: boolean;
};

export type FormInputSelect<T extends FieldValues> = FormInputBase & {
  name: Path<T extends any[] ? T[number] : T>;
  type: 'select';
  options: FormSelectOption[];
  defaultValue: string;
};

export type FormSubForm<T extends FieldValues> = FormInputBase &
  {
    [K in Extract<keyof T, string>]: {
      type: 'subForm';
      name: K;
      fields: FormInput<T[K]>[];
      defaultValue?: K;
    };
  }[Extract<keyof T, string>];

export type FormFieldArray<T extends FieldValues> = FormInputBase &
  {
    [K in Extract<keyof T, string>]: {
      type: 'fieldArray';
      name: K;
      fields: FormInput<Required<T[K][number]>>[];
      titleField: Extract<keyof T[K][number], string>;
    };
  }[Extract<keyof T, string>];

export type FormInput<T extends FieldValues> =
  | FormInputText<T>
  | FormInputTextArea<T>
  | FormInputNumber<T>
  | FormInputBoolean<T>
  | FormInputSelect<T>
  | FormSubForm<T>
  | FormFieldArray<T>
  | FormIdLookup<T>;
