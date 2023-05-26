import React, { useState, useEffect } from 'react';
import { useDnDApi } from '../api/dndDb';
import { AccountsClient, CreateAttempt } from '../api/Model';
import { LoginAttempt } from '../api/Model';
import { PuffLoader } from 'react-spinners';
import { useAuth } from '../hooks/useAuth';
import jwtDecode from 'jwt-decode';
import { JwtPayload } from 'jsonwebtoken';
import { Link } from 'react-router-dom';

import './Login.styles.scss';
import colours from '../style/constants/_colours.scss';
import { Controller, useForm } from 'react-hook-form';
import { FormTextField } from '../components/formInputs/FormTextField';
import { TextField } from '../components/inputs/TextField';

const accountsClient = new AccountsClient();

interface FormObject {
  username: string;
  password: string;
  email?: string;
  confirmPassword?: string;
}

export default function Login() {
  const [creating, setCreating] = useState<boolean>(false);

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
    watch,
    trigger,
  } = useForm<FormObject>({ mode: 'onBlur' });

  const auth = useAuth();

  const {
    loading,
    invoke,
    response: responseToken,
    apiError,
  } = useDnDApi((login: string, pass: string, email?: string) =>
    creating
      ? accountsClient.createAccount(
          new CreateAttempt({ username: login, password: pass, email }),
        )
      : accountsClient.login(
          new LoginAttempt({ username: login, password: pass }),
        ),
  );

  const attemptLogin = ({ username, password, email }: FormObject) => {
    invoke(username, password, creating ? email : null);
  };

  const login = (token: string) => {
    let tokenObject = jwtDecode<JwtPayload>(token);
    if (tokenObject) {
      auth.login(token);
    }
  };

  useEffect(() => {
    if (!loading && responseToken) {
      login(responseToken);
    }
  }, [loading, responseToken]);

  useEffect(() => {
    reset({}, { keepValues: true });
  }, [creating]);

  useEffect(() => {
    if (watch('confirmPassword')) {
      trigger('password');
    }
  }, [watch('confirmPassword')]);

  useEffect(() => {
    if (watch('password')) {
      trigger('confirmPassword');
    }
  }, [watch('password')]);

  return loading ? (
    <PuffLoader color={colours.primaryColour} />
  ) : (
    <div className='login__container'>
      <form onSubmit={handleSubmit(attemptLogin)} className='login__form'>
        <div className='login__toggles'>
          <a
            className={`toggle ${creating || 'selected'}`}
            onClick={() => setCreating(false)}
          >
            Login
          </a>
          <div className='spacer' />
          <a
            className={`toggle ${creating && 'selected'}`}
            onClick={() => setCreating(true)}
          >
            Create
          </a>
        </div>
        <Controller
          name='username'
          control={control}
          rules={{
            required: 'Username is required',
            validate: {
              uniqueness: async (value: string) => {
                if (creating) {
                  return (
                    (await accountsClient.validateUsername(value)) ||
                    'Username must be unique'
                  );
                } else {
                  return true;
                }
              },
            },
          }}
          render={({ field: { onChange, onBlur, name, value } }) => (
            <FormTextField
              onChange={onChange}
              onBlur={onBlur}
              name={name}
              value={value}
              errorsLookup={errors}
              label='Username'
            />
          )}
        />
        <Controller
          name='password'
          control={control}
          rules={{
            required: 'Password is required',
            maxLength: 32,
            pattern: {
              value:
                /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
              message:
                '8 characters, 1 uppercase, 1 lowercase, a number, a special character',
            },
          }}
          render={({ field: { onChange, onBlur, name, value } }) => (
            <FormTextField
              onChange={onChange}
              onBlur={onBlur}
              name={name}
              value={value}
              errorsLookup={errors}
              label='Password'
              type='password'
            />
          )}
        />
        {creating && (
          <>
            <Controller
              name='confirmPassword'
              control={control}
              rules={{
                required: creating && 'Password Confirmation is required',
                validate: (value: string | undefined, formValues: FormObject) =>
                  value === formValues.password || 'Passwords must match',
              }}
              render={({ field: { onChange, onBlur, name, value } }) => (
                <FormTextField
                  onChange={onChange}
                  onBlur={onBlur}
                  name={name}
                  value={value}
                  errorsLookup={errors}
                  label='Confirm Password'
                  type='password'
                />
              )}
            />
            <Controller
              name='email'
              control={control}
              rules={{
                required: creating && 'Email is required',
                pattern: {
                  value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                  message: 'Must be a valid email',
                },
                validate: {
                  uniqueness: async (value?: string) => {
                    if (value === undefined || value === null) {
                      return true;
                    } else {
                      return (
                        (await accountsClient.validateEmail(value)) ||
                        'Email must be unique'
                      );
                    }
                  },
                },
              }}
              render={({ field: { onChange, onBlur, name, value } }) => (
                <FormTextField
                  onChange={onChange}
                  onBlur={onBlur}
                  name={name}
                  value={value}
                  errorsLookup={errors}
                  label='Email'
                  type='email'
                />
              )}
            />
          </>
        )}
        {creating || (
          <Link className='login__forgot' to=''>
            Forgot Password
          </Link>
        )}
        <input
          className='login__button'
          type='submit'
          value={creating ? 'Create' : 'Login'}
        />
        {apiError && <p>{apiError.response}</p>}
      </form>
    </div>
  );
}
