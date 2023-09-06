import {
  ArrayPath,
  Control,
  FieldArray,
  FieldErrors,
  FieldValues,
  useFieldArray,
} from 'react-hook-form';
import { FormInput } from './Form.model';
import { GeneratedForm } from './GeneratedForm';
import './FieldArray.styles.scss';
import { Button } from '../Button/Button';

interface GeneratedFieldArrayProps<T extends FieldValues> {
  formBuilder: FormInput<Required<T[Extract<keyof T, string>]>>[];
  control: Control<T>;
  errors: FieldErrors<T>;
  path: ArrayPath<T>;
  label: string;
  name: Extract<keyof T, string>;
}

export const GeneratedFieldArray = <T extends FieldValues>({
  control,
  formBuilder,
  errors,
  path,
  label,
  name,
}: GeneratedFieldArrayProps<T>) => {
  const fullPath = path === name ? path : `${path}.${name}`;
  const { fields, append } = useFieldArray({
    control,
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
      {fields.map(({ id }, index) => {
        return (
          <div style={{ width: '100%' }} key={id}>
            {index > 0 && <div className="divider" />}
            <GeneratedForm
              key={id}
              index={index}
              errors={errors}
              formBuilder={formBuilder as FormInput<T>[]}
              control={control}
              path={fullPath}
            />
          </div>
        );
      })}
      <Button
        onClick={() =>
          append(
            formBuilder.reduce<Record<string, ''>>((acc, { name }) => {
              acc[String(name)] = '';
              return acc;
            }, {}) as FieldArray<T, ArrayPath<T>>,
          )
        }
        text={`Add ${label}`}
      />
    </div>
  );
};
