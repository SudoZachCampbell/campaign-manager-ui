import {
  ArrayPath,
  Control,
  Controller,
  FieldErrors,
  FieldValues,
  Path,
} from 'react-hook-form';
import { JSX, useState } from 'react';
import { FormTextField } from './FormTextField';
import { FormSelect } from './FormSelect';
import { FormInput } from './Form.model';
import { GeneratedFieldArray } from './GeneratedFieldArray';
import './Form.styles.scss';
import { Link } from '../Link';
import _ from 'lodash';

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
  const { tabbedFields, nonTabbedFields } = formBuilder.reduce<{
    tabbedFields: FormInput<T>[];
    nonTabbedFields: FormInput<T>[];
  }>(
    (acc, input) => {
      acc[input.tabbed ? 'tabbedFields' : 'nonTabbedFields'].push(input);
      return acc;
    },
    { tabbedFields: [], nonTabbedFields: [] },
  );
  const [currentTabName, setCurrentTabName] = useState<string>(
    tabbedFields[0].name,
  );

  console.log(`GeneratedForm.tsx:47 tabbedFields`, tabbedFields);

  const buildFields = (inputs: FormInput<T>[]) => {
    return inputs.map((input) => {
      switch (input.type) {
        case 'fieldArray':
          let fullPath = `${path}.${index}.${String(
            input.name,
          )}` as ArrayPath<T>;
          return (
            <GeneratedFieldArray
              control={control}
              errors={errors}
              formBuilder={input.fields}
              name={input.name}
              path={fullPath}
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
              name={input.name as Path<T>}
              key={input.name}
            />
          );
      }
    });
  };

  const nonTabbedFormInputs = buildFields(nonTabbedFields);

  // let tabs = buildFields(tabbedFields);
  // tabs = [...buildFields(nonTabbedFields), ...tabs];

  // const ActiveTab = tabs[0];

  return (
    <>
      <div className="form__container">
        <div className="form__tabs">
          {tabbedFields.map((tab) => (
            <Link
              className={`remove-formatting${
                currentTabName === tab.name ? ' selected' : ' unselected'
              }`}
              onClick={() => setCurrentTabName(tab.name)}
            >
              {_.startCase(tab.name)}
            </Link>
          ))}
        </div>
        <div className="form__details_container">
          {nonTabbedFormInputs.map((input) => input)}
        </div>
      </div>
    </>
  );
};
