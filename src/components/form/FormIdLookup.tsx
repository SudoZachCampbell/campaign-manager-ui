import { BaseDto, Client } from 'api/model';
import { Select, SelectOption } from 'components/inputs/Select';
import { useAuth } from 'hooks/useAuth';
import { useEffect, useState } from 'react';
import { FieldPathValue, Noop } from 'react-hook-form';
import './Form.styles.scss';

interface FormIdLookupProps<T> {
  onChange: (...event: any[]) => void;
  onBlur: Noop;
  value: FieldPathValue<any, string>;
  name: string;
  errorsLookup?: Record<string, any>;
  label?: string;
  className?: string;
  dataFetch: (client: Client) => Promise<BaseDto[]>;
}

const client = new Client();

export const FormIdLookup = <T,>({
  onChange,
  onBlur,
  value,
  name,
  dataFetch,
  className,
  label,
  errorsLookup,
}: FormIdLookupProps<T>) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [options, setOptions] = useState<SelectOption[]>();

  client.setAuthToken(useAuth().token);

  const loadOptions = async () => {
    setLoading(true);
    const result = await dataFetch(client);
    setOptions([
      { value: null, label: 'None' },
      ...result.map(({ id, name }) => ({
        value: id,
        label: name,
      })),
    ]);
    setLoading(false);
  };

  useEffect(() => {
    loadOptions();
  }, []);

  return options ? (
    <div className="form__input__container">
      <label className="form__input__label">{label}</label>
      <div
        className={`form__input__group${
          errorsLookup?.[name] ? ' invalid' : ' '
        }`}
      >
        <Select
          onBlur={onBlur}
          onChange={onChange}
          value={value}
          className={`form__input${errorsLookup?.[name] ? ' invalid ' : ' '}${
            className ?? ''
          }`}
          options={options}
        />
      </div>
      {errorsLookup && (
        <div className="form__error">{errorsLookup[name]?.message}</div>
      )}
    </div>
  ) : loading ? (
    <p>Loading</p>
  ) : (
    <p>No options found</p>
  );
};
