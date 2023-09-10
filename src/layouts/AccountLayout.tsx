import { Suspense, useEffect } from 'react';
import { useNavigate, useOutlet } from 'react-router-dom';
import { PuffLoader } from 'react-spinners';
import { useAuth } from '../hooks/useAuth';
import { NavMenu } from './NavMenu/NavMenu';
import './layout.styles.scss';

export const AccountLayout = () => {
  const outlet = useOutlet();
  const user = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (
      !user.token ||
      new Date() > new Date(Number(user.payload?.exp) * 1000)
    ) {
      user.logout();
      navigate('/login');
    }
  }, []);

  return user.token ? (
    <div className="global__container">
      <NavMenu />
      <div className="global__content">
        <Suspense fallback={<h1>Loading</h1>}>{outlet}</Suspense>
      </div>
    </div>
  ) : (
    <PuffLoader />
  );
};
