import { useEffect, useState } from 'react';
import './Field.styles.scss';

interface TextFieldProps {
  value?: string;
  label?: string;
  className?: string;
  onChange?: (event: { target: any; type?: any }) => void;
  onBlur?: (event: { target: any; type?: any }) => void;
  name?: string;
  max?: string;
  min?: string;
  step?: string;
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
  max,
  min,
  step,
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

  useEffect(() => {
    if (value !== currentValue) {
      setCurrentValue(value);
    }
  }, [value]);

  return (
    <input
      onChange={_onChange}
      onBlur={onBlur}
      name={name}
      max={max}
      min={min}
      step={step}
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
