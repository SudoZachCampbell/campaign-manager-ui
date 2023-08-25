import {
  Control,
  Controller,
  useFieldArray,
  UseFormReturn,
} from 'react-hook-form';
import { FormTextField } from '../../components/formInputs/FormTextField';
import './MonsterDetailsSection.styles.scss';
import { Monster } from '../../api/model/monster';

interface MonsterActionsFormProps {
  form: UseFormReturn<Monster>;
}

export const MonsterActionsForm = ({
  form: {
    control,
    formState: { errors },
  },
}: MonsterActionsFormProps) => {
  const { fields, append } = useFieldArray({
    control,
    name: 'action',
  });
  return (
    <div className="monsteractions__container">
      {fields.map(({ id }, index) => (
        <>
          {index !== 0 && <div className="divider" />}
          <ActionEditor key={id} index={index} control={control} />
        </>
      ))}
      <button
        onClick={() => append({ name: '', desc: '', type: '' })}
        type="button"
      >
        Add New Action
      </button>
    </div>
  );
};

interface ActionEditorProps {
  index: number;
  control: Control<Monster>;
}

const ActionEditor = ({ index, control }: ActionEditorProps) => (
  <div className="monsteractions__actioneditor">
    <Controller
      render={({ field: { onBlur, onChange, name, value } }) => (
        <FormTextField
          onChange={onChange}
          onBlur={onBlur}
          value={value}
          name={name}
          label="Name"
        />
      )}
      control={control}
      name={`actions.${index}.name`}
    />
    <Controller
      render={({ field: { onBlur, onChange, name, value } }) => (
        <FormTextField
          onChange={onChange}
          onBlur={onBlur}
          value={value}
          name={name}
          label="Type"
        />
      )}
      control={control}
      name={`actions.${index}.type`}
    />
    <Controller
      render={({ field: { onBlur, onChange, name, value } }) => (
        <FormTextField
          onChange={onChange}
          onBlur={onBlur}
          value={value}
          name={name}
          label="Description"
        />
      )}
      control={control}
      name={`actions.${index}.desc`}
    />
    <Controller
      render={({ field: { onBlur, onChange, name, value } }) => (
        <FormTextField
          onChange={onChange}
          onBlur={onBlur}
          value={value}
          name={name}
          label="Count"
          type="number"
        />
      )}
      control={control}
      name={`actions.${index}.count`}
    />
    <Controller
      render={({ field: { onBlur, onChange, name, value } }) => (
        <FormTextField
          onChange={onChange}
          onBlur={onBlur}
          value={value}
          name={name}
          label="Attack Bonus"
          type="number"
        />
      )}
      control={control}
      name={`actions.${index}.attackBonus`}
    />
    <DamageField control={control} index={index} />
  </div>
);

interface DamageFieldProps {
  control: Control<Monster>;
  index: number;
}

const DamageField = ({ control, index }: DamageFieldProps) => {
  const { fields, append } = useFieldArray({
    control,
    name: `actions.${index}.damage`,
  });

  return (
    <div className="monsteractions__container">
      {fields.map(({ id }, index) => (
        <>
          {index !== 0 && <div className="divider" />}
          <DamageEditor key={id} index={index} control={control} />
        </>
      ))}
      <button
        onClick={() =>
          append({ damageType: '', damageDice: '', damageBonus: 0 })
        }
        type="button"
      >
        Add New Damage
      </button>
    </div>
  );
};

const DamageEditor = ({ index, control }: ActionEditorProps) => (
  <div className="monsteractions__actioneditor">
    {/*{generateForm()}*/}
    <Controller
      render={({ field: { onBlur, onChange, name, value } }) => (
        <FormTextField
          onChange={onChange}
          onBlur={onBlur}
          value={value}
          name={name}
          label="Damage Type"
        />
      )}
      control={control}
      name={`actions.${index}.name`}
    />
    <Controller
      render={({ field: { onBlur, onChange, name, value } }) => (
        <FormTextField
          onChange={onChange}
          onBlur={onBlur}
          value={value}
          name={name}
          label="Damage Dice"
        />
      )}
      control={control}
      name={`actions.${index}.type`}
    />
    <Controller
      render={({ field: { onBlur, onChange, name, value } }) => (
        <FormTextField
          onChange={onChange}
          onBlur={onBlur}
          value={value}
          name={name}
          label="Damage Bonus"
        />
      )}
      control={control}
      name={`actions.${index}.desc`}
    />
  </div>
);
