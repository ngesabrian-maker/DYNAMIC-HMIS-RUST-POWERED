import React, { useState } from 'react';
import { QueueViewer } from './QueueViewer';
import { LabQueueViewer } from './LabQueueViewer';
import { RadiologyQueueViewer } from './RadiologyQueueViewer';
import { PharmacyQueueViewer } from './PharmacyQueueViewer';
import type { UserSession } from '../types/user';

type HMISDashboardProps = {
  session: UserSession | null;
};

export function HMISDashboard({ session }: HMISDashboardProps) {
  const [activeView, setActiveView] = useState<
    'overview' | 'queues' | 'lab' | 'radiology' | 'pharmacy'
  >('overview');

  const viewButtons = [
    { id: 'overview', label: '📊 Overview', icon: '📊' },
    { id: 'queues', label: '🚶 All Queues', icon: '🚶' },
    { id: 'lab', label: '🧪 Lab', icon: '🧪' },
    { id: 'radiology', label: '📋 Radiology', icon: '📋' },
    { id: 'pharmacy', label: '💊 Pharmacy', icon: '💊' },
  ];

  const getButtonStyle = (viewId: string, isActive: boolean) => ({
    padding: '8px 16px',
    border: 'none',
    borderRadius: 8,
    background: isActive ? '#2563eb' : '#f1f5f9',
    color: isActive ? 'white' : '#334155',
    cursor: 'pointer',
    fontWeight: isActive ? '600' : '500',
    fontSize: '0.9rem',
    transition: 'all 0.2s',
  });

  return (
    <div
      style={{
        background: 'white',
        borderRadius: 12,
        padding: 16,
        border: '1px solid #e2e8f0',
      }}
    >
      {/* Navigation buttons */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
        {viewButtons.map((btn) => (
          <button
            key={btn.id}
            onClick={() => setActiveView(btn.id as any)}
            style={getButtonStyle(btn.id, activeView === btn.id)}
          >
            {btn.label}
          </button>
        ))}
      </div>

      {/* Content based on active view */}
      <div>
        {activeView === 'overview' && (
          <div>
            <h3 style={{ margin: '0 0 16px', fontSize: '1rem' }}>🏥 HMIS Overview</h3>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: 12,
              }}
            >
              <div
                style={{
                  background: '#f0f9ff',
                  padding: 16,
                  borderRadius: 8,
                  textAlign: 'center',
                  borderLeft: '4px solid #2563eb',
                }}
              >
                <div style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: 8 }}>
                  Total Queues
                </div>
                <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#2563eb' }}>5</div>
              </div>
              <div
                style={{
                  background: '#fef2f2',
                  padding: 16,
                  borderRadius: 8,
                  textAlign: 'center',
                  borderLeft: '4px solid #dc2626',
                }}
              >
                <div style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: 8 }}>
                  Urgent Cases
                </div>
                <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#dc2626' }}>3</div>
              </div>
              <div
                style={{
                  background: '#f0fdf4',
                  padding: 16,
                  borderRadius: 8,
                  textAlign: 'center',
                  borderLeft: '4px solid #10b981',
                }}
              >
                <div style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: 8 }}>
                  Completed Today
                </div>
                <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#10b981' }}>42</div>
              </div>
            </div>
            <p style={{ color: '#64748b', marginTop: 16, fontSize: '0.9rem' }}>
              Navigate using the buttons above to view specific department queues and details.
            </p>
          </div>
        )}

        {activeView === 'queues' && <QueueViewer session={session} />}
        {activeView === 'lab' && <LabQueueViewer session={session} />}
        {activeView === 'radiology' && <RadiologyQueueViewer session={session} />}
        {activeView === 'pharmacy' && <PharmacyQueueViewer session={session} />}
      </div>
    </div>
  );
}
