import { invoke } from '@tauri-apps/api/core';
import { listen } from '@tauri-apps/api/event';

export type Envelope = {
  id: string;
  type: string;
  payload?: any;
  meta?: any;
};

export async function rpc(request: Envelope) {
  // Tauri invoke expects named args; we pass the `request` as-is
  return invoke('hmis_rpc', { request });
}

export function onEvent(handler: (payload: any) => void) {
  return listen('hmis_event', (event) => handler(event.payload));
}

export function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
