import React, { useEffect, useState } from 'react';
import type { ItemRequisition } from '../services/apiService';
import { fetchRequisitions, submitRequisition } from '../services/apiService';
import type { UserSession } from '../types/user';

type ItemRequisitionProps = {
  session: UserSession | null;
};

export function ItemRequisition({ session }: ItemRequisitionProps) {
  const [requisitions, setRequisitions] = useState<ItemRequisition[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [itemId, setItemId] = useState('');
  const [quantity, setQuantity] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const loadRequisitions = async () => {
      setLoading(true);
      const data = await fetchRequisitions(session);
      setRequisitions(data);
      setLoading(false);
    };

    loadRequisitions();
    const interval = setInterval(loadRequisitions, 45000); // Refresh every 45s

    return () => clearInterval(interval);
  }, [session]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!itemId || !quantity) return;

    setSubmitting(true);
    const success = await submitRequisition(itemId, parseInt(quantity), session);
    if (success) {
      setItemId('');
      setQuantity('');
      setShowForm(false);
      // Reload requisitions
      const data = await fetchRequisitions(session);
      setRequisitions(data);
    }
    setSubmitting(false);
  };

  const statusColors: Record<string, string> = {
    pending: '#fbbf24',
    approved: '#60a5fa',
    rejected: '#f87171',
    fulfilled: '#34d399',
  };

  const pendingCount = requisitions.filter((r) => r.status === 'pending').length;
  const fulfilledCount = requisitions.filter((r) => r.status === 'fulfilled').length;

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
        <h3 style={{ margin: 0, fontSize: '1rem' }}>📋 Item Requisitions</h3>
        <button
          onClick={() => setShowForm(!showForm)}
          style={{
            background: '#2563eb',
            color: 'white',
            border: 'none',
            borderRadius: 6,
            padding: '6px 12px',
            fontSize: '0.8rem',
            cursor: 'pointer',
          }}
        >
          + New
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={handleSubmit}
          style={{
            background: '#f8fafc',
            padding: 12,
            borderRadius: 8,
            marginBottom: 12,
            display: 'grid',
            gridTemplateColumns: '1fr 1fr auto',
            gap: 8,
          }}
        >
          <input
            type="text"
            placeholder="Item ID"
            value={itemId}
            onChange={(e) => setItemId(e.target.value)}
            style={{
              padding: 8,
              border: '1px solid #cbd5e1',
              borderRadius: 4,
              fontSize: '0.9rem',
            }}
          />
          <input
            type="number"
            placeholder="Quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            style={{
              padding: 8,
              border: '1px solid #cbd5e1',
              borderRadius: 4,
              fontSize: '0.9rem',
            }}
          />
          <button
            type="submit"
            disabled={submitting}
            style={{
              background: '#10b981',
              color: 'white',
              border: 'none',
              borderRadius: 4,
              padding: '8px 12px',
              cursor: submitting ? 'not-allowed' : 'pointer',
              opacity: submitting ? 0.6 : 1,
              fontSize: '0.9rem',
            }}
          >
            {submitting ? 'Submitting...' : 'Submit'}
          </button>
        </form>
      )}

      {/* Summary cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10, marginBottom: 12 }}>
        <div style={{ background: '#fef3c7', padding: 10, borderRadius: 8, textAlign: 'center' }}>
          <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#b45309' }}>{pendingCount}</div>
          <div style={{ fontSize: '0.75rem', color: '#92400e' }}>Pending</div>
        </div>
        <div style={{ background: '#dcfce7', padding: 10, borderRadius: 8, textAlign: 'center' }}>
          <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#15803d' }}>{fulfilledCount}</div>
          <div style={{ fontSize: '0.75rem', color: '#166534' }}>Fulfilled</div>
        </div>
      </div>

      {loading ? (
        <div style={{ color: '#94a3b8', fontSize: '0.9rem' }}>Loading...</div>
      ) : requisitions.length === 0 ? (
        <div style={{ color: '#94a3b8', fontSize: '0.9rem' }}>No requisitions</div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, maxHeight: 200, overflow: 'auto' }}>
          {requisitions.slice(0, 5).map((req) => (
            <div
              key={req.id}
              style={{
                padding: 10,
                background: '#f8fafc',
                borderRadius: 6,
                borderLeft: `4px solid ${statusColors[req.status] || '#cbd5e1'}`,
                fontSize: '0.85rem',
              }}
            >
              <div style={{ fontWeight: 600, marginBottom: 2 }}>{req.itemName}</div>
              <div style={{ color: '#64748b', marginBottom: 4 }}>
                Qty: {req.quantity} | Requested by: {req.requestedBy}
              </div>
              <div
                style={{
                  display: 'inline-block',
                  background: statusColors[req.status] || '#cbd5e1',
                  color: 'white',
                  padding: '2px 6px',
                  borderRadius: 3,
                  fontSize: '0.7rem',
                  fontWeight: 600,
                }}
              >
                {req.status.charAt(0).toUpperCase() + req.status.slice(1)}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
