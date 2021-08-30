import { ReactNode } from 'react';

import { Spin } from '../Spin';

interface MenuItemProps {
  children: ReactNode;
  onClick: () => void;
  isLoading?: boolean;
}

export function MenuItem({
  children,
  onClick,
  isLoading,
}: MenuItemProps): JSX.Element {
  return (
    <button
      type="button"
      onClick={e => {
        if (onClick) {
          onClick();
        }

        e.stopPropagation();
      }}
      className="px-4 py-2 max-w-xs hover:bg-gray-100"
    >
      {isLoading ? <Spin fill="black" /> : children}
    </button>
  );
}
