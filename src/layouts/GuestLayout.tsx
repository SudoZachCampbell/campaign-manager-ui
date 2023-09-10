import { Suspense } from 'react';
import { useNavigate, useOutlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import './layout.styles.scss';

export const GuestLayout = () => {
  const outlet = useOutlet();
  const user = useAuth();
  const navigate = useNavigate();

  if (user?.token) {
    navigate('/');
  }

  return (
    <div className="global__container">
      <Suspense fallback={<h1>Loading</h1>}>{outlet}</Suspense>
    </div>
  );
};
