import { Box, Tab, Tabs } from '@mui/material';
import { CSSProperties, JSX, useState } from 'react';
import {
  ArrayPath,
  Controller,
  FieldErrors,
  FieldValues,
  Path,
  PathValue,
  UseFormReturn,
} from 'react-hook-form';
import { FormInput } from './Form.model';
import './Form.styles.scss';
import { FormCheckBox } from './FormCheckbox';
import { FormIdLookup } from './FormIdLookup';
import { FormSelect } from './FormSelect';
import { FormTextArea } from './FormTextArea';
import { FormTextField } from './FormTextField';
import { GeneratedFieldArray } from './GeneratedFieldArray';

interface GeneratedFormProps<T extends FieldValues> {
  formBuilder: FormInput<T>[];
  form: UseFormReturn<T>;
  errors: FieldErrors<T>;
  index?: number;
  path?: string;
}

export const DEFAULT_STYLES: {
  width: Partial<Record<FormInput<any>['type'], CSSProperties['width']>>;
} = {
  width: {
    text: '33%',
    textarea: '100%',
    number: '3.5rem',
    select: '15%',
    subForm: '100%',
  },
};

export const GeneratedForm = <T extends FieldValues>({
  formBuilder,
  form,
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
            form={form}
            titleField={input.titleField}
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
          <>
            {input.styling?.newRow && <div className="break" />}
            <div
              className="form_details__input-container"
              style={{
                width: input.styling?.width ?? DEFAULT_STYLES.width[input.type],
              }}
            >
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
                          center
                        />
                      );
                    case 'boolean':
                      return (
                        <FormCheckBox
                          onChange={onChange}
                          name={name}
                          value={value}
                          label={input.label}
                          errorsLookup={errors}
                        />
                      );
                    case 'idLookup':
                      return (
                        <FormIdLookup
                          key={name}
                          dataFetch={input.dataFetch}
                          onChange={onChange}
                          onBlur={onBlur}
                          value={value}
                          name={name}
                          label={input.label}
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
                          label={input.label}
                        />
                      );
                    case 'subForm':
                      return (
                        <div className="form_details__subform">
                          <h2>{input.label}</h2>
                          <GeneratedForm
                            formBuilder={input.fields as FormInput<T>[]}
                            form={form}
                            errors={errors}
                            path={name}
                          />
                        </div>
                      );
                  }
                }}
                rules={{ required: input.required && `This field is required` }}
                control={form.control}
                name={currentPath as Path<T>}
                key={currentPath}
                defaultValue={input.defaultValue as PathValue<T, Path<T>>}
              />
            </div>
          </>
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
              <Tab
                key={`${tab.label}_${index}`}
                className="form__tabs-link"
                label={tab.label}
              />
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
              <div className="form__details-tab_container">{tab}</div>
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
        <Box height="100%" sx={{ px: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}
