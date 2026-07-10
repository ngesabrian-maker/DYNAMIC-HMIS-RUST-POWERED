import React from 'react';
import { useAuthContext } from '../context/AuthContext';
import { AdminDashboard } from '../components/AdminDashboard';
import { RolePage } from '../components/RolePage';
import { getRolePageConfig } from '../data/roleConfig';

export function AdminPage() {
  const { session } = useAuthContext();
  const config = getRolePageConfig('admin');

  return (
    <div>
      <RolePage {...config} />
      <div style={{ marginTop: 16 }}>
        <AdminDashboard session={session} />
      </div>
    </div>
  );
}
