import React, { ReactNode } from 'react';

interface MenuListProps {
  children: ReactNode;
}

export function MenuList({ children }: MenuListProps): JSX.Element {
  return <>{children}</>;
}
