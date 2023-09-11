import { GiExitDoor, GiHound, GiHouse, GiSpellBook } from 'react-icons/gi';
import { useParams } from 'react-router-dom';
import { Link } from '../../components/Link';
import { useAuth } from '../../hooks/useAuth';
import './NavMenu.styles.scss';

export const CompendiumMenu = () => {
  const { logout } = useAuth();

  const { campaignId } = useParams<{ campaignId: string }>();

  return (
    <div className="navbar__container">
      <div className="navbar__iconlist">
        <Link className="navbar__link" to="/">
          <GiHouse className="navbar__icon" />
          <p>Home</p>
        </Link>
        <Link className="navbar__link" to="/campaigns">
          <GiSpellBook className="navbar__icon" />
          <p>Campaigns</p>
        </Link>
        <Link className="navbar__link" to={`compendium/monsters`}>
          <GiHound className="navbar__icon" />
          <p>Monsters</p>
        </Link>
        <Link className="navbar__link" onClick={logout}>
          <GiExitDoor className="navbar__icon" />
        </Link>
      </div>
    </div>
  );
};
