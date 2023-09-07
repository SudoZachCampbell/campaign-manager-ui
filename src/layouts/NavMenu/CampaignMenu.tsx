import {
  GiBlackKnightHelm,
  GiExitDoor,
  GiHound,
  GiHouse,
  GiPikeman,
  GiSpellBook,
  GiTreasureMap,
} from 'react-icons/gi';
import { useParams } from 'react-router-dom';
import { Link } from '../../components/Link';
import { useAuth } from '../../hooks/useAuth';
import './NavMenu.styles.scss';

export const CampaignMenu = () => {
  const { logout } = useAuth();

  const { campaignId } = useParams<{ campaignId: string }>();

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
        <Link className="navbar__link" to={`campaigns/${campaignId}/players`}>
          <GiPikeman />
          <p>Players</p>
        </Link>
        <Link className="navbar__link" to={`campaigns/${campaignId}/npcs`}>
          <GiBlackKnightHelm />
          <p>Npcs</p>
        </Link>
        <Link className="navbar__link" to={`campaigns/${campaignId}/monsters`}>
          <GiHound />
          <p>Monsters</p>
        </Link>
        <Link
          className="navbar__link"
          to={`campaigns/${campaignId}/location-hub`}
        >
          <GiTreasureMap />
          <p>Locations</p>
        </Link>
        <Link className="navbar__link" onClick={logout}>
          <GiExitDoor />
        </Link>
      </div>
    </div>
  );
};
