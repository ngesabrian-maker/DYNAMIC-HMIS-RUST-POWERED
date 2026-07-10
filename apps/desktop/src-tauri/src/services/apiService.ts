import { rpc } from '../hmisClient';
import type { UserSession } from '../types/user';

export interface Message {
  id: string;
  title: string;
  content: string;
  timestamp: string;
  read: boolean;
  type: 'info' | 'warning' | 'error' | 'success';
}

export interface InventoryItem {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  reorderLevel: number;
  status: 'in-stock' | 'low' | 'out-of-stock';
}

export interface ItemRequisition {
  id: string;
  itemName: string;
  quantity: number;
  requestedBy: string;
  status: 'pending' | 'approved' | 'rejected' | 'fulfilled';
  createdAt: string;
}

export interface AnalyticsData {
  title: string;
  value: number | string;
  trend?: 'up' | 'down' | 'stable';
  change?: number;
  unit?: string;
}

// Fetch messages for the current user
export async function fetchMessages(session: UserSession | null): Promise<Message[]> {
  if (!session) return [];

  try {
    const response = await rpc({
      id: crypto.randomUUID(),
      type: 'FetchMessages',
      payload: { userId: session.userId, role: session.role },
      meta: { source: 'desktop' },
    });

    const data = (response as { payload?: unknown }).payload ?? {};
    return Array.isArray((data as Record<string, unknown>).messages)
      ? ((data as Record<string, unknown>).messages as Message[])
      : [];
  } catch (error) {
    console.error('Error fetching messages:', error);
    return [];
  }
}

// Fetch inventory count
export async function fetchInventory(session: UserSession | null): Promise<InventoryItem[]> {
  if (!session) return [];

  try {
    const response = await rpc({
      id: crypto.randomUUID(),
      type: 'FetchInventory',
      payload: { role: session.role },
      meta: { source: 'desktop' },
    });

    const data = (response as { payload?: unknown }).payload ?? {};
    return Array.isArray((data as Record<string, unknown>).inventory)
      ? ((data as Record<string, unknown>).inventory as InventoryItem[])
      : [];
  } catch (error) {
    console.error('Error fetching inventory:', error);
    return [];
  }
}

// Fetch item requisitions
export async function fetchRequisitions(session: UserSession | null): Promise<ItemRequisition[]> {
  if (!session) return [];

  try {
    const response = await rpc({
      id: crypto.randomUUID(),
      type: 'FetchRequisitions',
      payload: { userId: session.userId, role: session.role },
      meta: { source: 'desktop' },
    });

    const data = (response as { payload?: unknown }).payload ?? {};
    return Array.isArray((data as Record<string, unknown>).requisitions)
      ? ((data as Record<string, unknown>).requisitions as ItemRequisition[])
      : [];
  } catch (error) {
    console.error('Error fetching requisitions:', error);
    return [];
  }
}

// Fetch analytics data
export async function fetchAnalytics(session: UserSession | null): Promise<AnalyticsData[]> {
  if (!session) return [];

  try {
    const response = await rpc({
      id: crypto.randomUUID(),
      type: 'FetchAnalytics',
      payload: { role: session.role },
      meta: { source: 'desktop' },
    });

    const data = (response as { payload?: unknown }).payload ?? {};
    return Array.isArray((data as Record<string, unknown>).analytics)
      ? ((data as Record<string, unknown>).analytics as AnalyticsData[])
      : [];
  } catch (error) {
    console.error('Error fetching analytics:', error);
    return [];
  }
}

// Mark message as read
export async function markMessageAsRead(messageId: string): Promise<boolean> {
  try {
    const response = await rpc({
      id: crypto.randomUUID(),
      type: 'MarkMessageAsRead',
      payload: { messageId },
      meta: { source: 'desktop' },
    });

    return (response as { payload?: unknown }).payload !== null;
  } catch (error) {
    console.error('Error marking message as read:', error);
    return false;
  }
}

// Submit item requisition
export async function submitRequisition(
  itemId: string,
  quantity: number,
  session: UserSession | null
): Promise<boolean> {
  if (!session) return false;

  try {
    const response = await rpc({
      id: crypto.randomUUID(),
      type: 'SubmitRequisition',
      payload: { itemId, quantity, userId: session.userId },
      meta: { source: 'desktop' },
    });

    return (response as { payload?: unknown }).payload !== null;
  } catch (error) {
    console.error('Error submitting requisition:', error);
    return false;
  }
}
