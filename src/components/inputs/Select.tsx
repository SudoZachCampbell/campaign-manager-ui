import React, { useState } from 'react';
import { ApiType } from '../../api/dndDb';
import _ from 'lodash';

interface SelectProps {
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
  label,
  options,
}: SelectProps) => {
  const [currentValue, setCurrentValue] = useState<string | undefined>(value);

  const _onChange = (event: { target: any; type?: any }) => {
    setCurrentValue(currentValue);
    onChange?.(event);
  };

  return (
    <div>
      <select placeholder={label} value={currentValue} onChange={_onChange}>
        {options.map((option) => (
          <option value={option.value}>{option.label}</option>
        ))}
      </select>
    </div>
  );
};
