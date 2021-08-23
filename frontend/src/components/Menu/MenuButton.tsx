import { ReactNode } from 'react';

interface MenuButtonProps {
  children: ReactNode;
}

export function MenuButton({ children }: MenuButtonProps): JSX.Element {
  return <>{children}</>;
}
