import { useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { Link } from '../../components/Link';
import { useAuth } from '../../hooks/useAuth';
import { themeState } from '../../recoil/theme';
import './NavMenu.styles.scss';

export const CampaignMenu = () => {
  const [dark, toggleDarkTheme] = useRecoilState(themeState);

  const { campaignId } = useParams<{ campaignId: string }>();
  const { logout } = useAuth();

  return (
    <div className="navbar__container">
      <div className="navbar__title">
        <Link className="navbar__link" to="/">
          <h1>Campaign Manager</h1>
        </Link>
      </div>
      <div className="navbar__links">
        <div className="navbar__links-main">
          <Link className="navbar__link" to="/campaigns">
            <h3>Campaigns</h3>
          </Link>
          <Link className="navbar__link" to="/compendium">
            <h3>Compendium</h3>
          </Link>
        </div>
        <div className="navbar__links-contextual">
          <Link className="navbar__link" to={`/campaigns/${campaignId}/pcs`}>
            <h2>Players</h2>
          </Link>
          <Link className="navbar__link" to={`/campaigns/${campaignId}/npcs`}>
            <h2>Npcs</h2>
          </Link>
          <Link
            className="navbar__link"
            to={`/campaigns/${campaignId}/monsters`}
          >
            <h2>Monsters</h2>
          </Link>
          <Link
            className="navbar__link"
            to={`/campaigns/${campaignId}/location-hub`}
          >
            <h2>Locations</h2>
          </Link>
          <Link className="navbar__link" to={`/campaigns/${campaignId}/items`}>
            <h2>Items</h2>
          </Link>
        </div>
      </div>

      {/* <Button
        onClick={() => toggleDarkTheme((theme) => !theme)}
        text={dark ? 'Light' : 'Dark'}
        type="info"
      /> */}
    </div>
  );
};
