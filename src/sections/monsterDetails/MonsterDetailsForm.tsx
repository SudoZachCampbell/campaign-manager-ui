import { UseFormReturn } from 'react-hook-form';
import { GeneratedForm } from '../../components/formInputs/Form.utils';
import { monsterForm } from './MonsterDetails.form';
import { Monster } from '../../api/model/Monster';

interface MonsterDetailsFormProps {
  form: UseFormReturn<Monster>;
}

export const MonsterDetailsForm = ({ form }: MonsterDetailsFormProps) => {
  return (
    <div>
      <GeneratedForm formBuilder={monsterForm} form={form} />
    </div>
  );
};
