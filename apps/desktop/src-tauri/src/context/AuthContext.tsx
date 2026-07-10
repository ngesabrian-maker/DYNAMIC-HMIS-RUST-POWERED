import React, { createContext, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { authenticateUser } from '../services/authService';
import type { UserSession } from '../types/user';

type AuthContextValue = {
  session: UserSession | null;
  isAuthenticated: boolean;
  login: (credentials: { username: string; password: string }) => Promise<UserSession>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<UserSession | null>(null);

  const login = async (credentials: { username: string; password: string }) => {
    const nextSession = await authenticateUser(credentials);
    setSession(nextSession);
    return nextSession;
  };

  const logout = () => {
    setSession(null);
  };

  const value = useMemo<AuthContextValue>(
    () => ({
      session,
      isAuthenticated: Boolean(session),
      login,
      logout,
    }),
    [session],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
  const context = React.useContext(AuthContext);

  if (!context) {
    throw new Error('useAuthContext must be used inside AuthProvider');
  }

  return context;
}
