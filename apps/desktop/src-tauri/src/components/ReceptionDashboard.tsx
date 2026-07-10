import React, { useEffect, useState } from 'react';
import { fetchDepartmentQueue } from '../services/hmisService';
import type { DepartmentQueue } from '../services/hmisService';
import type { UserSession } from '../types/user';

type ReceptionDashboardProps = {
  session: UserSession | null;
};

export function ReceptionDashboard({ session }: ReceptionDashboardProps) {
  const [queue, setQueue] = useState<DepartmentQueue | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadQueue = async () => {
      setLoading(true);
      const data = await fetchDepartmentQueue('Reception', session);
      setQueue(data);
      setLoading(false);
    };

    loadQueue();
    const interval = setInterval(loadQueue, 15000);
    return () => clearInterval(interval);
  }, [session]);

  const getStatusColor = (status: string) => {
    return {
      'waiting-checkin': '#f59e0b',
      'checked-in': '#3b82f6',
      verified: '#10b981',
      registered: '#8b5cf6',
    }[status] || '#94a3b8';
  };

  return (
    <div>
      {/* Check-in Queue */}
      <div
        style={{
          background: 'white',
          borderRadius: 12,
          padding: 16,
          border: '1px solid #e2e8f0',
          marginBottom: 16,
        }}
      >
        <h3 style={{ margin: '0 0 16px', fontSize: '1.1rem' }}>🏥 Patient Check-in</h3>

        {loading ? (
          <div style={{ color: '#94a3b8' }}>Loading check-in queue...</div>
        ) : !queue ? (
          <div style={{ color: '#94a3b8' }}>No check-in data</div>
        ) : (
          <>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: 12,
                marginBottom: 16,
              }}
            >
              <div
                style={{
                  background: '#fef3c7',
                  padding: 14,
                  borderRadius: 8,
                  textAlign: 'center',
                  borderLeft: '4px solid #f59e0b',
                }}
              >
                <div style={{ fontSize: '2.2rem', fontWeight: 'bold', color: '#b45309' }}>
                  {queue.entries.length}
                </div>
                <div style={{ fontSize: '0.85rem', color: '#92400e', marginTop: 4 }}>
                  Waiting to Check-in
                </div>
              </div>
              <div
                style={{
                  background: '#dbeafe',
                  padding: 14,
                  borderRadius: 8,
                  textAlign: 'center',
                  borderLeft: '4px solid #3b82f6',
                }}
              >
                <div style={{ fontSize: '2.2rem', fontWeight: 'bold', color: '#1e40af' }}>
                  {Math.floor(queue.entries.length * 0.6)}
                </div>
                <div style={{ fontSize: '0.85rem', color: '#1e3a8a', marginTop: 4 }}>
                  Checked-in Today
                </div>
              </div>
              <div
                style={{
                  background: '#dcfce7',
                  padding: 14,
                  borderRadius: 8,
                  textAlign: 'center',
                  borderLeft: '4px solid #10b981',
                }}
              >
                <div style={{ fontSize: '2.2rem', fontWeight: 'bold', color: '#15803d' }}>
                  2.1m
                </div>
                <div style={{ fontSize: '0.85rem', color: '#166534', marginTop: 4 }}>
                  Avg Wait Time
                </div>
              </div>
            </div>

            {/* Patient Queue */}
            <div style={{ maxHeight: 400, overflow: 'auto' }}>
              <h4 style={{ margin: '0 0 12px', fontSize: '0.95rem' }}>Check-in Queue</h4>
              {queue.entries.length === 0 ? (
                <div style={{ color: '#94a3b8', textAlign: 'center', padding: 20 }}>
                  No patients waiting
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {queue.entries.map((entry, idx) => (
                    <div
                      key={entry.id}
                      style={{
                        padding: 12,
                        background: '#f8fafc',
                        borderRadius: 8,
                        borderLeft: `4px solid ${getStatusColor(entry.status)}`,
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'start',
                          marginBottom: 8,
                        }}
                      >
                        <div>
                          <div style={{ fontWeight: 600, marginBottom: 2 }}>
                            #{idx + 1}: {entry.patientName}
                          </div>
                          <div style={{ fontSize: '0.85rem', color: '#64748b' }}>
                            ID: {entry.id.slice(0, 8).toUpperCase()}
                          </div>
                        </div>
                        <span
                          style={{
                            background: getStatusColor(entry.status),
                            color: 'white',
                            padding: '4px 8px',
                            borderRadius: 4,
                            fontSize: '0.7rem',
                            fontWeight: 600,
                          }}
                        >
                          {entry.status.replace('-', ' ')}
                        </span>
                      </div>
                      <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                        Appointment: {new Date(entry.admittedAt).toLocaleTimeString()}
                      </div>
                      <div style={{ fontSize: '0.8rem', color: '#475569', marginTop: 4 }}>
                        Department: General Outpatient
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </div>

      {/* Reception Metrics */}
      <div
        style={{
          background: 'white',
          borderRadius: 12,
          padding: 16,
          border: '1px solid #e2e8f0',
        }}
      >
        <h3 style={{ margin: '0 0 16px', fontSize: '1.1rem' }}>📊 Reception Performance</h3>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: 12,
          }}
        >
          <div
            style={{
              background: '#f0f9ff',
              padding: 14,
              borderRadius: 8,
              borderLeft: '4px solid #2563eb',
            }}
          >
            <div style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: 8 }}>
              Check-ins Today
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#2563eb' }}>64</div>
            <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: 4 }}>
              ↑ 8% from yesterday
            </div>
          </div>
          <div
            style={{
              background: '#fef9e7',
              padding: 14,
              borderRadius: 8,
              borderLeft: '4px solid #eab308',
            }}
          >
            <div style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: 8 }}>
              Scheduled Appointments
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#ea8c2e' }}>28</div>
            <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: 4 }}>
              For today
            </div>
          </div>
          <div
            style={{
              background: '#dcfce7',
              padding: 14,
              borderRadius: 8,
              borderLeft: '4px solid #10b981',
            }}
          >
            <div style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: 8 }}>
              No-show Rate
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#10b981' }}>5.2%</div>
            <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: 4 }}>
              ↓ 1.3% from last week
            </div>
          </div>
          <div
            style={{
              background: '#f3f0ff',
              padding: 14,
              borderRadius: 8,
              borderLeft: '4px solid #8b5cf6',
            }}
          >
            <div style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: 8 }}>
              Satisfaction Score
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#8b5cf6' }}>4.6/5</div>
            <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: 4 }}>
              Patient feedback
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
