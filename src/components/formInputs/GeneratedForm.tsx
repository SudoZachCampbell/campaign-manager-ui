import {
  ArrayPath,
  Control,
  Controller,
  FieldErrors,
  FieldPath,
  FieldValues,
  Path,
  UseFormReturn,
} from 'react-hook-form';
import { JSX } from 'react';
import { FormTextField } from './FormTextField';
import { FormSelect } from './FormSelect';
import { FormInput } from './Form.model';
import { GeneratedFieldArray } from './GeneratedFieldArray';

interface GeneratedFormProps<T extends FieldValues> {
  formBuilder: FormInput<T>[];
  control: Control<T>;
  errors: FieldErrors<T>;
  index?: number;
  path?: string;
}

export const GeneratedForm = <T extends FieldValues>({
  formBuilder,
  control,
  errors,
  index,
  path,
}: GeneratedFormProps<T>): JSX.Element => {
  return (
    <>
      {formBuilder.map((input) => {
        switch (input.type) {
          case 'fieldArray':
            let fullPath = input.name + `.${index}.` + 'test';
            return (
              <GeneratedFieldArray
                control={control}
                errors={errors}
                formBuilder={input.fields}
                name={input.name}
              />
            );

          default:
            return (
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
                key={input.name}
              />
            );
        }
      })}
    </>
  );
};
