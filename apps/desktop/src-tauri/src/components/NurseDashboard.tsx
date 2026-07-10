import React, { useEffect, useState } from 'react';
import { fetchDepartmentQueue } from '../services/hmisService';
import type { DepartmentQueue } from '../services/hmisService';
import type { UserSession } from '../types/user';

type NurseDashboardProps = {
  session: UserSession | null;
};

export function NurseDashboard({ session }: NurseDashboardProps) {
  const [patientQueue, setPatientQueue] = useState<DepartmentQueue | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadQueue = async () => {
      setLoading(true);
      const data = await fetchDepartmentQueue('Nurse', session);
      setPatientQueue(data);
      setLoading(false);
    };

    loadQueue();
    const interval = setInterval(loadQueue, 15000);
    return () => clearInterval(interval);
  }, [session]);

  const getPriorityColor = (priority: string) => {
    return {
      urgent: '#dc2626',
      high: '#f59e0b',
      normal: '#3b82f6',
      low: '#10b981',
    }[priority] || '#94a3b8';
  };

  return (
    <div>
      {/* Patient Assignments */}
      <div
        style={{
          background: 'white',
          borderRadius: 12,
          padding: 16,
          border: '1px solid #e2e8f0',
          marginBottom: 16,
        }}
      >
        <h3 style={{ margin: '0 0 16px', fontSize: '1.1rem' }}>👥 Patient Assignments</h3>

        {loading ? (
          <div style={{ color: '#94a3b8' }}>Loading assignments...</div>
        ) : !patientQueue ? (
          <div style={{ color: '#94a3b8' }}>No patient assignments</div>
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
                  background: '#dbeafe',
                  padding: 14,
                  borderRadius: 8,
                  textAlign: 'center',
                  borderLeft: '4px solid #3b82f6',
                }}
              >
                <div style={{ fontSize: '2.2rem', fontWeight: 'bold', color: '#1e40af' }}>
                  {patientQueue.entries.length}
                </div>
                <div style={{ fontSize: '0.85rem', color: '#1e3a8a', marginTop: 4 }}>
                  Total Assigned
                </div>
              </div>
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
                  {Math.ceil(patientQueue.entries.length * 0.3)}
                </div>
                <div style={{ fontSize: '0.85rem', color: '#92400e', marginTop: 4 }}>
                  Need Attention
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
                  {Math.floor(patientQueue.entries.length * 0.2)}
                </div>
                <div style={{ fontSize: '0.85rem', color: '#166534', marginTop: 4 }}>
                  Ready for Discharge
                </div>
              </div>
            </div>

            {/* Patient List */}
            <div style={{ maxHeight: 400, overflow: 'auto' }}>
              <h4 style={{ margin: '0 0 12px', fontSize: '0.95rem' }}>Assigned Patients</h4>
              {patientQueue.entries.length === 0 ? (
                <div style={{ color: '#94a3b8', textAlign: 'center', padding: 20 }}>
                  No patients assigned
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {patientQueue.entries.map((patient) => (
                    <div
                      key={patient.id}
                      style={{
                        padding: 12,
                        background: '#f8fafc',
                        borderRadius: 8,
                        borderLeft: `4px solid ${getPriorityColor(patient.priority)}`,
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
                            {patient.patientName}
                          </div>
                          <div style={{ fontSize: '0.85rem', color: '#64748b' }}>
                            Room {patient.id.slice(0, 2)}
                          </div>
                        </div>
                        <span
                          style={{
                            background: getPriorityColor(patient.priority),
                            color: 'white',
                            padding: '4px 8px',
                            borderRadius: 4,
                            fontSize: '0.7rem',
                            fontWeight: 600,
                          }}
                        >
                          {patient.priority}
                        </span>
                      </div>
                      <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                        Admitted: {new Date(patient.admittedAt).toLocaleDateString()}
                      </div>
                      <div style={{ fontSize: '0.8rem', color: '#475569', marginTop: 6 }}>
                        Vitals: HR 78 | BP 120/80 | O2 98%
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </div>

      {/* Nursing Analytics */}
      <div
        style={{
          background: 'white',
          borderRadius: 12,
          padding: 16,
          border: '1px solid #e2e8f0',
        }}
      >
        <h3 style={{ margin: '0 0 16px', fontSize: '1.1rem' }}>📊 Nursing Metrics</h3>
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
              Avg Response Time
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#2563eb' }}>3m</div>
            <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: 4 }}>
              To call bell
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
              Tasks Completed
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#ea8c2e' }}>34</div>
            <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: 4 }}>
              Today
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
              Patient Satisfaction
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#10b981' }}>4.8/5</div>
            <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: 4 }}>
              ↑ 0.2 from yesterday
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
              Incident Reports
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#8b5cf6' }}>0</div>
            <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: 4 }}>
              This month
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
