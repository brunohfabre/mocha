import { useRef, ReactNode } from 'react';

import { Spin } from '../Spin';

interface MenuItemProps {
  children: ReactNode;
  onClick: () => void;
  isLoading?: boolean;
  type?: 'default' | 'danger';
}

export function MenuItem({
  children,
  onClick,
  isLoading,
  type = 'default',
}: MenuItemProps): JSX.Element {
  const itemRef = useRef<HTMLButtonElement>(null);

  return (
    <button
      ref={itemRef}
      type="button"
      onClick={e => {
        if (onClick) {
          onClick();
        }

        e.stopPropagation();
      }}
      className={`px-4 py-2 max-w-xs hover:bg-gray-100 flex justify-center items-center ${
        type === 'danger' && 'text-red-500'
      }`}
      style={
        isLoading
          ? {
              width: itemRef.current?.offsetWidth,
              height: itemRef.current?.offsetHeight,
            }
          : {}
      }
    >
      {isLoading ? <Spin fill="black" /> : children}
    </button>
  );
}
