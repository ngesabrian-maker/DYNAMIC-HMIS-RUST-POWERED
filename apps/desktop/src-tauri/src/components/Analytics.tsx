import React, { useEffect, useState } from 'react';
import type { AnalyticsData } from '../services/apiService';
import { fetchAnalytics } from '../services/apiService';
import type { UserSession } from '../types/user';

type AnalyticsProps = {
  session: UserSession | null;
};

export function Analytics({ session }: AnalyticsProps) {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAnalytics = async () => {
      setLoading(true);
      const data = await fetchAnalytics(session);
      setAnalyticsData(data);
      setLoading(false);
    };

    loadAnalytics();
    const interval = setInterval(loadAnalytics, 120000); // Refresh every 2 minutes

    return () => clearInterval(interval);
  }, [session]);

  return (
    <div
      style={{
        background: 'white',
        borderRadius: 12,
        padding: 16,
        border: '1px solid #e2e8f0',
      }}
    >
      <h3 style={{ margin: '0 0 16px', fontSize: '1rem' }}>📊 Analytics</h3>

      {loading ? (
        <div style={{ color: '#94a3b8', fontSize: '0.9rem' }}>Loading...</div>
      ) : analyticsData.length === 0 ? (
        <div style={{ color: '#94a3b8', fontSize: '0.9rem' }}>No analytics data available</div>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
            gap: 12,
          }}
        >
          {analyticsData.map((item, index) => (
            <div
              key={index}
              style={{
                background: '#f8fafc',
                padding: 14,
                borderRadius: 8,
                border: '1px solid #e2e8f0',
              }}
            >
              <div style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: 8 }}>{item.title}</div>
              <div
                style={{
                  fontSize: '1.8rem',
                  fontWeight: 'bold',
                  color: '#0f172a',
                  marginBottom: 6,
                }}
              >
                {item.value}
                {item.unit && <span style={{ fontSize: '0.9rem', color: '#94a3b8' }}> {item.unit}</span>}
              </div>
              {item.change !== undefined && (
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 4,
                    fontSize: '0.8rem',
                    color: item.trend === 'up' ? '#16a34a' : item.trend === 'down' ? '#dc2626' : '#94a3b8',
                  }}
                >
                  <span>
                    {item.trend === 'up' ? '📈' : item.trend === 'down' ? '📉' : '➡️'} {Math.abs(item.change)}%
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
