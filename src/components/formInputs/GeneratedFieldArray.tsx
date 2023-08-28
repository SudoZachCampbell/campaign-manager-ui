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
  formBuilder: FormFieldArray<T>[];
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
  console.log(`GeneratedFieldArray.tsx:31 hit`);

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
      <button onClick={() => append({ name: '' })} type="button">
        Append {String(name)}
      </button>
    </div>
  );
};
