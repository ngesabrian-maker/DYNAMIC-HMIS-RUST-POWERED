import React from 'react';
import { useAuthContext } from '../context/AuthContext';
import { NurseDashboard } from '../components/NurseDashboard';
import { RolePage } from '../components/RolePage';
import { getRolePageConfig } from '../data/roleConfig';

export function NursePage() {
  const { session } = useAuthContext();
  const config = getRolePageConfig('nurse');

  return (
    <div>
      <RolePage {...config} />
      <div style={{ marginTop: 16 }}>
        <NurseDashboard session={session} />
      </div>
    </div>
  );
}
