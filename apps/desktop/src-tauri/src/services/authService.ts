import type { UserSession } from '../types/user';
import { rpc } from '../hmisClient';

export async function authenticateUser(credentials: { username: string; password: string }) {
  const response = await rpc({
    id: crypto.randomUUID(),
    type: 'AuthenticateUser',
    payload: credentials,
    meta: { source: 'desktop' },
  });

  const payload = (response as { payload?: unknown }).payload ?? {};

  return {
    userId: Number((payload as Record<string, unknown>).userId ?? 0),
    username: String((payload as Record<string, unknown>).username ?? credentials.username),
    displayName: String((payload as Record<string, unknown>).displayName ?? credentials.username),
    role: String((payload as Record<string, unknown>).role ?? 'overview') as UserSession['role'],
    permissions: Array.isArray((payload as Record<string, unknown>).permissions)
      ? ((payload as Record<string, unknown>).permissions as string[])
      : [],
  } as UserSession;
}
