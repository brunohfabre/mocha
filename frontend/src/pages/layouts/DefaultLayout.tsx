import { ReactNode } from 'react';

import { Header } from '../../components/Header';

interface DefaultLayoutProps {
  children: ReactNode;
}

export function DefaultLayout({ children }: DefaultLayoutProps): JSX.Element {
  return (
    <>
      <Header />

      {children}
    </>
  );
}
