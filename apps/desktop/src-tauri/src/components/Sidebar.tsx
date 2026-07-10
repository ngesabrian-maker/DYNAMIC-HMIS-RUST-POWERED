import React from 'react';
import type { UserRole } from '../types/role';

type SidebarProps = {
  items: Array<{ key: UserRole; label: string }>;
  activePage: UserRole;
  onSelect: (page: UserRole) => void;
};

export function Sidebar({ items, activePage, onSelect }: SidebarProps) {
  return (
    <aside className="sidebar">
      <h1>HMIS Desktop</h1>
      <p>Role-based pages derived from the use case diagram.</p>
      {items.map((page) => (
        <button
          key={page.key}
          className={`nav-button ${activePage === page.key ? 'active' : ''}`}
          onClick={() => onSelect(page.key)}
        >
          {page.label}
        </button>
      ))}
    </aside>
  );
}
