import React, { useEffect, useState } from 'react';
import { fetchLabQueue } from '../services/hmisService';
import type { LabQueue } from '../services/hmisService';
import type { UserSession } from '../types/user';

type LabQueueViewerProps = {
  session: UserSession | null;
};

export function LabQueueViewer({ session }: LabQueueViewerProps) {
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
    const interval = setInterval(loadLabQueue, 20000); // Refresh every 20s

    return () => clearInterval(interval);
  }, [session]);

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      pending: '#f59e0b',
      'in-progress': '#3b82f6',
      completed: '#10b981',
      reviewed: '#8b5cf6',
    };
    return colors[status] || '#94a3b8';
  };

  return (
    <div
      style={{
        background: 'white',
        borderRadius: 12,
        padding: 16,
        border: '1px solid #e2e8f0',
      }}
    >
      <h3 style={{ margin: '0 0 16px', fontSize: '1rem' }}>🧪 Laboratory Queue</h3>

      {loading ? (
        <div style={{ color: '#94a3b8', fontSize: '0.9rem' }}>Loading lab queue...</div>
      ) : !labQueue ? (
        <div style={{ color: '#94a3b8', fontSize: '0.9rem' }}>Lab queue unavailable</div>
      ) : (
        <>
          {/* Summary cards */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 10,
              marginBottom: 16,
            }}
          >
            <div
              style={{
                background: '#fef3c7',
                padding: 12,
                borderRadius: 8,
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: '1.4rem', fontWeight: 'bold', color: '#b45309' }}>
                {labQueue.totalPending}
              </div>
              <div style={{ fontSize: '0.75rem', color: '#92400e' }}>Pending</div>
            </div>
            <div
              style={{
                background: '#dbeafe',
                padding: 12,
                borderRadius: 8,
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: '1.4rem', fontWeight: 'bold', color: '#1e40af' }}>
                {labQueue.totalInProgress}
              </div>
              <div style={{ fontSize: '0.75rem', color: '#1e3a8a' }}>In Progress</div>
            </div>
            <div
              style={{
                background: '#dcfce7',
                padding: 12,
                borderRadius: 8,
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: '1.4rem', fontWeight: 'bold', color: '#15803d' }}>
                {labQueue.totalCompleted}
              </div>
              <div style={{ fontSize: '0.75rem', color: '#166534' }}>Completed</div>
            </div>
          </div>

          {/* Tests list */}
          <div style={{ maxHeight: 350, overflow: 'auto' }}>
            {labQueue.tests.length === 0 ? (
              <div style={{ color: '#94a3b8', fontSize: '0.9rem', textAlign: 'center', padding: 20 }}>
                No tests in queue
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {labQueue.tests.map((test) => (
                  <div
                    key={test.id}
                    style={{
                      padding: 12,
                      background: '#f8fafc',
                      borderRadius: 8,
                      borderLeft: `4px solid ${getStatusColor(test.status)}`,
                      fontSize: '0.85rem',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'start',
                        marginBottom: 6,
                      }}
                    >
                      <div>
                        <div style={{ fontWeight: 600 }}>{test.patientName}</div>
                        <div style={{ color: '#64748b', fontSize: '0.8rem' }}>{test.testType}</div>
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
                    <div style={{ color: '#94a3b8', fontSize: '0.75rem' }}>
                      Ordered by: {test.orderedBy} | {new Date(test.orderedAt).toLocaleDateString()}
                    </div>
                    {test.result && (
                      <div
                        style={{
                          marginTop: 6,
                          padding: 6,
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
  );
}
