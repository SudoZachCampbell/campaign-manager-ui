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

interface GeneratedFieldArrayProps<T extends FieldValues> {
  formBuilder: FormInput<Required<T[Extract<keyof T, string>]>>[];
  control: Control<T>;
  errors: FieldErrors<T>;
  path: ArrayPath<T>;
  name: Extract<keyof T, string>;
}

export const GeneratedFieldArray = <T extends FieldValues>({
  control,
  formBuilder,
  errors,
  path,
  name,
}: GeneratedFieldArrayProps<T>) => {
  const fullPath = path === name ? path : `${path}.${name}`;
  const { fields, append } = useFieldArray({
    control,
    name: fullPath as ArrayPath<T>,
  });

  return (
    <div className="monsteractions__container">
      {fields.map(({ id }, index) => {
        return (
          <div key={id}>
            {index !== 0 && <div className="divider" />}
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
      <button
        onClick={() =>
          append(
            formBuilder.reduce<Record<string, ''>>((acc, { name }) => {
              acc[String(name)] = '';
              return acc;
            }, {}) as FieldArray<T, ArrayPath<T>>,
          )
        }
        type="button"
      >
        Append {String(name)}
      </button>
    </div>
  );
};
