import React, { useContext } from 'react';

import { useHistory, useLocation } from 'react-router-dom';

import { AuthContext } from '@contexts/AuthContext';

import { Menu, MenuButton, MenuList, MenuItem } from './Menu';

export function Header(): JSX.Element {
  const location = useLocation();
  const history = useHistory();

  const { signOut, user } = useContext(AuthContext);

  const hasBack = location.pathname.split('/').length > 2;
  const routeName = location.pathname.split('/')[1];

  function handleGoBack(): void {
    history.goBack();
  }

  return (
    <header className="sticky top-0 h-14 bg-white border-b flex pr-4 items-center justify-between">
      <div className="flex items-center">
        {hasBack && (
          <button
            onClick={handleGoBack}
            className="flex justify-center items-center w-14 h-14"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 fill-current text-black opacity-50"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
          </button>
        )}

        <p className={!hasBack ? 'ml-4' : ''}>{routeName}</p>
      </div>

      <Menu placement="bottom-end">
        <MenuButton>{user?.name || 'Unknow name'}</MenuButton>

        <MenuList>
          <MenuItem onClick={signOut} type="danger">
            Sign out
          </MenuItem>
        </MenuList>
      </Menu>
    </header>
  );
}
