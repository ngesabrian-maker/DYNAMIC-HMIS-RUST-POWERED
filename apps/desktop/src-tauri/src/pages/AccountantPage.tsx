import React from 'react';
import { useAuthContext } from '../context/AuthContext';
import { AccountantDashboard } from '../components/AccountantDashboard';
import { RolePage } from '../components/RolePage';
import { getRolePageConfig } from '../data/roleConfig';

export function AccountantPage() {
  const { session } = useAuthContext();
  const config = getRolePageConfig('accountant');

  return (
    <div>
      <RolePage {...config} />
      <div style={{ marginTop: 16 }}>
        <AccountantDashboard session={session} />
      </div>
    </div>
  );
}
