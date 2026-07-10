import React, { useEffect, useState } from 'react';
import { fetchPharmacyQueue } from '../services/hmisService';
import type { PharmacyQueue } from '../services/hmisService';
import type { UserSession } from '../types/user';

type PharmacyDashboardProps = {
  session: UserSession | null;
};

export function PharmacyDashboard({ session }: PharmacyDashboardProps) {
  const [pharmacyQueue, setPharmacyQueue] = useState<PharmacyQueue | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPharmacyQueue = async () => {
      setLoading(true);
      const data = await fetchPharmacyQueue(session);
      setPharmacyQueue(data);
      setLoading(false);
    };

    loadPharmacyQueue();
    const interval = setInterval(loadPharmacyQueue, 15000);
    return () => clearInterval(interval);
  }, [session]);

  const getStatusColor = (status: string) => {
    return {
      pending: '#f59e0b',
      preparing: '#3b82f6',
      ready: '#10b981',
      dispensed: '#8b5cf6',
    }[status] || '#94a3b8';
  };

  return (
    <div>
      {/* Prescription Queue */}
      <div
        style={{
          background: 'white',
          borderRadius: 12,
          padding: 16,
          border: '1px solid #e2e8f0',
          marginBottom: 16,
        }}
      >
        <h3 style={{ margin: '0 0 16px', fontSize: '1.1rem' }}>💊 Prescription Queue</h3>

        {loading ? (
          <div style={{ color: '#94a3b8' }}>Loading pharmacy data...</div>
        ) : !pharmacyQueue ? (
          <div style={{ color: '#94a3b8' }}>No pharmacy queue data</div>
        ) : (
          <>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
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
                  {pharmacyQueue.totalPending}
                </div>
                <div style={{ fontSize: '0.85rem', color: '#92400e', marginTop: 4 }}>
                  Pending Orders
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
                  {pharmacyQueue.totalReady}
                </div>
                <div style={{ fontSize: '0.85rem', color: '#166534', marginTop: 4 }}>
                  Ready for Pickup
                </div>
              </div>
            </div>

            {/* Orders List */}
            <div style={{ maxHeight: 400, overflow: 'auto' }}>
              <h4 style={{ margin: '0 0 12px', fontSize: '0.95rem' }}>Orders</h4>
              {pharmacyQueue.orders.length === 0 ? (
                <div style={{ color: '#94a3b8', textAlign: 'center', padding: 20 }}>
                  No orders in queue
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {pharmacyQueue.orders.map((order) => (
                    <div
                      key={order.id}
                      style={{
                        padding: 12,
                        background: '#f8fafc',
                        borderRadius: 8,
                        borderLeft: `4px solid ${getStatusColor(order.status)}`,
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
                            {order.patientName}
                          </div>
                          <div style={{ fontSize: '0.85rem', color: '#64748b' }}>
                            Rx: {order.prescriptionId}
                          </div>
                        </div>
                        <span
                          style={{
                            background: getStatusColor(order.status),
                            color: 'white',
                            padding: '4px 8px',
                            borderRadius: 4,
                            fontSize: '0.7rem',
                            fontWeight: 600,
                          }}
                        >
                          {order.status}
                        </span>
                      </div>

                      {/* Medications */}
                      <div style={{ marginTop: 8, paddingTop: 8, borderTop: '1px solid #e2e8f0' }}>
                        <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginBottom: 6 }}>
                          Medications:
                        </div>
                        {order.medications.map((med, idx) => (
                          <div key={idx} style={{ fontSize: '0.8rem', color: '#475569', marginBottom: 3 }}>
                            • {med.name} - {med.quantity} {med.unit}
                          </div>
                        ))}
                      </div>

                      <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: 6 }}>
                        {new Date(order.orderedAt).toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </div>

      {/* Pharmacy Analytics */}
      <div
        style={{
          background: 'white',
          borderRadius: 12,
          padding: 16,
          border: '1px solid #e2e8f0',
        }}
      >
        <h3 style={{ margin: '0 0 16px', fontSize: '1.1rem' }}>📊 Pharmacy Performance</h3>
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
              Prescriptions Filled
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#2563eb' }}>42</div>
            <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: 4 }}>
              ↑ 12% from yesterday
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
              Avg Preparation Time
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#ea8c2e' }}>8m</div>
            <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: 4 }}>
              Per order
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
              Daily Revenue
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#10b981' }}>$2,450</div>
            <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: 4 }}>
              ↑ 15% from yesterday
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
              Patient Satisfaction
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#8b5cf6' }}>4.7/5</div>
            <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: 4 }}>
              Based on reviews
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
