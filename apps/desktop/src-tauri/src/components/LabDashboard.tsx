import React, { useEffect, useState } from 'react';
import { fetchLabQueue } from '../services/hmisService';
import type { LabQueue } from '../services/hmisService';
import type { UserSession } from '../types/user';

type LabDashboardProps = {
  session: UserSession | null;
};

export function LabDashboard({ session }: LabDashboardProps) {
  const [labQueue, setLabQueue] = useState<LabQueue | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadLabQueue = async () => {
      setLoading(true);
      const data = await fetchLabQueue(session);
      setLabQueue(data);
      setLoading(false);
    };

    loadLabQueue();
    const interval = setInterval(loadLabQueue, 15000);
    return () => clearInterval(interval);
  }, [session]);

  const getStatusColor = (status: string) => {
    return {
      pending: '#f59e0b',
      'in-progress': '#3b82f6',
      completed: '#10b981',
      reviewed: '#8b5cf6',
    }[status] || '#94a3b8';
  };

  return (
    <div>
      {/* Lab Queue Status */}
      <div
        style={{
          background: 'white',
          borderRadius: 12,
          padding: 16,
          border: '1px solid #e2e8f0',
          marginBottom: 16,
        }}
      >
        <h3 style={{ margin: '0 0 16px', fontSize: '1.1rem' }}>🧪 Lab Queue Status</h3>

        {loading ? (
          <div style={{ color: '#94a3b8' }}>Loading lab data...</div>
        ) : !labQueue ? (
          <div style={{ color: '#94a3b8' }}>No lab queue data</div>
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
                  {labQueue.totalPending}
                </div>
                <div style={{ fontSize: '0.85rem', color: '#92400e', marginTop: 4 }}>
                  Pending Tests
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
                  {labQueue.totalInProgress}
                </div>
                <div style={{ fontSize: '0.85rem', color: '#1e3a8a', marginTop: 4 }}>
                  In Progress
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
                  {labQueue.totalCompleted}
                </div>
                <div style={{ fontSize: '0.85rem', color: '#166534', marginTop: 4 }}>
                  Completed
                </div>
              </div>
            </div>

            {/* Test List */}
            <div style={{ maxHeight: 400, overflow: 'auto' }}>
              <h4 style={{ margin: '0 0 12px', fontSize: '0.95rem' }}>Tests in Queue</h4>
              {labQueue.tests.length === 0 ? (
                <div style={{ color: '#94a3b8', textAlign: 'center', padding: 20 }}>
                  No tests in queue
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {labQueue.tests.map((test) => (
                    <div
                      key={test.id}
                      style={{
                        padding: 12,
                        background: '#f8fafc',
                        borderRadius: 8,
                        borderLeft: `4px solid ${getStatusColor(test.status)}`,
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
                          <div style={{ fontWeight: 600, marginBottom: 2 }}>{test.patientName}</div>
                          <div style={{ fontSize: '0.85rem', color: '#64748b' }}>
                            {test.testType}
                          </div>
                        </div>
                        <span
                          style={{
                            background: getStatusColor(test.status),
                            color: 'white',
                            padding: '4px 8px',
                            borderRadius: 4,
                            fontSize: '0.7rem',
                            fontWeight: 600,
                          }}
                        >
                          {test.status}
                        </span>
                      </div>
                      <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                        Ordered by: {test.orderedBy} | {new Date(test.orderedAt).toLocaleDateString()}
                      </div>
                      {test.result && (
                        <div
                          style={{
                            marginTop: 8,
                            padding: 8,
                            background: '#f0fdf4',
                            borderRadius: 4,
                            fontSize: '0.8rem',
                            color: '#166534',
                          }}
                        >
                          Result: {test.result}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </div>

      {/* Lab Analytics */}
      <div
        style={{
          background: 'white',
          borderRadius: 12,
          padding: 16,
          border: '1px solid #e2e8f0',
        }}
      >
        <h3 style={{ margin: '0 0 16px', fontSize: '1.1rem' }}>📊 Lab Performance</h3>
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
              Tests Completed Today
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#2563eb' }}>42</div>
            <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: 4 }}>
              ↑ 12% from yesterday
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
              Avg Processing Time
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#8b5cf6' }}>45m</div>
            <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: 4 }}>
              ↓ 5% from yesterday
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
              Critical Results
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#dc2626' }}>2</div>
            <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: 4 }}>
              Flagged for review
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
              Accuracy Rate
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#10b981' }}>99.8%</div>
            <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: 4 }}>
              Excellent standards
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
