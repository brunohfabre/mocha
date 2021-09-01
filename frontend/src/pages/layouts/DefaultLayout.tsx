import React, { ReactNode } from 'react';

import { Header } from '@components/Header';
import { Sidebar } from '@components/Sidebar';

interface DefaultLayoutProps {
  children: ReactNode;
}

export function DefaultLayout({ children }: DefaultLayoutProps): JSX.Element {
  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <div className="flex-1">
        <Header />

        {children}
      </div>
    </div>
  );
}
