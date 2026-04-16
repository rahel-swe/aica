import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';

import { createAuthClient } from 'better-auth/client';
import { email } from 'better-auth';

const authClient = createAuthClient({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
});

interface User {
  id: string;
  email: string;
  name?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  loginWithGoogle: () => Promise<void>;
  loginWithEmail: (email: string, password: string) => Promise<any>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkSession();
  }, []);

  const checkSession = async () => {
    try {
      const { data: session } = await authClient.getSession();
      setUser(session?.user || null);
    } catch (error) {
      console.error('Session check failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const loginWithGoogle = async () => {
    await authClient.signIn.social({
      provider: 'google',
      callbackURL: './dashboard',
    });
  };

  const loginWithEmail = async (email: string, password: string) => {
    const result = await authClient.signIn.email({
      email,
      password,
      callbackURL: './dashboard',
    });

    if (!result.error) {
      setUser(result.data.user);
    }

    return result;
  };
  const logout = async () => {
    await authClient.signOut();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        loginWithGoogle,
        loginWithEmail,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
