import { UseFormReturn } from 'react-hook-form';
import { monsterForm } from './MonsterDetails.form';
import { Monster } from '../../api/model/Monster';
import { GeneratedForm } from '../../components/formInputs/GeneratedForm';

interface MonsterDetailsFormProps {
  form: UseFormReturn<Monster>;
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
