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
import { useRecoilState } from 'recoil';
import { Button } from '../../components/Button/Button';
import { Link } from '../../components/Link';
import { useAuth } from '../../hooks/useAuth';
import { themeState } from '../../recoil/theme';
import './NavMenu.styles.scss';

export const CampaignMenu = () => {
  const [dark, toggleDarkTheme] = useRecoilState(themeState);

  console.log(`CampaignMenu.tsx:21 dark`, dark);

  const { campaignId } = useParams<{ campaignId: string }>();
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
        <Link className="navbar__link" to={`campaigns/${campaignId}/pcs`}>
          <GiPikeman />
          <p>Player Characters</p>
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
      <Button
        onClick={() => toggleDarkTheme((theme) => !theme)}
        text={dark ? 'Light' : 'Dark'}
        type="info"
      />
    </div>
  );
};
