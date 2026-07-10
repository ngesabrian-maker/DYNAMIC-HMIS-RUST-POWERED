import React, { useEffect, useState } from 'react';
import { fetchAnalytics } from '../services/apiService';
import type { AnalyticsData } from '../services/apiService';
import type { UserSession } from '../types/user';

type AccountantDashboardProps = {
  session: UserSession | null;
};

export function AccountantDashboard({ session }: AccountantDashboardProps) {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAnalytics = async () => {
      setLoading(true);
      const data = await fetchAnalytics(session);
      setAnalytics(data);
      setLoading(false);
    };

    loadAnalytics();
    const interval = setInterval(loadAnalytics, 30000);
    return () => clearInterval(interval);
  }, [session]);

  return (
    <div>
      {/* Financial Overview */}
      <div
        style={{
          background: 'white',
          borderRadius: 12,
          padding: 16,
          border: '1px solid #e2e8f0',
          marginBottom: 16,
        }}
      >
        <h3 style={{ margin: '0 0 16px', fontSize: '1.1rem' }}>💰 Financial Overview</h3>

        {loading ? (
          <div style={{ color: '#94a3b8' }}>Loading financial data...</div>
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
                  background: '#dcfce7',
                  padding: 14,
                  borderRadius: 8,
                  textAlign: 'center',
                  borderLeft: '4px solid #10b981',
                }}
              >
                <div style={{ fontSize: '2.2rem', fontWeight: 'bold', color: '#15803d' }}>
                  $47.2K
                </div>
                <div style={{ fontSize: '0.85rem', color: '#166534', marginTop: 4 }}>
                  Today's Revenue
                </div>
              </div>
              <div
                style={{
                  background: '#fef9e7',
                  padding: 14,
                  borderRadius: 8,
                  textAlign: 'center',
                  borderLeft: '4px solid #eab308',
                }}
              >
                <div style={{ fontSize: '2.2rem', fontWeight: 'bold', color: '#ea8c2e' }}>
                  $286.5K
                </div>
                <div style={{ fontSize: '0.85rem', color: '#854d0e', marginTop: 4 }}>
                  Monthly Revenue
                </div>
              </div>
              <div
                style={{
                  background: '#f3f0ff',
                  padding: 14,
                  borderRadius: 8,
                  textAlign: 'center',
                  borderLeft: '4px solid #8b5cf6',
                }}
              >
                <div style={{ fontSize: '2.2rem', fontWeight: 'bold', color: '#6b21a8' }}>
                  $125.3K
                </div>
                <div style={{ fontSize: '0.85rem', color: '#581c87', marginTop: 4 }}>
                  Outstanding Receivables
                </div>
              </div>
            </div>

            {/* Billing Status */}
            <div style={{ marginTop: 12 }}>
              <h4 style={{ margin: '0 0 12px', fontSize: '0.95rem' }}>Billing Summary</h4>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: 10,
                }}
              >
                <div style={{ background: '#f8fafc', padding: 12, borderRadius: 8 }}>
                  <div style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: 6 }}>
                    Invoices Sent
                  </div>
                  <div style={{ fontSize: '1.6rem', fontWeight: 'bold', color: '#1e293b' }}>
                    84
                  </div>
                  <div style={{ fontSize: '0.7rem', color: '#94a3b8', marginTop: 4 }}>
                    This month
                  </div>
                </div>
                <div style={{ background: '#f8fafc', padding: 12, borderRadius: 8 }}>
                  <div style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: 6 }}>
                    Invoices Paid
                  </div>
                  <div style={{ fontSize: '1.6rem', fontWeight: 'bold', color: '#1e293b' }}>
                    72
                  </div>
                  <div style={{ fontSize: '0.7rem', color: '#94a3b8', marginTop: 4 }}>
                    85.7% collection
                  </div>
                </div>
                <div style={{ background: '#f8fafc', padding: 12, borderRadius: 8 }}>
                  <div style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: 6 }}>
                    Avg Days to Pay
                  </div>
                  <div style={{ fontSize: '1.6rem', fontWeight: 'bold', color: '#1e293b' }}>
                    8.5
                  </div>
                  <div style={{ fontSize: '0.7rem', color: '#94a3b8', marginTop: 4 }}>
                    Collection efficiency
                  </div>
                </div>
                <div style={{ background: '#f8fafc', padding: 12, borderRadius: 8 }}>
                  <div style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: 6 }}>
                    Bad Debts
                  </div>
                  <div style={{ fontSize: '1.6rem', fontWeight: 'bold', color: '#dc2626' }}>
                    $2.3K
                  </div>
                  <div style={{ fontSize: '0.7rem', color: '#94a3b8', marginTop: 4 }}>
                    Write-offs pending
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Financial Analytics */}
      <div
        style={{
          background: 'white',
          borderRadius: 12,
          padding: 16,
          border: '1px solid #e2e8f0',
        }}
      >
        <h3 style={{ margin: '0 0 16px', fontSize: '1.1rem' }}>📊 Accounting Metrics</h3>
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
              Operating Margin
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#2563eb' }}>28.5%</div>
            <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: 4 }}>
              ↑ 2.1% from last month
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
              YTD Profit
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#10b981' }}>$845K</div>
            <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: 4 }}>
              Accumulated
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
              Expense Rate
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#ea8c2e' }}>71.5%</div>
            <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: 4 }}>
              Of revenue
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
              Cash Position
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#8b5cf6' }}>$325K</div>
            <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: 4 }}>
              Current balance
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
