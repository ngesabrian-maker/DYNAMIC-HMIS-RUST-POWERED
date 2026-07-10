import React from 'react';
import { useAuthContext } from '../context/AuthContext';
import { CashierDashboard } from '../components/CashierDashboard';
import { RolePage } from '../components/RolePage';
import { getRolePageConfig } from '../data/roleConfig';

export function CashierPage() {
  const { session } = useAuthContext();
  const config = getRolePageConfig('cashier');

  return (
    <div>
      <RolePage {...config} />
      <div style={{ marginTop: 16 }}>
        <CashierDashboard session={session} />
      </div>
    </div>
  );
}
