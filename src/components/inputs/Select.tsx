import { useEffect, useState } from 'react';

interface SelectProps {
  value?: string;
  className?: string;
  onChange?: (event: { target: any; type?: any }) => void;
  onBlur?: (event: { target: any; type?: any }) => void;
  name?: string;
  maxLength?: number;
  minLength?: number;
  pattern?: string;
  required?: boolean;
  disabled?: boolean;
  options: Array<SelectOption>;
}

export interface SelectOption {
  value: any;
  label: string;
}

export const Select = ({
  onChange,
  onBlur,
  value,
  name,
  className,
  options,
}: SelectProps) => {
  const [currentValue, setCurrentValue] = useState<string | undefined>(value);

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
    <select
      className={className}
      value={currentValue}
      onChange={_onChange}
      style={{ textAlign: 'center' }}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};
