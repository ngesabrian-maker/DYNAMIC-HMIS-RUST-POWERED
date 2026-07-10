import React, { useEffect, useState } from 'react';
import { fetchPatients } from '../services/hmisService';
import type { PatientRecord } from '../services/hmisService';
import type { UserSession } from '../types/user';

type PatientDirectoryProps = {
  session: UserSession | null;
};

export function PatientDirectory({ session }: PatientDirectoryProps) {
  const [patients, setPatients] = useState<PatientRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPatient, setSelectedPatient] = useState<PatientRecord | null>(null);

  useEffect(() => {
    const loadPatients = async () => {
      setLoading(true);
      const data = await fetchPatients(session);
      setPatients(data);
      setLoading(false);
    };

    loadPatients();
    const interval = setInterval(loadPatients, 60000); // Refresh every 60s

    return () => clearInterval(interval);
  }, [session]);

  const filteredPatients = patients.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      active: '#10b981',
      inactive: '#94a3b8',
      archived: '#64748b',
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
      <h3 style={{ margin: '0 0 16px', fontSize: '1rem' }}>👥 Patient Directory</h3>

      {/* Search bar */}
      <input
        type="text"
        placeholder="Search by name or patient ID..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          width: '100%',
          padding: 10,
          marginBottom: 16,
          border: '1px solid #cbd5e1',
          borderRadius: 6,
          fontSize: '0.9rem',
        }}
      />

      {loading ? (
        <div style={{ color: '#94a3b8', fontSize: '0.9rem' }}>Loading patients...</div>
      ) : filteredPatients.length === 0 ? (
        <div style={{ color: '#94a3b8', fontSize: '0.9rem' }}>
          {searchTerm ? 'No patients match your search' : 'No patients found'}
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          {/* Patient list */}
          <div style={{ maxHeight: 400, overflow: 'auto', border: '1px solid #e2e8f0', borderRadius: 8 }}>
            {filteredPatients.map((patient) => (
              <button
                key={patient.id}
                onClick={() => setSelectedPatient(patient)}
                style={{
                  width: '100%',
                  padding: 12,
                  border: 'none',
                  borderBottom: '1px solid #e2e8f0',
                  background: selectedPatient?.id === patient.id ? '#f0f9ff' : 'transparent',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'background 0.2s',
                }}
              >
                <div style={{ fontWeight: 600, fontSize: '0.9rem', marginBottom: 4 }}>
                  {patient.name}
                </div>
                <div style={{ fontSize: '0.8rem', color: '#64748b' }}>ID: {patient.id}</div>
                <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: 2 }}>
                  <span
                    style={{
                      background: getStatusColor(patient.status),
                      color: 'white',
                      padding: '2px 6px',
                      borderRadius: 3,
                      marginRight: 4,
                    }}
                  >
                    {patient.status}
                  </span>
                </div>
              </button>
            ))}
          </div>

          {/* Patient details */}
          <div
            style={{
              padding: 12,
              background: '#f8fafc',
              borderRadius: 8,
              border: '1px solid #e2e8f0',
              maxHeight: 400,
              overflow: 'auto',
            }}
          >
            {selectedPatient ? (
              <div>
                <h4 style={{ margin: '0 0 12px', fontSize: '0.95rem' }}>Patient Details</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <div>
                    <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginBottom: 2 }}>Name</div>
                    <div style={{ fontSize: '0.9rem', fontWeight: 600 }}>{selectedPatient.name}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginBottom: 2 }}>Patient ID</div>
                    <div style={{ fontSize: '0.9rem' }}>{selectedPatient.id}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginBottom: 2 }}>Age</div>
                    <div style={{ fontSize: '0.9rem' }}>{selectedPatient.age} years old</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginBottom: 2 }}>Gender</div>
                    <div style={{ fontSize: '0.9rem' }}>{selectedPatient.gender}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginBottom: 2 }}>Phone</div>
                    <div style={{ fontSize: '0.9rem' }}>{selectedPatient.phone}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginBottom: 2 }}>Email</div>
                    <div style={{ fontSize: '0.9rem' }}>{selectedPatient.email}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginBottom: 2 }}>Last Visit</div>
                    <div style={{ fontSize: '0.9rem' }}>
                      {new Date(selectedPatient.lastVisit).toLocaleDateString()}
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginBottom: 2 }}>Status</div>
                    <span
                      style={{
                        background: getStatusColor(selectedPatient.status),
                        color: 'white',
                        padding: '4px 8px',
                        borderRadius: 4,
                        fontSize: '0.85rem',
                        fontWeight: 600,
                      }}
                    >
                      {selectedPatient.status.charAt(0).toUpperCase() + selectedPatient.status.slice(1)}
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div style={{ color: '#94a3b8', textAlign: 'center', padding: 20 }}>
                Select a patient to view details
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
