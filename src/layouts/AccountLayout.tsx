import React, { ReactNode, Suspense, useEffect } from 'react';
import { NavMenu } from './NavMenu/NavMenu';
import './layout.scss';
import { useNavigate, useOutlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { PuffLoader } from 'react-spinners';

export const AccountLayout = () => {
  const outlet = useOutlet();
  const user = useAuth();
  const navigate = useNavigate();

  console.log(`AccountLayout.tsx:12 user.token`, user.token);

  useEffect(() => {
    if (!user.token) {
      console.log(`AccountLayout.tsx:15 hit`);
      navigate('/login');
    }
  }, []);

  return user.token ? (
    <div className='global__container'>
      <NavMenu />
      <div className='global__content'>
        <Suspense fallback={<h1>Loading</h1>}>{outlet}</Suspense>
      </div>
    </div>
  ) : (
    <PuffLoader />
  );
};
