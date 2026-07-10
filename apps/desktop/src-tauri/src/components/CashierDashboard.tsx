import React, { useEffect, useState } from 'react';
import { fetchDepartmentQueue } from '../services/hmisService';
import type { DepartmentQueue } from '../services/hmisService';
import type { UserSession } from '../types/user';

type CashierDashboardProps = {
  session: UserSession | null;
};

export function CashierDashboard({ session }: CashierDashboardProps) {
  const [queue, setQueue] = useState<DepartmentQueue | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadQueue = async () => {
      setLoading(true);
      const data = await fetchDepartmentQueue('Cashier', session);
      setQueue(data);
      setLoading(false);
    };

    loadQueue();
    const interval = setInterval(loadQueue, 15000);
    return () => clearInterval(interval);
  }, [session]);

  const getStatusColor = (status: string) => {
    return {
      pending: '#f59e0b',
      processing: '#3b82f6',
      completed: '#10b981',
      failed: '#dc2626',
    }[status] || '#94a3b8';
  };

  return (
    <div>
      {/* Transaction Queue */}
      <div
        style={{
          background: 'white',
          borderRadius: 12,
          padding: 16,
          border: '1px solid #e2e8f0',
          marginBottom: 16,
        }}
      >
        <h3 style={{ margin: '0 0 16px', fontSize: '1.1rem' }}>💳 Transaction Processing</h3>

        {loading ? (
          <div style={{ color: '#94a3b8' }}>Loading transactions...</div>
        ) : !queue ? (
          <div style={{ color: '#94a3b8' }}>No transaction data</div>
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
                  Pending Payments
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
                  {Math.floor(queue.entries.length * 0.4)}
                </div>
                <div style={{ fontSize: '0.85rem', color: '#1e3a8a', marginTop: 4 }}>
                  Processing Now
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
                  $18.5K
                </div>
                <div style={{ fontSize: '0.85rem', color: '#166534', marginTop: 4 }}>
                  Today's Revenue
                </div>
              </div>
            </div>

            {/* Payment Queue */}
            <div style={{ maxHeight: 400, overflow: 'auto' }}>
              <h4 style={{ margin: '0 0 12px', fontSize: '0.95rem' }}>Payment Queue</h4>
              {queue.entries.length === 0 ? (
                <div style={{ color: '#94a3b8', textAlign: 'center', padding: 20 }}>
                  No pending payments
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {queue.entries.map((entry) => (
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
                            {entry.patientName}
                          </div>
                          <div style={{ fontSize: '0.85rem', color: '#64748b' }}>
                            Ref: {entry.id.slice(0, 8).toUpperCase()}
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
                          {entry.status}
                        </span>
                      </div>
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          fontSize: '0.85rem',
                          color: '#475569',
                          fontWeight: 600,
                          marginBottom: 6,
                        }}
                      >
                        <span>Amount: $450.00</span>
                        <span>Invoice #INV-2024-001</span>
                      </div>
                      <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                        {new Date(entry.admittedAt).toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </div>

      {/* Cashier Analytics */}
      <div
        style={{
          background: 'white',
          borderRadius: 12,
          padding: 16,
          border: '1px solid #e2e8f0',
        }}
      >
        <h3 style={{ margin: '0 0 16px', fontSize: '1.1rem' }}>📊 Financial Dashboard</h3>
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
              Transactions Today
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#2563eb' }}>47</div>
            <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: 4 }}>
              ↑ 15% from average
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
              Avg Transaction
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#10b981' }}>$395</div>
            <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: 4 }}>
              Per payment
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
              Outstanding Amounts
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#ea8c2e' }}>$8.2K</div>
            <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: 4 }}>
              Due for collection
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
              Success Rate
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#8b5cf6' }}>98.9%</div>
            <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: 4 }}>
              Transaction approval
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
