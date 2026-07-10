import React from 'react';
import { useAuthContext } from '../context/AuthContext';
import { LabDashboard } from '../components/LabDashboard';
import { RolePage } from '../components/RolePage';
import { getRolePageConfig } from '../data/roleConfig';

export function LabPage() {
  const { session } = useAuthContext();
  const config = getRolePageConfig('lab');

  return (
    <div>
      <RolePage {...config} />
      <div style={{ marginTop: 16 }}>
        <LabDashboard session={session} />
      </div>
    </div>
  );
}
