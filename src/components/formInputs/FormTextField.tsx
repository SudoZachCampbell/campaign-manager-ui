import { FieldPathValue, Noop, RefCallBack } from 'react-hook-form';
import { TextField } from '../inputs/TextField';
import './Form.styles.scss';

interface FormTextFieldProps<T> {
  onChange: (...event: any[]) => void;
  onBlur: Noop;
  value: FieldPathValue<any, string>;
  name: string;
  errorsLookup?: Record<string, any>;
  label?: string;
  className?: string;
  type?: 'text' | 'password' | 'email' | 'number';
}

export const FormTextField = <T,>({
  onChange,
  onBlur,
  value,
  name,
  className,
  type = 'text',
  label,
  errorsLookup,
}: FormTextFieldProps<T>) => {
  return (
    <div className='form__input__group'>
      <TextField
        onBlur={onBlur}
        onChange={onChange}
        value={value}
        className={`form__input ${
          errorsLookup?.[name] && 'invalid'
        } ${className}`}
        label={label}
        type={type}
      />
      {errorsLookup && (
        <div className='form__error'>{errorsLookup[name]?.message}</div>
      )}
    </div>
  );
};
