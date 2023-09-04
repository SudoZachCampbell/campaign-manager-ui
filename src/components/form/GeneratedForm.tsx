import {
  ArrayPath,
  Control,
  Controller,
  FieldErrors,
  FieldValues,
  Path,
} from 'react-hook-form';
import { JSX, useEffect, useState } from 'react';
import { FormTextField } from './FormTextField';
import { FormSelect } from './FormSelect';
import { FormInput } from './Form.model';
import { GeneratedFieldArray } from './GeneratedFieldArray';
import './Form.styles.scss';
import _ from 'lodash';
import { Box, Tab, Tabs } from '@mui/material';
import { FormTextArea } from './FormTextArea';

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
  const [currentTab, setCurrentTab] = useState<number>(0);

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

  const buildField = (input: FormInput<T>, tabPath = '') => {
    let currentPath;
    switch (input.type) {
      case 'fieldArray':
        if (tabPath !== '') {
          currentPath = tabPath as ArrayPath<T>;
        } else if (path && index !== null) {
          currentPath = `${path}.${index}` as ArrayPath<T>;
        } else if (path) {
          currentPath = `${path}` as ArrayPath<T>;
        } else {
          currentPath = `` as ArrayPath<T>;
        }
        return (
          <GeneratedFieldArray
            key={`fieldArray_${currentPath}_${input.name}`}
            label={input.label}
            control={control}
            errors={errors}
            formBuilder={input.fields}
            path={currentPath}
            name={input.name}
          />
        );
      default:
        if (path && index !== null && index !== undefined) {
          currentPath = `${path}.${index}.${input.name}` as ArrayPath<T>;
        } else if (path) {
          currentPath = `${path}.${input.name}` as ArrayPath<T>;
        } else {
          currentPath = `${input.name}` as ArrayPath<T>;
        }
        return (
          <Controller
            render={({ field: { onBlur, onChange, name, value } }) => {
              switch (input.type) {
                case 'text':
                  return (
                    <FormTextField
                      key={name}
                      onChange={onChange}
                      onBlur={onBlur}
                      value={value}
                      name={name}
                      label={input.label}
                      errorsLookup={errors}
                    />
                  );
                case 'textarea':
                  return (
                    <FormTextArea
                      key={name}
                      onChange={onChange}
                      onBlur={onBlur}
                      value={value}
                      name={name}
                      label={input.label}
                      errorsLookup={errors}
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
                      errorsLookup={errors}
                    />
                  );
                case 'subForm':
                  return (
                    <div>
                      <h2>{input.label}</h2>
                      <GeneratedForm
                        formBuilder={input.fields as FormInput<T>[]}
                        control={control}
                        errors={errors}
                        path={name}
                      />
                    </div>
                  );
              }
            }}
            rules={{ required: input.required && `This field is required` }}
            control={control}
            name={currentPath as Path<T>}
            key={currentPath}
          />
        );
    }
  };

  const nonTabbedFormInputs = nonTabbedFields.map((field) => buildField(field));
  const tabbedFormInputs = tabbedFields.reduce<Record<string, JSX.Element[]>>(
    (acc, field) => {
      acc[field.name] = [buildField(field, field.name)];
      return acc;
    },
    {},
  );

  const tabs: Record<string, JSX.Element[]> = {
    details: nonTabbedFormInputs,
    ...tabbedFormInputs,
  };

  return (
    <>
      <div className="form__container">
        {tabbedFields.length > 0 && (
          <Tabs
            orientation="vertical"
            variant="scrollable"
            value={currentTab}
            onChange={(_, newNumber) => setCurrentTab(newNumber)}
            sx={{ borderRight: 1, borderColor: 'divider' }}
            className="form__tabs"
          >
            {[{ label: 'details' }, ...tabbedFields].map((tab, index) => (
              <Tab key={`${tab.label}_${index}`} label={tab.label} />
            ))}
          </Tabs>
        )}
        <div className="form__details_container">
          {Object.values(tabs).map((tab, index) => (
            <TabPanel
              key={`tabPanel_${index}`}
              value={currentTab}
              index={index}
            >
              {tab}
            </TabPanel>
          ))}
        </div>
      </div>
    </>
  );
};

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel({ children, value, index }: TabPanelProps) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      style={{ height: '100%' }}
    >
      {value === index && (
        <Box height="100%" sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}
