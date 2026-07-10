import type { UserRole } from './role';

export interface UserSession {
  userId: number;
  username: string;
  displayName: string;
  role: UserRole;
  permissions: string[];
}
