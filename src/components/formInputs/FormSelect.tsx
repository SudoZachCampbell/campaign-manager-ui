import React from 'react';
import { Select, SelectOption } from '../inputs/Select';
import { FieldPathValue, Noop } from 'react-hook-form';
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
  console.log(`FormSelect.tsx:26 options`, options);
  return (
    <div className='form__input__group'>
      <Select
        onBlur={onBlur}
        onChange={onChange}
        value={value}
        className={`form__input ${
          errorsLookup?.[name] && 'invalid'
        } ${className}`}
        label={label}
        options={options}
      />
      {errorsLookup && (
        <div className='form__error'>{errorsLookup[name]?.message}</div>
      )}
    </div>
  );
};
