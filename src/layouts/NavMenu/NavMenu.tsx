import { GiExitDoor, GiHound, GiHouse, GiSpellBook } from 'react-icons/gi';
import { Link } from '../../components/Link';
import { useAuth } from '../../hooks/useAuth';
import './NavMenu.styles.scss';

const NavMenu = () => {
  const { logout } = useAuth();

  return (
    <div className="navbar__container">
      <div className="navbar__iconlist">
        <Link className="navbar__link" to="/">
          <GiHouse />
          <p>Home</p>
        </Link>
        <Link className="navbar__link" to="/campaigns">
          <GiSpellBook />
          <p>Campaigns</p>
        </Link>
        <Link className="navbar__link" to="/monsters">
          <GiHound />
          <p>Monsters</p>
        </Link>
        <Link className="navbar__link" onClick={logout}>
          <GiExitDoor />
        </Link>
      </div>
    </div>
  );
};

export { NavMenu };
