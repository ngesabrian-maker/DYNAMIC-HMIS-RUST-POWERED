import React from 'react';
import { Sidebar } from './Sidebar';
import type { UserRole } from '../types/role';

type DashboardProps = {
  items: Array<{ key: UserRole; label: string }>;
  activePage: UserRole;
  onSelect: (page: UserRole) => void;
  children: React.ReactNode;
};

export function Dashboard({ items, activePage, onSelect, children }: DashboardProps) {
  return (
    <div className="app-shell">
      <Sidebar items={items} activePage={activePage} onSelect={onSelect} />
      <main className="main-panel">{children}</main>
    </div>
  );
}
