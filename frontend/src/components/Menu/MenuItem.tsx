import { ReactNode } from 'react';

interface MenuItemProps {
  children: ReactNode;
  onClick: () => void;
}

export function MenuItem({ children, onClick }: MenuItemProps): JSX.Element {
  return (
    <button
      type="button"
      onClick={onClick}
      className="px-4 py-2 max-w-xs hover:bg-gray-100"
    >
      {children}
    </button>
  );
}
