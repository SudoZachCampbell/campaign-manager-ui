import { FC, useEffect, useState } from 'react';

interface FormCheckBoxProps {
  name: string;
  value: boolean;
  label: string;
  onChange?: (event: { target: any; type?: any }) => void;
  errorsLookup?: Record<string, any>;
}

export const FormCheckBox: FC<FormCheckBoxProps> = ({
  name,
  value = false,
  label,
  onChange,
  errorsLookup,
}) => {
  const [checked, setChecked] = useState<boolean>(value);

  const _onChange = () => {
    setChecked(!checked);
    onChange?.({ target: { value: !checked } });
  };

  useEffect(() => {
    if (value !== checked) {
      setChecked(value);
    }
  }, [value]);

  return (
    <div>
      <div
        onClick={_onChange}
        className={`form__checkbox${checked ? ' checked' : ''}`}
      >
        {' '}
        <label className="form__input__label" htmlFor={name}>
          {label}
        </label>
      </div>
      {errorsLookup && (
        <div className="form__error">{errorsLookup[name]?.message}</div>
      )}
    </div>
  );
};
