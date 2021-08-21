import { createContext, ReactNode, useEffect, useState } from 'react';

import { toast } from 'react-toastify';

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
  loading: boolean;
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
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  const isAuthenticated = !!user;

  function signOut(): void {
    localStorage.removeItem('mocha.token');

    setUser(null);

    delete api.defaults.headers.authorization;
  }

  useEffect(() => {
    async function loadUserData(): Promise<void> {
      try {
        const token = localStorage.getItem('mocha.token');

        if (token) {
          const response = await api.get('/sessions');

          setUser(response.data);
        }
      } catch (err) {
        toast.error(err.data?.message);

        signOut();
      } finally {
        setLoading(false);
      }
    }

    loadUserData();
  }, []);

  async function signIn({ email, password }: SignInData): Promise<void> {
    const response = await api.post('/sessions', { email, password });

    const { token, user: userData } = response.data;

    localStorage.setItem('mocha.token', token);

    api.defaults.headers.authorization = `Bearer ${token}`;

    setUser(userData);
  }

  return (
    <AuthContext.Provider
      value={{
        loading,
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
