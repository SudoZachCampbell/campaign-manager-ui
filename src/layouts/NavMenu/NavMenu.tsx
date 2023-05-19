import React from 'react';
import './NavMenu.styles.scss';
import {
  GiSpellBook,
  GiHouse,
  GiPikeman,
  GiBlackKnightHelm,
  GiHound,
  GiTreasureMap,
  GiExitDoor,
} from 'react-icons/gi';
import { Link } from '../../components/Link';
import { useAuth } from '../../hooks/useAuth';

const NavMenu = () => {
  const { logout } = useAuth();

  return (
    <div className='navbar__container'>
      <div className='navbar__iconlist'>
        <Link className='navbar__link' to='/'>
          <GiHouse />
        </Link>
        <Link className='navbar__link' to='/campaigns'>
          <GiSpellBook />
        </Link>
        <Link className='navbar__link' to='/players'>
          <GiPikeman />
        </Link>
        <Link className='navbar__link' to='/npcs'>
          <GiBlackKnightHelm />
        </Link>
        <Link className='navbar__link' to='/monsters'>
          <GiHound />
        </Link>
        <Link className='navbar__link' to='/location-hub'>
          <GiTreasureMap />
        </Link>
        <Link className='navbar__link' onClick={logout}>
          <GiExitDoor />
        </Link>
      </div>
    </div>
  );
};

export { NavMenu };
