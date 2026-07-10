import React, { useMemo, useState } from 'react';
import { AuthProvider, useAuthContext } from './context/AuthContext';
import { Dashboard } from './components/Dashboard';
import { LoginForm } from './components/LoginForm';
import { FloatingMessages } from './components/FloatingMessages';
import {
  AccountantPage,
  AdminPage,
  CashierPage,
  DoctorPage,
  LabPage,
  NursePage,
  OverviewPage,
  PharmacyPage,
  ProcurementPage,
  RadiologyPage,
  ReceptionPage,
} from './pages/RolePages';
import type { UserRole } from './types/role';

const pageMap: Record<UserRole, React.ComponentType> = {
  overview: OverviewPage,
  reception: ReceptionPage,
  doctor: DoctorPage,
  nurse: NursePage,
  cashier: CashierPage,
  lab: LabPage,
  pharmacy: PharmacyPage,
  radiology: RadiologyPage,
  procurement: ProcurementPage,
  accountant: AccountantPage,
  admin: AdminPage,
};

const navigationItems = Object.entries(pageMap).map(([key, _component]) => ({
  key: key as UserRole,
  label: key.charAt(0).toUpperCase() + key.slice(1),
}));

function AppShell() {
  const { isAuthenticated, session } = useAuthContext();
  const [activePage, setActivePage] = useState<UserRole>('overview');

  const CurrentPage = useMemo(() => {
    const PageComponent = pageMap[activePage] ?? OverviewPage;
    return <PageComponent />;
  }, [activePage]);

  if (!isAuthenticated) {
    return (
      <div className="app-shell" style={{ alignItems: 'center', justifyContent: 'center' }}>
        <LoginForm />
      </div>
    );
  }

  return (
    <>
      <Dashboard items={navigationItems} activePage={activePage} onSelect={setActivePage}>
        <div className="page-card" style={{ marginBottom: 16 }}>
          <h2 style={{ marginTop: 0 }}>Welcome, {session?.displayName ?? session?.username}</h2>
          <p className="page-subtitle">Role: {session?.role}</p>
        </div>
        {CurrentPage}
      </Dashboard>
      <FloatingMessages session={session} />
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppShell />
    </AuthProvider>
  );
}
