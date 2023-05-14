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
    loading: loginLoading,
    invoke: loginInvoke,
    response: loginResponse,
    apiError: loginError,
  } = useDnDApi((login: string, pass: string) =>
    accountsClient.login(new LoginAttempt({ username: login, password: pass })),
  );

  const {
    loading: createLoading,
    invoke: createInvoke,
    response: createResponse,
    apiError: createError,
  } = useDnDApi((login: string, pass: string, email: string) =>
    accountsClient.createAccount(
      new CreateAttempt({ username: login, password: pass, email }),
    ),
  );

  const attemptLogin = () => {
    if (valid) {
      if (creating) {
        createInvoke(username, password, email);
      } else {
        loginInvoke(username ?? email, password);
      }
    }
  };

  useEffect(() => {
    if (!loginLoading && loginResponse) {
      login(loginResponse);
    }
  }, [loginResponse]);

  useEffect(() => {
    if (!createLoading && createResponse) {
      login(createResponse);
    }
  }, [createResponse]);

  const login = (token: string) => {
    let tokenObject = jwtDecode<JwtPayload>(token);
    if (tokenObject) {
      auth.login(token);
      // setLoggingIn(true);
    }
  };

  useEffect(() => {
    if (loginError !== null) {
      setUsername('');
      setPassword('');
    }
  }, [loginError]);

  return createLoading || loginLoading ? (
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
          <label htmlFor='loginName'>Username: </label>
          <input
            id='loginName'
            type='text'
            className='login__input'
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor='password'>Password: </label>
          <input
            id='password'
            type='password'
            className='login__input'
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {creating && (
          <>
            {' '}
            <div>
              <label htmlFor='repeatPassword'>Repeat: </label>
              <input
                id='repeatPassword'
                type='password'
                className='login__input'
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor='email'>Email: </label>
              <input
                id='email'
                type='text'
                className='login__input'
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </>
        )}
        <div>
          <Link to=''>Forgot Password</Link>
        </div>
        <div>
          <input type='submit' value={creating ? 'Create' : 'Login'} />
        </div>
        {creating
          ? createError && <p>{createError.response}</p>
          : loginError && <p>{loginError.response}</p>}
      </form>
    </div>
  );
}
