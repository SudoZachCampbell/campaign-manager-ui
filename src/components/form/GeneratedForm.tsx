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
  const [currentTabName, setCurrentTabName] = useState<string>('details');

  const buildField = (input: FormInput<T>) => {
    switch (input.type) {
      case 'fieldArray':
        let fullPath = `${path}.${index}.${String(input.name)}` as ArrayPath<T>;
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
  };

  const nonTabbedFormInputs = nonTabbedFields.map(buildField);
  const tabbedFormInputs = tabbedFields.reduce<Record<string, JSX.Element[]>>(
    (acc, field) => {
      acc[field.name] = [buildField(field)];
      return acc;
    },
    {},
  );

  const tabs: Record<string, JSX.Element[]> = {
    details: nonTabbedFormInputs,
    ...tabbedFormInputs,
  };

  const activeTab = tabs[currentTabName];

  console.log(`GeneratedForm.tsx:126 activeTab`, activeTab);

  return (
    <>
      <div className="form__container">
        <div className="form__tabs">
          {[{ name: 'details' }, ...tabbedFields].map((tab) => (
            <Link
              key={tab.name}
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
          {activeTab.map((formInput, index) => (
            <div key={`tab_container_${index}`}>{formInput}</div>
          ))}
        </div>
      </div>
    </>
  );
};
