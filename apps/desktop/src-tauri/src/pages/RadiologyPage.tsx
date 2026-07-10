import React from 'react';
import { useAuthContext } from '../context/AuthContext';
import { RadiologyDashboard } from '../components/RadiologyDashboard';
import { RolePage } from '../components/RolePage';
import { getRolePageConfig } from '../data/roleConfig';

export function RadiologyPage() {
  const { session } = useAuthContext();
  const config = getRolePageConfig('radiology');

  return (
    <div>
      <RolePage {...config} />
      <div style={{ marginTop: 16 }}>
        <RadiologyDashboard session={session} />
      </div>
    </div>
  );
}
