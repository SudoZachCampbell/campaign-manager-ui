import { useEffect, useState } from 'react';
import './Field.styles.scss';

interface TextFieldProps {
  value?: string;
  label?: string;
  className?: string;
  onChange?: (event: { target: any; type?: any }) => void;
  onBlur?: (event: { target: any; type?: any }) => void;
  name?: string;
  required?: boolean;
  disabled?: boolean;
}

export const TextArea = ({
  value = '',
  className,
  label,
  onChange,
  onBlur,
  name,
  required,
  disabled,
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
    <textarea
      onChange={_onChange}
      onBlur={onBlur}
      name={name}
      required={required}
      disabled={disabled}
      className={className}
      placeholder={label}
      value={currentValue}
      rows={7}
    />
  );
};
