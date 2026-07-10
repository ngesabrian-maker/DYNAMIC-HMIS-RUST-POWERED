import React, { useEffect, useState } from 'react';
import { fetchInventory } from '../services/apiService';
import type { InventoryData } from '../services/apiService';
import type { UserSession } from '../types/user';

type ProcurementDashboardProps = {
  session: UserSession | null;
};

export function ProcurementDashboard({ session }: ProcurementDashboardProps) {
  const [inventory, setInventory] = useState<InventoryData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadInventory = async () => {
      setLoading(true);
      const data = await fetchInventory(session);
      setInventory(data);
      setLoading(false);
    };

    loadInventory();
    const interval = setInterval(loadInventory, 20000);
    return () => clearInterval(interval);
  }, [session]);

  return (
    <div>
      {/* Procurement Status */}
      <div
        style={{
          background: 'white',
          borderRadius: 12,
          padding: 16,
          border: '1px solid #e2e8f0',
          marginBottom: 16,
        }}
      >
        <h3 style={{ margin: '0 0 16px', fontSize: '1.1rem' }}>📦 Procurement Status</h3>

        {loading ? (
          <div style={{ color: '#94a3b8' }}>Loading procurement data...</div>
        ) : !inventory ? (
          <div style={{ color: '#94a3b8' }}>No inventory data</div>
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
                  {inventory.lowStockCount}
                </div>
                <div style={{ fontSize: '0.85rem', color: '#92400e', marginTop: 4 }}>
                  Items Low on Stock
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
                  12
                </div>
                <div style={{ fontSize: '0.85rem', color: '#1e3a8a', marginTop: 4 }}>
                  Purchase Orders
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
                  8
                </div>
                <div style={{ fontSize: '0.85rem', color: '#166534', marginTop: 4 }}>
                  Pending Delivery
                </div>
              </div>
            </div>

            {/* Low Stock Items */}
            <div style={{ maxHeight: 350, overflow: 'auto' }}>
              <h4 style={{ margin: '0 0 12px', fontSize: '0.95rem' }}>Low Stock Items</h4>
              {inventory.lowStockItems.length === 0 ? (
                <div style={{ color: '#94a3b8', textAlign: 'center', padding: 20 }}>
                  All items well stocked
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {inventory.lowStockItems.map((item) => (
                    <div
                      key={item.id}
                      style={{
                        padding: 12,
                        background: '#f8fafc',
                        borderRadius: 8,
                        borderLeft: `4px solid ${
                          item.quantity === 0 ? '#dc2626' : '#f59e0b'
                        }`,
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
                          <div style={{ fontWeight: 600, marginBottom: 2 }}>
                            {item.name}
                          </div>
                          <div style={{ fontSize: '0.85rem', color: '#64748b' }}>
                            Stock: {item.quantity} {item.unit}
                          </div>
                        </div>
                        <span
                          style={{
                            background: item.quantity === 0 ? '#dc2626' : '#f59e0b',
                            color: 'white',
                            padding: '4px 8px',
                            borderRadius: 4,
                            fontSize: '0.7rem',
                            fontWeight: 600,
                          }}
                        >
                          {item.quantity === 0 ? 'Out of Stock' : 'Low'}
                        </span>
                      </div>
                      <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                        Reorder Level: {Math.ceil(item.quantity * 2)}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </div>

      {/* Procurement Metrics */}
      <div
        style={{
          background: 'white',
          borderRadius: 12,
          padding: 16,
          border: '1px solid #e2e8f0',
        }}
      >
        <h3 style={{ margin: '0 0 16px', fontSize: '1.1rem' }}>📊 Supply Chain Metrics</h3>
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
              Total Procurement Budget
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#2563eb' }}>$42.5K</div>
            <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: 4 }}>
              YTD utilization
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
              Avg Delivery Time
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#ea8c2e' }}>3.2 days</div>
            <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: 4 }}>
              From order
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
              Supplier Performance
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#10b981' }}>94%</div>
            <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: 4 }}>
              On-time delivery
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
              Inventory Value
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#8b5cf6' }}>$156K</div>
            <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: 4 }}>
              Current holdings
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
