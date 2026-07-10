import React from 'react';
import { useAuthContext } from '../context/AuthContext';
import { PharmacyDashboard } from '../components/PharmacyDashboard';
import { RolePage } from '../components/RolePage';
import { getRolePageConfig } from '../data/roleConfig';

export function PharmacyPage() {
  const { session } = useAuthContext();
  const config = getRolePageConfig('pharmacy');

  return (
    <div>
      <RolePage {...config} />
      <div style={{ marginTop: 16 }}>
        <PharmacyDashboard session={session} />
      </div>
    </div>
  );
}
