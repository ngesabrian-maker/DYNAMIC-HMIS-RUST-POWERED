import React, { useEffect, useState } from 'react';
import { fetchPharmacyQueue } from '../services/hmisService';
import type { PharmacyQueue } from '../services/hmisService';
import type { UserSession } from '../types/user';

type PharmacyQueueViewerProps = {
  session: UserSession | null;
};

export function PharmacyQueueViewer({ session }: PharmacyQueueViewerProps) {
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
    const interval = setInterval(loadPharmacyQueue, 20000); // Refresh every 20s

    return () => clearInterval(interval);
  }, [session]);

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      pending: '#f59e0b',
      preparing: '#3b82f6',
      ready: '#10b981',
      dispensed: '#8b5cf6',
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
      <h3 style={{ margin: '0 0 16px', fontSize: '1rem' }}>💊 Pharmacy Queue</h3>

      {loading ? (
        <div style={{ color: '#94a3b8', fontSize: '0.9rem' }}>Loading pharmacy queue...</div>
      ) : !pharmacyQueue ? (
        <div style={{ color: '#94a3b8', fontSize: '0.9rem' }}>Pharmacy queue unavailable</div>
      ) : (
        <>
          {/* Summary cards */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
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
                {pharmacyQueue.totalPending}
              </div>
              <div style={{ fontSize: '0.75rem', color: '#92400e' }}>Pending</div>
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
                {pharmacyQueue.totalReady}
              </div>
              <div style={{ fontSize: '0.75rem', color: '#166534' }}>Ready</div>
            </div>
          </div>

          {/* Orders list */}
          <div style={{ maxHeight: 350, overflow: 'auto' }}>
            {pharmacyQueue.orders.length === 0 ? (
              <div style={{ color: '#94a3b8', fontSize: '0.9rem', textAlign: 'center', padding: 20 }}>
                No orders in queue
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {pharmacyQueue.orders.map((order) => (
                  <div
                    key={order.id}
                    style={{
                      padding: 12,
                      background: '#f8fafc',
                      borderRadius: 8,
                      borderLeft: `4px solid ${getStatusColor(order.status)}`,
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
                        <div style={{ fontWeight: 600 }}>{order.patientName}</div>
                        <div style={{ color: '#64748b', fontSize: '0.8rem' }}>
                          Prescription: {order.prescriptionId}
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
                      <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginBottom: 4 }}>
                        Medications:
                      </div>
                      {order.medications.map((med, idx) => (
                        <div key={idx} style={{ fontSize: '0.8rem', color: '#475569', marginBottom: 2 }}>
                          • {med.name} - {med.quantity} {med.unit}
                        </div>
                      ))}
                    </div>

                    <div style={{ color: '#94a3b8', fontSize: '0.75rem', marginTop: 6 }}>
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
  );
}
