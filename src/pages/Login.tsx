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
import { useForm } from 'react-hook-form';

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
    register,
    handleSubmit,
    reset,
    formState: { errors },
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

  console.log(`Login.tsx:67 errors`, errors);

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
        <div className='login__input__group'>
          <input
            {...register('username', {
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
            })}
            type='text'
            className={`login__input ${errors.username && 'invalid'}`}
            placeholder='Username'
          />
          <div className='login__error'>{errors.username?.message}</div>
        </div>
        <div className='login__input__group'>
          <input
            {...register('password', {
              required: 'Password is required',
              maxLength: 32,
              pattern: {
                value:
                  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
                message:
                  '8 characters, 1 uppercase, 1 lowercase, a number, a special character',
              },
            })}
            type='password'
            className={`login__input ${errors.password && 'invalid'}`}
            placeholder='Password'
          />
          <div className='login__error'>{errors.password?.message}</div>
        </div>
        {creating && (
          <>
            <div className='login__input__group'>
              <input
                {...register('confirmPassword', {
                  required: creating && 'Password Confirmation is required',
                  validate: (
                    value: string | undefined,
                    formValues: FormObject,
                  ) => value === formValues.password || 'Passwords must match',
                })}
                type='password'
                className={`login__input ${
                  errors.confirmPassword && 'invalid'
                }`}
                placeholder='Confirm Password'
              />
              <div className='login__error'>
                {errors.confirmPassword?.message}
              </div>
            </div>
            <div className='login__input__group'>
              <input
                {...register('email', {
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
                })}
                type='email'
                className={`login__input ${errors.email && 'invalid'}`}
                placeholder='Email'
              />
              <div className='login__error'>{errors.email?.message}</div>
            </div>
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
