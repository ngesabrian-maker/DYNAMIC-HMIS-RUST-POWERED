import React, { useEffect, useState } from 'react';
import { fetchAnalytics } from '../services/apiService';
import { fetchDepartmentQueue } from '../services/hmisService';
import type { AnalyticsData } from '../services/apiService';
import type { DepartmentQueue } from '../services/hmisService';
import type { UserSession } from '../types/user';

type AdminDashboardProps = {
  session: UserSession | null;
};

export function AdminDashboard({ session }: AdminDashboardProps) {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [overviewQueue, setOverviewQueue] = useState<DepartmentQueue | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const analyticsData = await fetchAnalytics(session);
      const queueData = await fetchDepartmentQueue('Admin', session);
      setAnalytics(analyticsData);
      setOverviewQueue(queueData);
      setLoading(false);
    };

    loadData();
    const interval = setInterval(loadData, 30000);
    return () => clearInterval(interval);
  }, [session]);

  return (
    <div>
      {/* System Status */}
      <div
        style={{
          background: 'white',
          borderRadius: 12,
          padding: 16,
          border: '1px solid #e2e8f0',
          marginBottom: 16,
        }}
      >
        <h3 style={{ margin: '0 0 16px', fontSize: '1.1rem' }}>🖥️ System Status</h3>

        {loading ? (
          <div style={{ color: '#94a3b8' }}>Loading system data...</div>
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
                  99.9%
                </div>
                <div style={{ fontSize: '0.85rem', color: '#166534', marginTop: 4 }}>
                  System Uptime
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
                  156
                </div>
                <div style={{ fontSize: '0.85rem', color: '#1e3a8a', marginTop: 4 }}>
                  Active Users
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
                  8
                </div>
                <div style={{ fontSize: '0.85rem', color: '#581c87', marginTop: 4 }}>
                  Departments
                </div>
              </div>
            </div>

            {/* System Metrics */}
            <div style={{ marginTop: 12 }}>
              <h4 style={{ margin: '0 0 12px', fontSize: '0.95rem' }}>System Health</h4>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: 10,
                }}
              >
                <div style={{ background: '#f8fafc', padding: 12, borderRadius: 8 }}>
                  <div style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: 6 }}>
                    Database Status
                  </div>
                  <div
                    style={{
                      fontSize: '1.1rem',
                      fontWeight: 600,
                      color: '#10b981',
                      marginBottom: 4,
                    }}
                  >
                    ● Online
                  </div>
                  <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>Response: 2.3ms</div>
                </div>
                <div style={{ background: '#f8fafc', padding: 12, borderRadius: 8 }}>
                  <div style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: 6 }}>
                    Server Load
                  </div>
                  <div
                    style={{
                      fontSize: '1.1rem',
                      fontWeight: 600,
                      color: '#3b82f6',
                      marginBottom: 4,
                    }}
                  >
                    42% CPU
                  </div>
                  <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>Memory: 64/256GB</div>
                </div>
                <div style={{ background: '#f8fafc', padding: 12, borderRadius: 8 }}>
                  <div style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: 6 }}>
                    Last Backup
                  </div>
                  <div
                    style={{
                      fontSize: '1.1rem',
                      fontWeight: 600,
                      color: '#10b981',
                      marginBottom: 4,
                    }}
                  >
                    2h ago
                  </div>
                  <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>1.2TB backed up</div>
                </div>
                <div style={{ background: '#f8fafc', padding: 12, borderRadius: 8 }}>
                  <div style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: 6 }}>
                    API Requests
                  </div>
                  <div
                    style={{
                      fontSize: '1.1rem',
                      fontWeight: 600,
                      color: '#2563eb',
                      marginBottom: 4,
                    }}
                  >
                    24.5K/min
                  </div>
                  <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>Avg response: 145ms</div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Admin Metrics */}
      <div
        style={{
          background: 'white',
          borderRadius: 12,
          padding: 16,
          border: '1px solid #e2e8f0',
        }}
      >
        <h3 style={{ margin: '0 0 16px', fontSize: '1.1rem' }}>📊 Administration Metrics</h3>
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
              Total Patients
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#2563eb' }}>4,285</div>
            <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: 4 }}>
              In system
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
              Staff Members
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#10b981' }}>156</div>
            <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: 4 }}>
              Active today
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
              Daily Transactions
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#ea8c2e' }}>1,247</div>
            <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: 4 }}>
              Processed
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
              Security Events
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#8b5cf6' }}>12</div>
            <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: 4 }}>
              This week
            </div>
          </div>
        </div>
      </div>

      {/* Alerts & Notifications */}
      <div
        style={{
          background: 'white',
          borderRadius: 12,
          padding: 16,
          border: '1px solid #e2e8f0',
          marginTop: 16,
        }}
      >
        <h3 style={{ margin: '0 0 16px', fontSize: '1.1rem' }}>⚠️ System Alerts</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div
            style={{
              padding: 12,
              background: '#fef3c7',
              borderRadius: 8,
              borderLeft: '4px solid #f59e0b',
            }}
          >
            <div style={{ fontWeight: 600, color: '#92400e', marginBottom: 4 }}>
              Maintenance Scheduled
            </div>
            <div style={{ fontSize: '0.85rem', color: '#92400e' }}>
              Database maintenance window tomorrow 02:00-04:00 AM
            </div>
          </div>
          <div
            style={{
              padding: 12,
              background: '#dbeafe',
              borderRadius: 8,
              borderLeft: '4px solid #3b82f6',
            }}
          >
            <div style={{ fontWeight: 600, color: '#1e40af', marginBottom: 4 }}>
              System Update Available
            </div>
            <div style={{ fontSize: '0.85rem', color: '#1e40af' }}>
              HMIS v2.5.1 with security patches is ready to deploy
            </div>
          </div>
          <div
            style={{
              padding: 12,
              background: '#dcfce7',
              borderRadius: 8,
              borderLeft: '4px solid #10b981',
            }}
          >
            <div style={{ fontWeight: 600, color: '#166534', marginBottom: 4 }}>
              All Systems Operational
            </div>
            <div style={{ fontSize: '0.85rem', color: '#166534' }}>
              All departments and services functioning normally
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
