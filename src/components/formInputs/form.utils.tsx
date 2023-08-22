import {
  Control,
  Controller,
  FieldValues,
  Path,
  UseFormReturn,
} from 'react-hook-form';
import { FormTextField } from './FormTextField';
import { Monster, MonsterType } from '../../api/Model';
import _ from 'lodash';
import { FormSelect } from './FormSelect';

interface FormSelectOption {
  label: string;
  value: string;
}

export type FormInput<T> = {
  name: Path<T>;
  label: string;
} & (
  | {
      type: 'text';
    }
  | { type: 'number'; step?: string; min?: string; max?: string }
  | { type: 'select'; options: FormSelectOption[] }
);

export const generateForm = <T extends FieldValues>(
  formBuilder: FormInput<T>[],
  { control, formState: { errors } }: UseFormReturn<T>,
) => {
  return formBuilder.map((input) => (
    <Controller
      render={({ field: { onBlur, onChange, name, value } }) => {
        switch (input.type) {
          case 'text':
            return (
              <FormTextField
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                name={name}
                label={input.label}
              />
            );
          case 'number':
            return (
              <FormTextField
                onChange={onChange}
                onBlur={onBlur}
                name={name}
                value={value}
                label={input.label}
                step={input.step}
                type="number"
                max={input.max}
                min={input.min}
                errorsLookup={errors}
              />
            );
          case 'select':
            return (
              <FormSelect
                onChange={onChange}
                onBlur={onBlur}
                name={name}
                value={value}
                options={input.options}
              />
            );
        }
      }}
      control={control}
      name={input.name}
    />
  ));
};
