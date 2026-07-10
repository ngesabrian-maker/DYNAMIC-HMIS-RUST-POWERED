import React, { useEffect, useState } from 'react';
import type { InventoryItem } from '../services/apiService';
import { fetchInventory } from '../services/apiService';
import type { UserSession } from '../types/user';

type InventoryCountProps = {
  session: UserSession | null;
};

export function InventoryCount({ session }: InventoryCountProps) {
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadInventory = async () => {
      setLoading(true);
      const data = await fetchInventory(session);
      setInventory(data);
      setLoading(false);
    };

    loadInventory();
    const interval = setInterval(loadInventory, 60000); // Refresh every 60s

    return () => clearInterval(interval);
  }, [session]);

  const lowStockItems = inventory.filter((item) => item.status === 'low' || item.status === 'out-of-stock');
  const totalItems = inventory.length;

  return (
    <div
      style={{
        background: 'white',
        borderRadius: 12,
        padding: 16,
        border: '1px solid #e2e8f0',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <h3 style={{ margin: 0, fontSize: '1rem' }}>📦 Inventory</h3>
        <span style={{ fontSize: '0.85rem', color: '#64748b' }}>
          {lowStockItems.length} low stock
        </span>
      </div>

      {loading ? (
        <div style={{ color: '#94a3b8', fontSize: '0.9rem' }}>Loading...</div>
      ) : totalItems === 0 ? (
        <div style={{ color: '#94a3b8', fontSize: '0.9rem' }}>No inventory items</div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 10 }}>
          <div style={{ background: '#f0f9ff', padding: 12, borderRadius: 8, textAlign: 'center' }}>
            <div style={{ fontSize: '1.4rem', fontWeight: 'bold', color: '#2563eb' }}>{totalItems}</div>
            <div style={{ fontSize: '0.75rem', color: '#475569' }}>Total Items</div>
          </div>
          <div
            style={{
              background: lowStockItems.length > 0 ? '#fef2f2' : '#f0fdf4',
              padding: 12,
              borderRadius: 8,
              textAlign: 'center',
            }}
          >
            <div
              style={{
                fontSize: '1.4rem',
                fontWeight: 'bold',
                color: lowStockItems.length > 0 ? '#dc2626' : '#16a34a',
              }}
            >
              {lowStockItems.length}
            </div>
            <div style={{ fontSize: '0.75rem', color: '#475569' }}>Low/Out Stock</div>
          </div>
        </div>
      )}

      {lowStockItems.length > 0 && (
        <div style={{ marginTop: 12, paddingTop: 12, borderTop: '1px solid #e2e8f0' }}>
          <div style={{ fontSize: '0.85rem', fontWeight: 600, marginBottom: 8, color: '#0f172a' }}>
            Critical Items:
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {lowStockItems.slice(0, 3).map((item) => (
              <div
                key={item.id}
                style={{
                  fontSize: '0.8rem',
                  padding: 6,
                  background: '#fef2f2',
                  borderRadius: 6,
                  borderLeft: '3px solid #dc2626',
                  paddingLeft: 10,
                }}
              >
                <div style={{ fontWeight: 600 }}>{item.name}</div>
                <div style={{ color: '#64748b' }}>
                  {item.quantity} {item.unit} (Reorder: {item.reorderLevel})
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
