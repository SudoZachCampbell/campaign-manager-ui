import React from 'react';
import './NavMenu.styles.scss';
import { GrHome, GrMapLocation, GrUser, GrGroup } from 'react-icons/gr';
import { GiFishMonster } from 'react-icons/gi';
import { Link } from '../../components/Link';

const NavMenu = () => {
  return (
    <div className='navbar__container'>
      <div className='navbar__iconlist'>
        <Link className='navbar__link' to='/'>
          <GrHome />
        </Link>
        <Link className='navbar__link' to='/players'>
          <GrUser />
        </Link>
        <Link className='navbar__link' to='/npcs'>
          <GrGroup />
        </Link>
        <Link className='navbar__link' to='/monsters'>
          <GiFishMonster />
        </Link>
        <Link className='navbar__link' to='/location-hub'>
          <GrMapLocation />
        </Link>
      </div>
    </div>
  );
};

export { NavMenu };
