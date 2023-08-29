import {
  ArrayPath,
  Control,
  FieldArray,
  FieldErrors,
  FieldValues,
  useFieldArray,
  UseFormReturn,
} from 'react-hook-form';
import { FormFieldArray, FormInput } from './Form.model';
import { GeneratedForm } from './GeneratedForm';

interface GeneratedFieldArrayProps<T extends FieldValues> {
  formBuilder: FormInput<T[keyof T]>[];
  control: Control<T>;
  errors: FieldErrors<T>;
  path: ArrayPath<T>;
  name: keyof T;
}

export const GeneratedFieldArray = <T extends FieldValues>({
  control,
  formBuilder,
  errors,
  path,
  name,
}: GeneratedFieldArrayProps<T>) => {
  const { fields, append } = useFieldArray({
    control,
    name: name as ArrayPath<T>,
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
              errors={errors}
              formBuilder={formBuilder as FormInput<T>[]}
              control={control}
              path={path}
            />
          </>
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
