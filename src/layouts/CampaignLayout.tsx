import { Suspense, useEffect } from 'react';
import { useNavigate, useOutlet } from 'react-router-dom';
import { PuffLoader } from 'react-spinners';
import { useAuth } from '../hooks/useAuth';
import { CampaignMenu } from './NavMenu/CampaignMenu';
import './layout.styles.scss';

export const CampaignLayout = () => {
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
      <CampaignMenu />
      <div className="global__content">
        <Suspense fallback={<h1>Loading</h1>}>{outlet}</Suspense>
      </div>
    </div>
  ) : (
    <PuffLoader />
  );
};
