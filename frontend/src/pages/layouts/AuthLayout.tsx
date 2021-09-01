import React, { ReactNode } from 'react';

interface AuthLayoutProps {
  children: ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps): JSX.Element {
  return <>{children}</>;
}
