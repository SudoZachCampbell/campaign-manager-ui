import { Controller, UseFormReturn } from 'react-hook-form';
import { FormTextField } from '../../components/formInputs/FormTextField';
import { FormSelect } from '../../components/formInputs/FormSelect';
import { Alignment, Monster, MonsterType, Size } from '../../api/Model';
import _ from 'lodash';
import {
  FormInput,
  generateForm,
} from '../../components/formInputs/form.utils';

interface MonsterDetailsFormProps {
  form: UseFormReturn<Monster>;
}

const monsterForm: FormInput<Monster>[] = [
  {
    name: 'name',
    label: 'Name',
    type: 'text',
  },
  {
    name: 'strength',
    label: 'Strength',
    type: 'number',
    step: '1',
    max: '20',
    min: '0',
  },
  {
    name: 'dexterity',
    label: 'Dexterity',
    type: 'number',
    step: '1',
    max: '20',
    min: '0',
  },
  {
    name: 'constitution',
    label: 'Constitution',
    type: 'number',
    step: '1',
    max: '20',
    min: '0',
  },
  {
    name: 'intelligence',
    label: 'Intelligence',
    type: 'number',
    step: '1',
    max: '20',
    min: '0',
  },
  {
    name: 'wisdom',
    label: 'Wisdom',
    type: 'number',
    step: '1',
    max: '20',
    min: '0',
  },
  {
    name: 'charisma',
    label: 'Charisma',
    type: 'number',
    step: '1',
    max: '20',
    min: '0',
  },
  {
    name: 'passivePerception',
    label: 'Passive Perception',
    step: '1',
    type: 'number',
    min: '0',
  },
  {
    name: 'challengeRating',
    label: 'Challenge Rating',
    type: 'number',
    min: '0',
  },
  {
    name: 'armorClass',
    label: 'Armor Class',
    type: 'number',
    step: '1',
    min: '0',
  },
  {
    name: 'hitPoints',
    label: 'Hit Points',
    type: 'number',
    step: '1',
    min: '0',
  },
  {
    name: 'hitDice',
    label: 'Hit Dice',
    type: 'text',
  },
  {
    name: 'languages',
    label: 'Languages',
    type: 'text',
  },
  {
    name: 'proficiencies',
    label: 'Proficiencies',
    type: 'text',
  },
];

export const MonsterDetailsForm = ({ form }: MonsterDetailsFormProps) => {
  const {
    control,
    formState: { errors },
  } = form;
  return (
    <div>
      {generateForm(monsterForm, form)}
      <Controller
        name="monsterType"
        control={control}
        render={({ field: { onChange, onBlur, name, value } }) => (
          <FormSelect
            onChange={onChange}
            onBlur={onBlur}
            name={name}
            value={value}
            options={Object.values(MonsterType).map((monsterType) => ({
              value: monsterType.toString(),
              label: _.startCase(monsterType.toString()),
            }))}
          />
        )}
      />
      <Controller
        name="alignment"
        control={control}
        render={({ field: { onChange, onBlur, name, value } }) => (
          <FormSelect
            onChange={onChange}
            onBlur={onBlur}
            name={name}
            value={value}
            options={Object.values(Alignment).map((alignment) => ({
              value: alignment.toString(),
              label: _.startCase(alignment.toString()),
            }))}
          />
        )}
      />
      <Controller
        name="size"
        control={control}
        render={({ field: { onChange, onBlur, name, value } }) => (
          <FormSelect
            onChange={onChange}
            onBlur={onBlur}
            name={name}
            value={value}
            options={Object.values(Size).map((size) => ({
              value: size.toString(),
              label: _.startCase(size.toString()),
            }))}
          />
        )}
      />
    </div>
  );
};
