import type { RolePageConfig, UserRole } from '../types/role';

export const rolePages: RolePageConfig[] = [
  {
    key: 'overview',
    label: 'Overview',
    subtitle: 'Main interface',
    summary:
      'The desktop shell loads a role-specific dashboard and keeps the HMIS workflows separated by department.',
    accent: '#2563eb',
    useCases: [
      { title: 'Receptionist', description: 'Patient registration, visit setup, and service routing' },
      { title: 'Doctor', description: 'Patient review, lab/radiology requests, treatment orders' },
      { title: 'Nurse', description: 'Triage, maternity, ante natal, and request management' },
      { title: 'Cashier', description: 'Billing and service referrals' },
    ],
  },
  {
    key: 'reception',
    label: 'Reception',
    subtitle: 'Patient intake, visit setup, and routing',
    summary:
      'Reception staff can register patients, start a visit, choose services, and route the patient to downstream departments.',
    accent: '#1d4ed8',
    useCases: [
      { title: 'Patient Registration', description: 'Create or update patient records and attach the visit context.' },
      { title: 'Set Visit', description: 'Open the consultation or treatment visit for the patient.' },
      { title: 'Select Service', description: 'Choose the relevant clinic or department for the visit.' },
    ],
  },
  {
    key: 'doctor',
    label: 'Doctor',
    subtitle: 'Clinical decisions and orders',
    summary:
      'Doctors can review patients, request diagnostics, prescribe treatment, and issue documentation from one dashboard.',
    accent: '#16a34a',
    useCases: [
      { title: 'Clerk Patient', description: 'Review the patient record before treatment or follow-up.' },
      { title: 'Request Lab', description: 'Raise lab workups and monitor pending samples.' },
      { title: 'Request Radiology', description: 'Order imaging studies such as X-rays or scans.' },
      { title: 'Prescribe Drugs', description: 'Create medication orders for discharge or treatment.' },
      { title: 'Generate Sick Off', description: 'Issue medical leave documentation for patients.' },
    ],
  },
  {
    key: 'nurse',
    label: 'Nurse',
    subtitle: 'Care coordination and ward support',
    summary:
      'Nursing staff can triage patients, support maternity and antenatal workflows, and request supplies.',
    accent: '#7c3aed',
    useCases: [
      { title: 'Triage Patient', description: 'Record initial observations and assign care priority.' },
      { title: 'Maternity', description: 'Support maternal care and delivery workflows.' },
      { title: 'Ante Natal', description: 'Track antenatal visits and care plans.' },
      { title: 'Request Items', description: 'Request medical or consumable items from inventory.' },
      { title: 'Inventory Count', description: 'Perform stock checks and reconciliation.' },
    ],
  },
  {
    key: 'cashier',
    label: 'Cashier',
    subtitle: 'Payments and billing workflow',
    summary:
      'The cashier handles billing for consultation visits, doctor charges, pharmacy purchases, and departmental accounts.',
    accent: '#dc2626',
    useCases: [
      { title: 'Bill From Visit', description: 'Create and manage billing for a completed visit.' },
      { title: 'Bill From Doctor', description: 'Invoice consults or treatment charges from the doctor workflow.' },
      { title: 'Bill From Pharmacy', description: 'Finalize over-the-counter and pharmacy purchases.' },
      { title: 'Route to Departments', description: 'Send patient costs to labs, radiology, or procedures.' },
    ],
  },
  {
    key: 'lab',
    label: 'Lab',
    subtitle: 'Specimen and result tracking',
    summary:
      'The lab dashboard handles specimen intake, order status, and completion workflows for test requests.',
    accent: '#0f766e',
    useCases: [
      { title: 'Receive Test Request', description: 'Track incoming specimen orders from reception or clinicians.' },
      { title: 'Process Specimen', description: 'Capture processing status and sample details.' },
      { title: 'Release Results', description: 'Publish results back to the clinical team.' },
    ],
  },
  {
    key: 'pharmacy',
    label: 'Pharmacy',
    subtitle: 'Medication fulfilment',
    summary:
      'The pharmacy module handles drug dispensing, inventory, and pharmacy billing interactions.',
    accent: '#b45309',
    useCases: [
      { title: 'Dispense Drugs', description: 'Fulfill doctor-prescribed medication requests.' },
      { title: 'Inventory Count', description: 'Monitor stock for key medications and supplies.' },
      { title: 'Pharmacy Billing', description: 'Issue charges tied to drug issuance.' },
    ],
  },
  {
    key: 'radiology',
    label: 'Radiology',
    subtitle: 'Imaging workflow',
    summary:
      'Radiology staff can receive imaging requests, track equipment availability, and report findings.',
    accent: '#7e22ce',
    useCases: [
      { title: 'Receive Request', description: 'Create or accept imaging requests from the doctor workflow.' },
      { title: 'Schedule Study', description: 'Assign the study and manage the booking.' },
      { title: 'Report Findings', description: 'Attach exam results and radiologist notes.' },
    ],
  },
  {
    key: 'procurement',
    label: 'Procurement',
    subtitle: 'Supply requests and approvals',
    summary:
      'Procurement teams can review requested items and coordinate purchasing for hospital departments.',
    accent: '#c2410c',
    useCases: [
      { title: 'Review Requests', description: 'Inspect incoming item requests from clinical units.' },
      { title: 'Approve Purchase', description: 'Approve or reject purchase requests.' },
      { title: 'Manage Supplier', description: 'Track supplier status and delivery expectations.' },
    ],
  },
  {
    key: 'accountant',
    label: 'Accountant',
    subtitle: 'Finance and reconciliation',
    summary:
      'Accounting staff can review billing activity, reconcile payments, and monitor financial operations.',
    accent: '#be185d',
    useCases: [
      { title: 'Review Billing', description: 'Inspect cash collections and outstanding invoices.' },
      { title: 'Reconcile Payments', description: 'Match payments to issued bills and service lines.' },
      { title: 'Financial Report', description: 'Generate performance and balance summaries.' },
    ],
  },
  {
    key: 'admin',
    label: 'Administrator',
    subtitle: 'System oversight',
    summary:
      'Administrators manage the overall HMIS experience, role access, and hospital-wide workflows.',
    accent: '#0284c7',
    useCases: [
      { title: 'Manage Users', description: 'Assign roles and monitor user access across the platform.' },
      { title: 'Monitor Workflows', description: 'Track the operational health of departments.' },
      { title: 'Configure Modules', description: 'Enable or disable capabilities per service line.' },
    ],
  },
];

export function getRolePageConfig(key: UserRole) {
  return rolePages.find((page) => page.key === key) ?? rolePages[0];
}
