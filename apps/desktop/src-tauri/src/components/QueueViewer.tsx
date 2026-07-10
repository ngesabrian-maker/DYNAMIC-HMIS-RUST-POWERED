import React, { useEffect, useState } from 'react';
import { fetchAllQueues, fetchDepartmentQueue } from '../services/hmisService';
import type { DepartmentQueue, QueueEntry } from '../services/hmisService';
import type { UserSession } from '../types/user';

type QueueViewerProps = {
  session: UserSession | null;
};

export function QueueViewer({ session }: QueueViewerProps) {
  const [queues, setQueues] = useState<DepartmentQueue[]>([]);
  const [selectedDept, setSelectedDept] = useState<string | null>(null);
  const [selectedQueue, setSelectedQueue] = useState<DepartmentQueue | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadQueues = async () => {
      setLoading(true);
      const data = await fetchAllQueues(session);
      setQueues(data);
      setLoading(false);
    };

    loadQueues();
    const interval = setInterval(loadQueues, 15000); // Refresh every 15s

    return () => clearInterval(interval);
  }, [session]);

  const handleDeptClick = async (dept: string) => {
    setSelectedDept(dept);
    const queue = await fetchDepartmentQueue(dept, session);
    setSelectedQueue(queue);
  };

  const getPriorityColor = (priority: string) => {
    const colors: Record<string, string> = {
      vip: '#f59e0b',
      urgent: '#dc2626',
      normal: '#3b82f6',
    };
    return colors[priority] || '#3b82f6';
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      waiting: '#94a3b8',
      'in-service': '#2563eb',
      completed: '#10b981',
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
      <h3 style={{ margin: '0 0 16px', fontSize: '1rem' }}>🚶 All Queues</h3>

      {loading ? (
        <div style={{ color: '#94a3b8', fontSize: '0.9rem' }}>Loading queues...</div>
      ) : queues.length === 0 ? (
        <div style={{ color: '#94a3b8', fontSize: '0.9rem' }}>No queues available</div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 8 }}>
          {queues.map((q) => (
            <button
              key={q.department}
              onClick={() => handleDeptClick(q.department)}
              style={{
                padding: 12,
                background: selectedDept === q.department ? '#dbeafe' : '#f8fafc',
                border: selectedDept === q.department ? '2px solid #2563eb' : '1px solid #e2e8f0',
                borderRadius: 8,
                cursor: 'pointer',
                textAlign: 'center',
                transition: 'all 0.2s',
              }}
            >
              <div style={{ fontWeight: 600, fontSize: '0.9rem', marginBottom: 4 }}>{q.department}</div>
              <div style={{ fontSize: '1.4rem', fontWeight: 'bold', color: '#2563eb', marginBottom: 4 }}>
                {q.totalInQueue}
              </div>
              <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
                Wait: {q.averageWaitTime}m
              </div>
            </button>
          ))}
        </div>
      )}

      {selectedQueue && (
        <div style={{ marginTop: 20, paddingTop: 20, borderTop: '1px solid #e2e8f0' }}>
          <h4 style={{ margin: '0 0 12px', fontSize: '0.95rem' }}>
            {selectedDept} Queue ({selectedQueue.entries.length})
          </h4>
          <div style={{ maxHeight: 300, overflow: 'auto' }}>
            {selectedQueue.entries.length === 0 ? (
              <div style={{ color: '#94a3b8', fontSize: '0.9rem' }}>No entries in queue</div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {selectedQueue.entries.map((entry, idx) => (
                  <div
                    key={entry.id}
                    style={{
                      padding: 10,
                      background: '#f8fafc',
                      borderRadius: 6,
                      borderLeft: `4px solid ${getPriorityColor(entry.priority)}`,
                      fontSize: '0.85rem',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'start',
                        marginBottom: 4,
                      }}
                    >
                      <div style={{ fontWeight: 600 }}>
                        #{idx + 1} - {entry.patientName}
                      </div>
                      <span
                        style={{
                          background: getStatusColor(entry.status),
                          color: 'white',
                          padding: '2px 6px',
                          borderRadius: 3,
                          fontSize: '0.7rem',
                        }}
                      >
                        {entry.status}
                      </span>
                    </div>
                    <div style={{ color: '#64748b' }}>ID: {entry.patientId}</div>
                    <div style={{ color: '#94a3b8', fontSize: '0.75rem' }}>
                      {new Date(entry.timestamp).toLocaleTimeString()}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
