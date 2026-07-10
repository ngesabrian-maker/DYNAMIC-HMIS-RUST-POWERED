import React from 'react';
import { useAuthContext } from '../context/AuthContext';
import { DoctorDashboard } from '../components/DoctorDashboard';
import { RolePage } from '../components/RolePage';
import { getRolePageConfig } from '../data/roleConfig';

export function DoctorPage() {
  const { session } = useAuthContext();
  const config = getRolePageConfig('doctor');

  return (
    <div>
      <RolePage {...config} />
      <div style={{ marginTop: 16 }}>
        <DoctorDashboard session={session} />
      </div>
    </div>
  );
}
