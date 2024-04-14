import { GiExitDoor } from 'react-icons/gi';
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
      <div className="navbar__iconlist">
        <Link className="navbar__link" to="/">
          <p>Home</p>
        </Link>
        <Link className="navbar__link" to="/campaigns">
          <p>Campaigns</p>
        </Link>
        <Link className="navbar__link" to={`campaigns/${campaignId}/pcs`}>
          <p>Player Characters</p>
        </Link>
        <Link className="navbar__link" to={`campaigns/${campaignId}/npcs`}>
          <p>Npcs</p>
        </Link>
        <Link className="navbar__link" to={`campaigns/${campaignId}/monsters`}>
          <p>Monsters</p>
        </Link>
        <Link
          className="navbar__link"
          to={`campaigns/${campaignId}/location-hub`}
        >
          <p>Locations</p>
        </Link>
        <Link className="navbar__link" onClick={logout}>
          <GiExitDoor />
        </Link>
      </div>
      {/* <Button
        onClick={() => toggleDarkTheme((theme) => !theme)}
        text={dark ? 'Light' : 'Dark'}
        type="info"
      /> */}
    </div>
  );
};
