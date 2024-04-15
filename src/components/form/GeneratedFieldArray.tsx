import { ExpandMore } from '@mui/icons-material';
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import {
  ArrayPath,
  FieldArray,
  FieldErrors,
  FieldValues,
  Path,
  UseFormReturn,
  useFieldArray,
} from 'react-hook-form';
import { Button } from '../Button/Button';
import './FieldArray.styles.scss';
import { FormInput } from './Form.model';
import { GeneratedForm } from './GeneratedForm';

interface GeneratedFieldArrayProps<T extends FieldValues> {
  formBuilder: FormInput<Required<T[Extract<keyof T, string>]>>[];
  form: UseFormReturn<T>;
  errors: FieldErrors<T>;
  path: ArrayPath<T>;
  label: string;
  name: Extract<keyof T, string>;
  titleField: string;
}

export const GeneratedFieldArray = <T extends FieldValues>({
  form,
  formBuilder,
  errors,
  path,
  label,
  name,
  titleField,
}: GeneratedFieldArrayProps<T>) => {
  const fullPath = (path === name ? path : `${path}.${name}`) as Path<T>;
  const { fields, append } = useFieldArray({
    control: form.control,
    name: fullPath as ArrayPath<T>,
  });

  return (
    <div
      className={
        fields.length > 0
          ? 'fieldarray__container'
          : 'fieldarray__container-empty'
      }
    >
      <div className="fieldarray__header">
        <h2>{label}</h2>
        <Button
          onClick={() =>
            append(
              formBuilder.reduce<Record<string, ''>>((acc, { name }) => {
                acc[String(name)] = '';
                return acc;
              }, {}) as FieldArray<T, ArrayPath<T>>,
            )
          }
          className="fieldarray__append-button"
          type="add"
        >
          +
        </Button>
      </div>
      {fields.map(({ id }, index) => {
        const titleFieldValue = form.getValues(fullPath)?.[index]?.[titleField];
        return (
          <Accordion>
            <AccordionSummary
              style={{ backgroundColor: '#e6e6e6' }}
              id={id}
              expandIcon={<ExpandMore />}
            >
              {titleFieldValue && titleFieldValue !== ''
                ? titleFieldValue
                : `New ${label} Entry`}
            </AccordionSummary>
            <AccordionDetails>
              <div style={{ width: '100%' }} key={id}>
                <GeneratedForm
                  key={id}
                  index={index}
                  errors={errors}
                  formBuilder={formBuilder as FormInput<T>[]}
                  form={form}
                  path={fullPath}
                />
              </div>
            </AccordionDetails>
          </Accordion>
        );
      })}
    </div>
  );
};
