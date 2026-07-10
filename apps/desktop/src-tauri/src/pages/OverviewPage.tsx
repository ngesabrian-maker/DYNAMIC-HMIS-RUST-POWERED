import React from 'react';
import { useAuthContext } from '../context/AuthContext';
import { InventoryCount } from '../components/InventoryCount';
import { ItemRequisition } from '../components/ItemRequisition';
import { Analytics } from '../components/Analytics';
import { HMISDashboard } from '../components/HMISDashboard';
import { PatientDirectory } from '../components/PatientDirectory';
import { RolePage } from '../components/RolePage';
import { getRolePageConfig } from '../data/roleConfig';

export function OverviewPage() {
  const { session } = useAuthContext();
  const config = getRolePageConfig('overview');

  // Show dashboard widgets for all roles
  return (
    <div>
      <RolePage {...config} />
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 16,
          marginTop: 16,
        }}
      >
        <Analytics session={session} />
        <InventoryCount session={session} />
        <ItemRequisition session={session} />
      </div>

      {/* HMIS Dashboard for comprehensive view */}
      <div style={{ marginTop: 16 }}>
        <HMISDashboard session={session} />
      </div>

      {/* Patient Directory */}
      <div style={{ marginTop: 16 }}>
        <PatientDirectory session={session} />
      </div>
    </div>
  );
}
