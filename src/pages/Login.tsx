import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { Box, Grid, Theme, Typography } from '@mui/material';
import LocationMap from '../components/mapping/LocationMap';
import { useDnDApi } from '../api/dndDb';
import { AccountsClient, Map } from '../api/Model';
import { NavMenu } from '../layouts/NavMenu/NavMenu';
import { LoginAttempt } from '../api/Model';
import colours from '../style/constants/_colours.scss';
import { PuffLoader } from 'react-spinners';
import { useAuth } from '../hooks/useAuth';
import jwtDecode from 'jwt-decode';
import { JwtPayload } from 'jsonwebtoken';

const accountsClient = new AccountsClient();

export default function Login() {
  const [loginName, setLoginName] = useState<string>();
  const [password, setPassword] = useState<string>();
  const auth = useAuth();

  const { loading, invoke, response, apiError } = useDnDApi(
    (login: string, pass: string) =>
      accountsClient.login(
        new LoginAttempt({ username: login, password: pass }),
      ),
  );

  const attemptLogin = () => {
    invoke(loginName, password);
  };

  useEffect(() => {
    if (!loading && response) {
      let token = jwtDecode<JwtPayload>(response);
      if (token) {
        auth.login(response);
      }
    }
  }, [response]);

  useEffect(() => {
    if (apiError !== null) {
      setLoginName('');
      setPassword('');
    }
  }, [apiError]);

  return loading ? (
    <PuffLoader color={colours.primaryColour} />
  ) : (
    <div className='locationhub__container'>
      <div className='locationhub__map'>
        <form onSubmit={attemptLogin}>
          <div>
            <label htmlFor='loginName'>Username: </label>
            <input type='text' onChange={(e) => setLoginName(e.target.value)} />
          </div>
          <div>
            <label htmlFor='password'>Password: </label>
            <input
              type='password'
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <input type='submit' value='Login' />
          </div>
          {apiError && <p>{apiError.response}</p>}
        </form>
      </div>
    </div>
  );
}
