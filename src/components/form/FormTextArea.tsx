import { FieldPathValue, Noop, RefCallBack } from 'react-hook-form';
import './Form.styles.scss';
import { TextArea } from '../inputs/TextArea';

interface FormTextAreaProps<T> {
  onChange: (...event: any[]) => void;
  onBlur: Noop;
  value: FieldPathValue<any, string>;
  name: string;
  errorsLookup?: Record<string, any>;
  label?: string;
  className?: string;
  adaptiveLabel?: boolean;
}

export const FormTextArea = <T,>({
  onChange,
  onBlur,
  value,
  name,
  className,
  label,
  errorsLookup,
  adaptiveLabel = true,
}: FormTextAreaProps<T>) => (
  <div className="form__input__container">
    <div
      className={`form__input__group${errorsLookup?.[name] ? ' invalid' : ' '}`}
    >
      <TextArea
        onBlur={onBlur}
        onChange={onChange}
        value={value}
        className={`form__input form__input-multiline ${className ?? ''}`}
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
