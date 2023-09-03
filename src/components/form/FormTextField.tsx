import { FieldPathValue, Noop, RefCallBack } from 'react-hook-form';
import { TextField } from '../inputs/TextField';
import './Form.styles.scss';

interface FormTextFieldProps<T> {
  onChange: (...event: any[]) => void;
  onBlur: Noop;
  value: FieldPathValue<any, string>;
  name: string;
  max?: string;
  min?: string;
  step?: string;
  errorsLookup?: Record<string, any>;
  label?: string;
  className?: string;
  type?: 'text' | 'password' | 'email' | 'number';
  adaptiveLabel?: boolean;
}

export const FormTextField = <T,>({
  onChange,
  onBlur,
  value,
  name,
  max,
  min,
  step,
  className,
  type = 'text',
  label,
  errorsLookup,
  adaptiveLabel = true,
}: FormTextFieldProps<T>) => (
  <div className="form__input__container">
    <div
      className={`form__input__group${errorsLookup?.[name] ? ' invalid' : ' '}`}
    >
      <TextField
        onBlur={onBlur}
        onChange={onChange}
        value={value}
        max={max}
        min={min}
        step={step}
        className={`form__input ${className ?? ''}`}
        type={type}
        label={label}
        name={name}
      />
      {adaptiveLabel && value !== undefined && value !== '' && (
        <div className={`form__input__label`}>{label}</div>
      )}
    </div>
    {errorsLookup && (
      <div className="form__error">{errorsLookup[name]?.message}</div>
    )}
  </div>
);
