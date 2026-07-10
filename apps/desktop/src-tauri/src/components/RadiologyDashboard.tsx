import React, { useEffect, useState } from 'react';
import { fetchRadiologyQueue } from '../services/hmisService';
import type { RadiologyQueue } from '../services/hmisService';
import type { UserSession } from '../types/user';

type RadiologyDashboardProps = {
  session: UserSession | null;
};

export function RadiologyDashboard({ session }: RadiologyDashboardProps) {
  const [radiologyQueue, setRadiologyQueue] = useState<RadiologyQueue | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadRadiologyQueue = async () => {
      setLoading(true);
      const data = await fetchRadiologyQueue(session);
      setRadiologyQueue(data);
      setLoading(false);
    };

    loadRadiologyQueue();
    const interval = setInterval(loadRadiologyQueue, 15000);
    return () => clearInterval(interval);
  }, [session]);

  const getStatusColor = (status: string) => {
    return {
      scheduled: '#f59e0b',
      'in-progress': '#3b82f6',
      completed: '#10b981',
      reported: '#8b5cf6',
    }[status] || '#94a3b8';
  };

  return (
    <div>
      {/* Radiology Schedule */}
      <div
        style={{
          background: 'white',
          borderRadius: 12,
          padding: 16,
          border: '1px solid #e2e8f0',
          marginBottom: 16,
        }}
      >
        <h3 style={{ margin: '0 0 16px', fontSize: '1.1rem' }}>📋 Imaging Schedule</h3>

        {loading ? (
          <div style={{ color: '#94a3b8' }}>Loading radiology data...</div>
        ) : !radiologyQueue ? (
          <div style={{ color: '#94a3b8' }}>No radiology queue data</div>
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
                  {radiologyQueue.totalScheduled}
                </div>
                <div style={{ fontSize: '0.85rem', color: '#92400e', marginTop: 4 }}>
                  Scheduled
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
                  {radiologyQueue.totalInProgress}
                </div>
                <div style={{ fontSize: '0.85rem', color: '#1e3a8a', marginTop: 4 }}>
                  In Progress
                </div>
              </div>
              <div
                style={{
                  background: '#e9d5ff',
                  padding: 14,
                  borderRadius: 8,
                  textAlign: 'center',
                  borderLeft: '4px solid #a855f7',
                }}
              >
                <div style={{ fontSize: '2.2rem', fontWeight: 'bold', color: '#6b21a8' }}>
                  {radiologyQueue.totalReported}
                </div>
                <div style={{ fontSize: '0.85rem', color: '#581c87', marginTop: 4 }}>
                  Reported
                </div>
              </div>
            </div>

            {/* Imaging List */}
            <div style={{ maxHeight: 400, overflow: 'auto' }}>
              <h4 style={{ margin: '0 0 12px', fontSize: '0.95rem' }}>Imaging Queue</h4>
              {radiologyQueue.imaging.length === 0 ? (
                <div style={{ color: '#94a3b8', textAlign: 'center', padding: 20 }}>
                  No imaging studies in queue
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {radiologyQueue.imaging.map((imaging) => (
                    <div
                      key={imaging.id}
                      style={{
                        padding: 12,
                        background: '#f8fafc',
                        borderRadius: 8,
                        borderLeft: `4px solid ${getStatusColor(imaging.status)}`,
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
                            {imaging.patientName}
                          </div>
                          <div style={{ fontSize: '0.85rem', color: '#64748b' }}>
                            {imaging.imagingType}
                          </div>
                        </div>
                        <span
                          style={{
                            background: getStatusColor(imaging.status),
                            color: 'white',
                            padding: '4px 8px',
                            borderRadius: 4,
                            fontSize: '0.7rem',
                            fontWeight: 600,
                          }}
                        >
                          {imaging.status}
                        </span>
                      </div>
                      <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                        Ordered by: {imaging.orderedBy} | {new Date(imaging.orderedAt).toLocaleDateString()}
                      </div>
                      {imaging.report && (
                        <div
                          style={{
                            marginTop: 8,
                            padding: 8,
                            background: '#f0fdf4',
                            borderRadius: 4,
                            fontSize: '0.8rem',
                            color: '#166534',
                          }}
                        >
                          Report: {imaging.report}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </div>

      {/* Radiology Analytics */}
      <div
        style={{
          background: 'white',
          borderRadius: 12,
          padding: 16,
          border: '1px solid #e2e8f0',
        }}
      >
        <h3 style={{ margin: '0 0 16px', fontSize: '1.1rem' }}>📊 Imaging Metrics</h3>
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
              Studies Completed
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#2563eb' }}>18</div>
            <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: 4 }}>
              ↑ 7% from yesterday
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
              Avg Report Time
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#8b5cf6' }}>60m</div>
            <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: 4 }}>
              Radiologist review
            </div>
          </div>
          <div
            style={{
              background: '#fef2f2',
              padding: 14,
              borderRadius: 8,
              borderLeft: '4px solid #dc2626',
            }}
          >
            <div style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: 8 }}>
              Urgent Findings
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#dc2626' }}>1</div>
            <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: 4 }}>
              Needs review
            </div>
          </div>
          <div
            style={{
              background: '#f0fdf4',
              padding: 14,
              borderRadius: 8,
              borderLeft: '4px solid #10b981',
            }}
          >
            <div style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: 8 }}>
              Equipment Uptime
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#10b981' }}>100%</div>
            <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: 4 }}>
              All scanners active
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
