import React from 'react';
import { useAuthContext } from '../context/AuthContext';

type ProtectedProps = {
  children: React.ReactNode;
};

export function Protected({ children }: ProtectedProps) {
  const { isAuthenticated } = useAuthContext();

  if (!isAuthenticated) {
    return <div className="page-card">Please sign in to continue.</div>;
  }

  return <>{children}</>;
}
