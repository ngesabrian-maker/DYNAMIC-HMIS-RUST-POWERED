import React, { useEffect, useState } from 'react';
import { fetchRadiologyQueue } from '../services/hmisService';
import type { RadiologyQueue } from '../services/hmisService';
import type { UserSession } from '../types/user';

type RadiologyQueueViewerProps = {
  session: UserSession | null;
};

export function RadiologyQueueViewer({ session }: RadiologyQueueViewerProps) {
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
    const interval = setInterval(loadRadiologyQueue, 20000); // Refresh every 20s

    return () => clearInterval(interval);
  }, [session]);

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      scheduled: '#f59e0b',
      'in-progress': '#3b82f6',
      completed: '#10b981',
      reported: '#8b5cf6',
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
      <h3 style={{ margin: '0 0 16px', fontSize: '1rem' }}>📋 Radiology Queue</h3>

      {loading ? (
        <div style={{ color: '#94a3b8', fontSize: '0.9rem' }}>Loading radiology queue...</div>
      ) : !radiologyQueue ? (
        <div style={{ color: '#94a3b8', fontSize: '0.9rem' }}>Radiology queue unavailable</div>
      ) : (
        <>
          {/* Summary cards */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
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
                {radiologyQueue.totalScheduled}
              </div>
              <div style={{ fontSize: '0.75rem', color: '#92400e' }}>Scheduled</div>
            </div>
            <div
              style={{
                background: '#dbeafe',
                padding: 12,
                borderRadius: 8,
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: '1.4rem', fontWeight: 'bold', color: '#1e40af' }}>
                {radiologyQueue.totalInProgress}
              </div>
              <div style={{ fontSize: '0.75rem', color: '#1e3a8a' }}>In Progress</div>
            </div>
            <div
              style={{
                background: '#e9d5ff',
                padding: 12,
                borderRadius: 8,
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: '1.4rem', fontWeight: 'bold', color: '#6b21a8' }}>
                {radiologyQueue.totalReported}
              </div>
              <div style={{ fontSize: '0.75rem', color: '#581c87' }}>Reported</div>
            </div>
          </div>

          {/* Imaging list */}
          <div style={{ maxHeight: 350, overflow: 'auto' }}>
            {radiologyQueue.imaging.length === 0 ? (
              <div style={{ color: '#94a3b8', fontSize: '0.9rem', textAlign: 'center', padding: 20 }}>
                No imaging in queue
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {radiologyQueue.imaging.map((imaging) => (
                  <div
                    key={imaging.id}
                    style={{
                      padding: 12,
                      background: '#f8fafc',
                      borderRadius: 8,
                      borderLeft: `4px solid ${getStatusColor(imaging.status)}`,
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
                        <div style={{ fontWeight: 600 }}>{imaging.patientName}</div>
                        <div style={{ color: '#64748b', fontSize: '0.8rem' }}>{imaging.imagingType}</div>
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
                    <div style={{ color: '#94a3b8', fontSize: '0.75rem' }}>
                      Ordered by: {imaging.orderedBy} | {new Date(imaging.orderedAt).toLocaleDateString()}
                    </div>
                    {imaging.report && (
                      <div
                        style={{
                          marginTop: 6,
                          padding: 6,
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
  );
}
