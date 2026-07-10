import React from 'react';
import { useAuthContext } from '../context/AuthContext';
import { ReceptionDashboard } from '../components/ReceptionDashboard';
import { RolePage } from '../components/RolePage';
import { getRolePageConfig } from '../data/roleConfig';

export function ReceptionPage() {
  const { session } = useAuthContext();
  const config = getRolePageConfig('reception');

  return (
    <div>
      <RolePage {...config} />
      <div style={{ marginTop: 16 }}>
        <ReceptionDashboard session={session} />
      </div>
    </div>
  );
}
