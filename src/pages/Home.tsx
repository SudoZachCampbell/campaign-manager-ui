import { useNavigate } from 'react-router-dom';
import './Home.styles.scss';

interface HomeProps {}

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="homepage__container">
      <div className="homepage__header">
        <h1>CAMPAIGN MANAGER</h1>
      </div>
      <div className="homepage__content">
        <div className="homepage__dial">
          <div className="top">
            <div className="left" onClick={() => navigate('/compendium')}>
              <p>Compendium</p>
            </div>
            <div className="right" onClick={() => navigate('/campaigns')}>
              <p>Campaigns</p>
            </div>
          </div>
          <div className="bottom" onClick={() => navigate('/players')}>
            <div className="left">
              <p>Players</p>
            </div>
            <div className="right" onClick={() => navigate('/account')}>
              <p>Account</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
