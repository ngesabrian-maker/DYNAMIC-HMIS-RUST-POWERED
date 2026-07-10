import React, { useEffect, useState } from 'react';
import { fetchDepartmentQueue } from '../services/hmisService';
import type { DepartmentQueue } from '../services/hmisService';
import type { UserSession } from '../types/user';

type DoctorDashboardProps = {
  session: UserSession | null;
};

export function DoctorDashboard({ session }: DoctorDashboardProps) {
  const [queue, setQueue] = useState<DepartmentQueue | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadQueue = async () => {
      setLoading(true);
      const data = await fetchDepartmentQueue('Doctor', session);
      setQueue(data);
      setLoading(false);
    };

    loadQueue();
    const interval = setInterval(loadQueue, 15000);
    return () => clearInterval(interval);
  }, [session]);

  const getPriorityColor = (priority: string) => {
    return {
      vip: '#f59e0b',
      urgent: '#dc2626',
      normal: '#3b82f6',
    }[priority] || '#3b82f6';
  };

  const getStatusColor = (status: string) => {
    return {
      waiting: '#94a3b8',
      'in-service': '#2563eb',
      completed: '#10b981',
    }[status] || '#94a3b8';
  };

  return (
    <div>
      {/* Doctor Queue */}
      <div
        style={{
          background: 'white',
          borderRadius: 12,
          padding: 16,
          border: '1px solid #e2e8f0',
          marginBottom: 16,
        }}
      >
        <h3 style={{ margin: '0 0 16px', fontSize: '1.1rem' }}>👨‍⚕️ Patient Queue</h3>

        {loading ? (
          <div style={{ color: '#94a3b8' }}>Loading queue...</div>
        ) : !queue ? (
          <div style={{ color: '#94a3b8' }}>No queue data</div>
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
                  background: '#f0f9ff',
                  padding: 12,
                  borderRadius: 8,
                  textAlign: 'center',
                  borderLeft: '4px solid #2563eb',
                }}
              >
                <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#2563eb' }}>
                  {queue.totalInQueue}
                </div>
                <div style={{ fontSize: '0.85rem', color: '#64748b' }}>Patients Waiting</div>
              </div>
              <div
                style={{
                  background: '#fef2f2',
                  padding: 12,
                  borderRadius: 8,
                  textAlign: 'center',
                  borderLeft: '4px solid #dc2626',
                }}
              >
                <div style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: 8 }}>
                  Avg Wait Time
                </div>
                <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#dc2626' }}>
                  {queue.averageWaitTime}m
                </div>
              </div>
              <div
                style={{
                  background: '#f0fdf4',
                  padding: 12,
                  borderRadius: 8,
                  textAlign: 'center',
                  borderLeft: '4px solid #10b981',
                }}
              >
                <div style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: 8 }}>
                  Next Patient
                </div>
                <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#10b981' }}>
                  Ready
                </div>
              </div>
            </div>

            {/* Queue List */}
            <div style={{ maxHeight: 400, overflow: 'auto' }}>
              <h4 style={{ margin: '0 0 12px', fontSize: '0.95rem' }}>Current Queue</h4>
              {queue.entries.length === 0 ? (
                <div style={{ color: '#94a3b8', textAlign: 'center', padding: 20 }}>
                  No patients in queue
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
                        borderLeft: `4px solid ${getPriorityColor(entry.priority)}`,
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
                        <div style={{ fontWeight: 600 }}>
                          #{idx + 1} - {entry.patientName}
                        </div>
                        <span
                          style={{
                            background: getPriorityColor(entry.priority),
                            color: 'white',
                            padding: '4px 8px',
                            borderRadius: 4,
                            fontSize: '0.75rem',
                            fontWeight: 600,
                          }}
                        >
                          {entry.priority.toUpperCase()}
                        </span>
                      </div>
                      <div style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: 6 }}>
                        ID: {entry.patientId} | Status:{' '}
                        <span
                          style={{
                            background: getStatusColor(entry.status),
                            color: 'white',
                            padding: '2px 6px',
                            borderRadius: 3,
                            marginLeft: 4,
                          }}
                        >
                          {entry.status}
                        </span>
                      </div>
                      <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                        Queued: {new Date(entry.timestamp).toLocaleTimeString()}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </div>

      {/* Doctor Analytics */}
      <div
        style={{
          background: 'white',
          borderRadius: 12,
          padding: 16,
          border: '1px solid #e2e8f0',
        }}
      >
        <h3 style={{ margin: '0 0 16px', fontSize: '1.1rem' }}>📊 Today's Performance</h3>
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
              Patients Seen
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#2563eb' }}>18</div>
            <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: 4 }}>
              ↑ 5% from yesterday
            </div>
          </div>
          <div
            style={{
              background: '#fef2f2',
              padding: 14,
              borderRadius: 8,
              borderLeft: '4px solid #dc2626',
            }}
          >
            <div style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: 8 }}>
              Pending Tests
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#dc2626' }}>12</div>
            <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: 4 }}>
              Awaiting results
            </div>
          </div>
          <div
            style={{
              background: '#f0fdf4',
              padding: 14,
              borderRadius: 8,
              borderLeft: '4px solid #10b981',
            }}
          >
            <div style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: 8 }}>
              Prescriptions Issued
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#10b981' }}>24</div>
            <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: 4 }}>
              ↑ 8% from yesterday
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
              Avg Consultation
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#8b5cf6' }}>12m</div>
            <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: 4 }}>
              ↓ 15% from yesterday
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
