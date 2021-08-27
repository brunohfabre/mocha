import { ReactNode } from 'react';

import { AuthProvider } from './AuthContext';
import { NotesProvider } from './NotesContext';

interface AppProviderProps {
  children: ReactNode;
}

export function AppProvider({ children }: AppProviderProps): JSX.Element {
  return (
    <AuthProvider>
      <NotesProvider>{children}</NotesProvider>{' '}
    </AuthProvider>
  );
}
