import { rpc } from '../hmisClient';
import type { UserSession } from '../types/user';

// Queue Management
export interface QueueEntry {
  id: string;
  patientName: string;
  patientId: string;
  timestamp: string;
  department: string;
  status: 'waiting' | 'in-service' | 'completed';
  priority: 'normal' | 'urgent' | 'vip';
}

export interface DepartmentQueue {
  department: string;
  totalInQueue: number;
  averageWaitTime: number;
  entries: QueueEntry[];
}

// Patient Records
export interface PatientRecord {
  id: string;
  name: string;
  age: number;
  gender: string;
  phone: string;
  email: string;
  lastVisit: string;
  status: 'active' | 'inactive' | 'archived';
}

// Lab Services
export interface LabTest {
  id: string;
  patientName: string;
  patientId: string;
  testType: string;
  status: 'pending' | 'in-progress' | 'completed' | 'reviewed';
  orderedBy: string;
  orderedAt: string;
  result?: string;
}

export interface LabQueue {
  totalPending: number;
  totalInProgress: number;
  totalCompleted: number;
  tests: LabTest[];
}

// Radiology Services
export interface RadiologyImaging {
  id: string;
  patientName: string;
  patientId: string;
  imagingType: string;
  status: 'scheduled' | 'in-progress' | 'completed' | 'reported';
  orderedBy: string;
  orderedAt: string;
  report?: string;
}

export interface RadiologyQueue {
  totalScheduled: number;
  totalInProgress: number;
  totalReported: number;
  imaging: RadiologyImaging[];
}

// Pharmacy Queue
export interface PharmacyOrder {
  id: string;
  patientName: string;
  prescriptionId: string;
  medications: Array<{ name: string; quantity: number; unit: string }>;
  status: 'pending' | 'preparing' | 'ready' | 'dispensed';
  orderedAt: string;
}

export interface PharmacyQueue {
  totalPending: number;
  totalReady: number;
  orders: PharmacyOrder[];
}

// Clinical Dashboard
export interface ClinicalMetrics {
  totalPatientsToday: number;
  completedConsultations: number;
  pendingConsultations: number;
  admissions: number;
  discharges: number;
  emergencyCases: number;
}

// Department Reports
export interface DepartmentReport {
  department: string;
  patientsServed: number;
  averageServiceTime: number;
  satisfaction: number;
  criticalEvents: number;
}

// Fetch queues from all departments
export async function fetchAllQueues(session: UserSession | null): Promise<DepartmentQueue[]> {
  if (!session) return [];

  try {
    const response = await rpc({
      id: crypto.randomUUID(),
      type: 'FetchAllQueues',
      payload: { role: session.role },
      meta: { source: 'desktop' },
    });

    const data = (response as { payload?: unknown }).payload ?? {};
    return Array.isArray((data as Record<string, unknown>).queues)
      ? ((data as Record<string, unknown>).queues as DepartmentQueue[])
      : [];
  } catch (error) {
    console.error('Error fetching queues:', error);
    return [];
  }
}

// Fetch specific department queue
export async function fetchDepartmentQueue(
  department: string,
  session: UserSession | null
): Promise<DepartmentQueue | null> {
  if (!session) return null;

  try {
    const response = await rpc({
      id: crypto.randomUUID(),
      type: 'FetchDepartmentQueue',
      payload: { department, role: session.role },
      meta: { source: 'desktop' },
    });

    const data = (response as { payload?: unknown }).payload ?? {};
    return (data as Record<string, unknown>).queue as DepartmentQueue | null;
  } catch (error) {
    console.error(`Error fetching ${department} queue:`, error);
    return null;
  }
}

// Fetch patient records
export async function fetchPatients(session: UserSession | null): Promise<PatientRecord[]> {
  if (!session) return [];

  try {
    const response = await rpc({
      id: crypto.randomUUID(),
      type: 'FetchPatients',
      payload: { role: session.role },
      meta: { source: 'desktop' },
    });

    const data = (response as { payload?: unknown }).payload ?? {};
    return Array.isArray((data as Record<string, unknown>).patients)
      ? ((data as Record<string, unknown>).patients as PatientRecord[])
      : [];
  } catch (error) {
    console.error('Error fetching patients:', error);
    return [];
  }
}

// Fetch lab queue
export async function fetchLabQueue(session: UserSession | null): Promise<LabQueue | null> {
  if (!session) return null;

  try {
    const response = await rpc({
      id: crypto.randomUUID(),
      type: 'FetchLabQueue',
      payload: { role: session.role },
      meta: { source: 'desktop' },
    });

    const data = (response as { payload?: unknown }).payload ?? {};
    return (data as Record<string, unknown>).labQueue as LabQueue | null;
  } catch (error) {
    console.error('Error fetching lab queue:', error);
    return null;
  }
}

// Fetch radiology queue
export async function fetchRadiologyQueue(session: UserSession | null): Promise<RadiologyQueue | null> {
  if (!session) return null;

  try {
    const response = await rpc({
      id: crypto.randomUUID(),
      type: 'FetchRadiologyQueue',
      payload: { role: session.role },
      meta: { source: 'desktop' },
    });

    const data = (response as { payload?: unknown }).payload ?? {};
    return (data as Record<string, unknown>).radiologyQueue as RadiologyQueue | null;
  } catch (error) {
    console.error('Error fetching radiology queue:', error);
    return null;
  }
}

// Fetch pharmacy queue
export async function fetchPharmacyQueue(session: UserSession | null): Promise<PharmacyQueue | null> {
  if (!session) return null;

  try {
    const response = await rpc({
      id: crypto.randomUUID(),
      type: 'FetchPharmacyQueue',
      payload: { role: session.role },
      meta: { source: 'desktop' },
    });

    const data = (response as { payload?: unknown }).payload ?? {};
    return (data as Record<string, unknown>).pharmacyQueue as PharmacyQueue | null;
  } catch (error) {
    console.error('Error fetching pharmacy queue:', error);
    return null;
  }
}

// Fetch clinical metrics
export async function fetchClinicalMetrics(session: UserSession | null): Promise<ClinicalMetrics | null> {
  if (!session) return null;

  try {
    const response = await rpc({
      id: crypto.randomUUID(),
      type: 'FetchClinicalMetrics',
      payload: { role: session.role },
      meta: { source: 'desktop' },
    });

    const data = (response as { payload?: unknown }).payload ?? {};
    return (data as Record<string, unknown>).metrics as ClinicalMetrics | null;
  } catch (error) {
    console.error('Error fetching clinical metrics:', error);
    return null;
  }
}

// Fetch department reports
export async function fetchDepartmentReports(session: UserSession | null): Promise<DepartmentReport[]> {
  if (!session) return [];

  try {
    const response = await rpc({
      id: crypto.randomUUID(),
      type: 'FetchDepartmentReports',
      payload: { role: session.role },
      meta: { source: 'desktop' },
    });

    const data = (response as { payload?: unknown }).payload ?? {};
    return Array.isArray((data as Record<string, unknown>).reports)
      ? ((data as Record<string, unknown>).reports as DepartmentReport[])
      : [];
  } catch (error) {
    console.error('Error fetching department reports:', error);
    return [];
  }
}
