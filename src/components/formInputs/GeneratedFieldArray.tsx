import {
  ArrayPath,
  Control,
  FieldErrors,
  FieldValues,
  useFieldArray,
  UseFormReturn,
} from 'react-hook-form';
import { FormInput } from './Form.model';
import { GeneratedForm } from './GeneratedForm';

interface GeneratedFieldArrayProps<T extends FieldValues> {
  formBuilder: FormInput<T>[];
  control: Control<T>;
  errors: FieldErrors<T>;
  path: ArrayPath<T>;
  name: ArrayPath<T>;
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
              errors={errors}
              formBuilder={formBuilder}
              control={control}
              path={path}
            />
          </>
        );
      })}
      <button
        onClick={() => append(formBuilder.map(({ name }) => ({ [name]: '' })))}
        type="button"
      >
        Append {String(name)}
      </button>
    </div>
  );
};
