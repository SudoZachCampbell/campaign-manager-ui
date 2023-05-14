import React, { useState, useEffect } from 'react';
import { useDnDApi } from '../api/dndDb';
import { Account, AccountsClient, CreateAttempt, Map } from '../api/Model';
import { LoginAttempt } from '../api/Model';
import { PuffLoader } from 'react-spinners';
import { useAuth } from '../hooks/useAuth';
import jwtDecode from 'jwt-decode';
import { JwtPayload } from 'jsonwebtoken';
import { Link } from 'react-router-dom';

import './Login.styles.scss';
import colours from '../style/constants/_colours.scss';

const accountsClient = new AccountsClient();

interface ValidForm {
  username: boolean;
  password: boolean;
  email?: boolean;
  confirmPassword?: boolean;
}

export default function Login() {
  const [username, setUsername] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [creating, setCreating] = useState<boolean>(false);
  const [valid, setValid] = useState<ValidForm>({
    username: false,
    password: false,
  });

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

  const attemptLogin = () => {
    if (valid) {
      invoke(username, password, creating ? email : null);
    }
  };

  useEffect(() => {
    if (!loading && responseToken) {
      login(responseToken);
    }
  }, [responseToken]);

  const login = (token: string) => {
    let tokenObject = jwtDecode<JwtPayload>(token);
    if (tokenObject) {
      auth.login(token);
      // setLoggingIn(true);
    }
  };

  useEffect(() => {
    if (apiError !== null) {
      setUsername('');
      setPassword('');
      setEmail('');
    }
  }, [apiError]);

  return loading ? (
    <PuffLoader color={colours.primaryColour} />
  ) : (
    <div className='login__container'>
      <form onSubmit={attemptLogin} className='login__form'>
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
        <div>
          <input
            type='text'
            className='login__input'
            placeholder='Username'
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <input
            type='password'
            className='login__input'
            placeholder='Password'
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {creating && (
          <>
            {' '}
            <div>
              <input
                type='password'
                className='login__input'
                placeholder='Confirm Password'
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <input
                type='text'
                className='login__input'
                placeholder='Email'
                onChange={(e) => setEmail(e.target.value)}
              />
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
