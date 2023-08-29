import { UseFormReturn } from 'react-hook-form';
import { monsterForm } from './MonsterDetails.form';
import { Monster } from '../../api/model/Monster';
import { GeneratedForm } from '../../components/form/GeneratedForm';

interface MonsterDetailsFormProps {
  form: UseFormReturn<Required<Monster>>;
}

export const MonsterDetailsForm = ({ form }: MonsterDetailsFormProps) => {
  return (
    <div>
      <GeneratedForm
        formBuilder={monsterForm}
        control={form.control}
        errors={form.formState.errors}
      />
    </div>
  );
};
