import { useState } from 'react';
import { RefCallBack } from 'react-hook-form';

interface TextFieldProps {
  value?: string;
  label?: string;
  className?: string;
  onChange?: (event: { target: any; type?: any }) => void;
  onBlur?: (event: { target: any; type?: any }) => void;
  name?: string;
  maxLength?: number;
  minLength?: number;
  pattern?: string;
  required?: boolean;
  disabled?: boolean;
  type?: 'text' | 'password' | 'email' | 'number';
}

export const TextField = ({
  value = '',
  className,
  label,
  onChange,
  onBlur,
  name,
  maxLength,
  minLength,
  pattern,
  required,
  disabled,
  type = 'text',
}: TextFieldProps) => {
  const [currentValue, setCurrentValue] = useState<string>(value);

  const _onChange = (event: { target: any; type?: any }) => {
    setCurrentValue(event.target.value);
    onChange?.(event);
  };

  return (
    <input
      onChange={_onChange}
      onBlur={onBlur}
      name={name}
      maxLength={maxLength}
      minLength={minLength}
      pattern={pattern}
      required={required}
      disabled={disabled}
      type={type}
      className={className}
      placeholder={label}
      value={currentValue}
    />
  );
};
