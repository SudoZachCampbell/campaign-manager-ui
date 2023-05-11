import React, { ReactNode, Suspense } from 'react';
import { NavMenu } from './NavMenu/NavMenu';
import './layout.scss';
import { useNavigate, useOutlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export const GuestLayout = () => {
  const outlet = useOutlet();
  const user = useAuth();
  const navigate = useNavigate();

  if (user?.token) {
    navigate('/');
  }

  return (
    <div className='global__container'>
      <Suspense fallback={<h1>Loading</h1>}>{outlet}</Suspense>
    </div>
  );
};
