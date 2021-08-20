import { createContext, ReactNode, useEffect, useState } from 'react';
import { setCookie, parseCookies, destroyCookie } from 'nookies';
import Router from 'next/router';

import { api } from '../services/api';

type User = {
  id: string;
  name: string;
  email: string;
};

type SignInData = {
  email: string;
  password: string;
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  signIn: (data: SignInData) => Promise<void>;
  signOut: () => void;
};

export const AuthContext = createContext({} as AuthContextType);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps): JSX.Element {
  const [user, setUser] = useState<User | null>(null);

  const isAuthenticated = !!user;

  useEffect(() => {
    async function loadUserData(): Promise<void> {
      try {
        const { 'mocha.token': token } = parseCookies();

        if (token) {
          const response = await api.get('/sessions');

          setUser(response.data);
        }
      } catch (err) {
        alert(err.data.message);
      }
    }

    loadUserData();
  }, []);

  async function signIn({ email, password }: SignInData): Promise<void> {
    const response = await api.post('/sessions', { email, password });
    const { token, user: userData } = response.data;

    setCookie(undefined, 'mocha.token', token, {
      maxAge: 60 * 60 * 24 * 30, // 30 days
    });

    api.defaults.headers.authorization = `Bearer ${token}`;

    setUser(userData);

    Router.push('/');
  }

  function signOut(): void {
    destroyCookie(undefined, 'mocha.token');

    setUser(null);

    delete api.defaults.headers.authorization;

    Router.push('/signin');
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
