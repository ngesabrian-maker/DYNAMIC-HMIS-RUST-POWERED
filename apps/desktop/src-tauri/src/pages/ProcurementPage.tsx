import React from 'react';
import { useAuthContext } from '../context/AuthContext';
import { ProcurementDashboard } from '../components/ProcurementDashboard';
import { RolePage } from '../components/RolePage';
import { getRolePageConfig } from '../data/roleConfig';

export function ProcurementPage() {
  const { session } = useAuthContext();
  const config = getRolePageConfig('procurement');

  return (
    <div>
      <RolePage {...config} />
      <div style={{ marginTop: 16 }}>
        <ProcurementDashboard session={session} />
      </div>
    </div>
  );
}
