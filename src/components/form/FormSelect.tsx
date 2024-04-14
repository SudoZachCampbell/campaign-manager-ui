import { CSSProperties } from 'react';
import { FieldPathValue, Noop } from 'react-hook-form';
import { Select, SelectOption } from '../inputs/Select';
import './Form.styles.scss';

interface FormSelectProps {
  onChange: (...event: any[]) => void;
  onBlur: Noop;
  value: FieldPathValue<any, string>;
  name: string;
  errorsLookup?: Record<string, any>;
  label?: string;
  className?: string;
  options: Array<SelectOption>;
  style?: CSSProperties;
}

export const FormSelect = ({
  onChange,
  onBlur,
  value,
  name,
  className,
  label,
  errorsLookup,
  options,
}: FormSelectProps) => {
  return (
    <div className="form__input__container">
      <label className="form__input__label">{label}</label>
      <div className="form__input__group">
        <Select
          onBlur={onBlur}
          onChange={onChange}
          value={value}
          className={`form__input${errorsLookup?.[name] ? ' invalid ' : ' '}${
            className ?? ''
          }`}
          options={options}
        />
        {errorsLookup && (
          <div className="form__error">{errorsLookup[name]?.message}</div>
        )}
      </div>
    </div>
  );
};
