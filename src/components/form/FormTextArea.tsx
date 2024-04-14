import { FieldPathValue, Noop } from 'react-hook-form';
import { TextArea } from '../inputs/TextArea';
import './Form.styles.scss';

interface FormTextAreaProps<T> {
  onChange: (...event: any[]) => void;
  onBlur: Noop;
  value: FieldPathValue<any, string>;
  name: string;
  errorsLookup?: Record<string, any>;
  label?: string;
  className?: string;
}

export const FormTextArea = <T,>({
  onChange,
  onBlur,
  value,
  name,
  className,
  label,
  errorsLookup,
}: FormTextAreaProps<T>) => (
  <div className="form__input__container">
    <label className="form__input__label">{label}</label>
    <div
      className={`form__input__group${errorsLookup?.[name] ? ' invalid' : ' '}`}
    >
      <TextArea
        onBlur={onBlur}
        onChange={onChange}
        value={value}
        className={`form__input form__input-multiline ${className ?? ''}`}
        name={name}
      />
    </div>
    {errorsLookup && (
      <div className="form__error">{errorsLookup[name]?.message}</div>
    )}
  </div>
);
