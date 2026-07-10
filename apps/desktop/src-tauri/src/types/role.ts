export type UserRole = 'overview' | 'reception' | 'doctor' | 'nurse' | 'cashier' | 'lab' | 'pharmacy' | 'radiology' | 'procurement' | 'accountant' | 'admin';

export type RolePageConfig = {
  key: UserRole;
  label: string;
  subtitle: string;
  summary: string;
  accent: string;
  useCases: Array<{
    title: string;
    description: string;
  }>;
};
