import {
  ArrayPath,
  Controller,
  FieldValues,
  Path,
  useFieldArray,
  UseFormReturn,
} from 'react-hook-form';
import { JSX } from 'react';
import { FormTextField } from './FormTextField';
import { FormSelect } from './FormSelect';
import { FormInput } from './Form.model';

interface GeneratedFormProps<T extends FieldValues> {
  formBuilder: FormInput<T>[];
  form: UseFormReturn<T>;
  index?: number;
  path?: string;
}

export const GeneratedForm = <T extends FieldValues>({
  formBuilder,
  form,
  index,
  path,
}: GeneratedFormProps<T>): JSX.Element => {
  const {
    control,
    formState: { errors },
  } = form;
  console.log('Index: ', index);
  return (
    <>
      {formBuilder.map((input) => (
        <Controller
          render={({ field: { onBlur, onChange, name, value } }) => {
            let fullPath = name;
            if (path && index !== null) {
              fullPath = `${path}[${index}].${name}` as Path<T>;
            } else if (currentPath) {
              fullPath = `${path}.${name}` as Path<T>;
            }
            console.log('Path: ' + fullPath);
            switch (input.type) {
              case 'text':
                return (
                  <FormTextField
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    name={fullPath}
                    label={input.label}
                  />
                );
              case 'number':
                return (
                  <FormTextField
                    onChange={onChange}
                    onBlur={onBlur}
                    name={fullPath}
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
                    name={fullPath}
                    value={value}
                    options={input.options}
                  />
                );
              case 'fieldArray':
                return (
                  <GeneratedFieldArray
                    form={form}
                    formBuilder={input.fields}
                    name={name}
                    currentPath={fullPath}
                  />
                );
            }
          }}
          control={control}
          name={input.name}
          key={input.name}
        />
      ))}
    </>
  );
};

interface GeneratedFieldArrayProps<T extends FieldValues> {
  formBuilder: FormInput<T>[];
  form: UseFormReturn<T>;
  path?: Path<T>;
  name: keyof Path<T>;
}

const GeneratedFieldArray = <T extends FieldValues[]>({
  form,
  formBuilder,
  path,
  name,
}: GeneratedFieldArrayProps<T>) => {
  const {
    control,
    formState: { errors },
  } = form;
  const { fields, append } = useFieldArray({
    control,
    name: name,
  });

  return (
    <div className="monsteractions__container">
      {fields.map(({ id }, index) => {
        return (
          <>
            {index !== 0 && <div className="divider" />}
            <GeneratedForm
              key={id}
              index={index}
              formBuilder={formBuilder}
              form={form}
              path={path}
            />
          </>
        );
      })}
      <button
        onClick={() => append(formBuilder.map(({ prop }) => ({ [name]: '' })))}
        type="button"
      >
        Append {name}
      </button>
    </div>
  );
};
