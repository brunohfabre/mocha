import { useContext } from 'react';

import { Link } from 'react-router-dom';

import LogoBlackImage from '../assets/images/logo_black.svg';
import { AuthContext } from '../contexts/AuthContext';
import { Menu, MenuButton, MenuList, MenuItem } from './Menu';

export function Header(): JSX.Element {
  const { signOut, user } = useContext(AuthContext);

  return (
    <header className="sticky top-0 h-12 bg-white shadow-sm border-b flex px-4 items-center justify-between">
      <Link to="/notes">
        <img src={LogoBlackImage} alt="Mocha" className="w-10" />
      </Link>

      <Menu placement="bottom-end">
        <MenuButton>{user?.name || 'Unknow name'}</MenuButton>

        <MenuList>
          <MenuItem onClick={signOut}>Sign out</MenuItem>
        </MenuList>
      </Menu>
    </header>
  );
}
