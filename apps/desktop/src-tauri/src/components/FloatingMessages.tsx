import React, { useEffect, useState } from 'react';
import type { Message } from '../services/apiService';
import { fetchMessages, markMessageAsRead } from '../services/apiService';
import type { UserSession } from '../types/user';

type FloatingMessagesProps = {
  session: UserSession | null;
};

export function FloatingMessages({ session }: FloatingMessagesProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [visibleMessages, setVisibleMessages] = useState<Set<string>>(new Set());

  useEffect(() => {
    const loadMessages = async () => {
      const data = await fetchMessages(session);
      setMessages(data);
    };

    loadMessages();
    const interval = setInterval(loadMessages, 30000); // Refresh every 30s

    return () => clearInterval(interval);
  }, [session]);

  const unreadCount = messages.filter((m) => !m.read).length;

  const handleMessageRead = async (messageId: string) => {
    await markMessageAsRead(messageId);
    setMessages((prev) => prev.map((m) => (m.id === messageId ? { ...m, read: true } : m)));
  };

  const handleMessageClick = (messageId: string) => {
    setVisibleMessages((prev) => {
      const next = new Set(prev);
      next.has(messageId) ? next.delete(messageId) : next.add(messageId);
      return next;
    });
    if (!messages.find((m) => m.id === messageId)?.read) {
      handleMessageRead(messageId);
    }
  };

  return (
    <div style={{ position: 'fixed', bottom: 20, right: 20, zIndex: 1000 }}>
      {/* Message notifications */}
      {messages
        .filter((m) => visibleMessages.has(m.id))
        .map((message) => (
          <div
            key={message.id}
            style={{
              background: message.type === 'error' ? '#fee2e2' : '#f0fdf4',
              border: `1px solid ${message.type === 'error' ? '#fca5a5' : '#86efac'}`,
              borderRadius: 8,
              padding: 12,
              marginBottom: 8,
              minWidth: 280,
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
            }}
          >
            <div style={{ fontWeight: 600, marginBottom: 4, fontSize: '0.9rem' }}>{message.title}</div>
            <div style={{ fontSize: '0.85rem', color: '#475569', marginBottom: 8 }}>{message.content}</div>
            <button
              onClick={() => handleMessageClick(message.id)}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#2563eb',
                cursor: 'pointer',
                fontSize: '0.8rem',
                textDecoration: 'underline',
              }}
            >
              Dismiss
            </button>
          </div>
        ))}

      {/* Message center button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: 'relative',
          width: 48,
          height: 48,
          borderRadius: '50%',
          background: '#2563eb',
          border: 'none',
          color: 'white',
          cursor: 'pointer',
          fontSize: '1.2rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 12px rgba(37, 99, 235, 0.3)',
        }}
      >
        💬
        {unreadCount > 0 && (
          <div
            style={{
              position: 'absolute',
              top: -8,
              right: -8,
              background: '#dc2626',
              color: 'white',
              borderRadius: '50%',
              width: 24,
              height: 24,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '0.75rem',
              fontWeight: 'bold',
            }}
          >
            {unreadCount}
          </div>
        )}
      </button>

      {/* Message panel */}
      {isOpen && (
        <div
          style={{
            position: 'absolute',
            bottom: 70,
            right: 0,
            background: 'white',
            borderRadius: 12,
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)',
            width: 320,
            maxHeight: 400,
            overflow: 'auto',
          }}
        >
          <div style={{ padding: 16, borderBottom: '1px solid #e2e8f0' }}>
            <h3 style={{ margin: 0, fontSize: '1rem' }}>Messages</h3>
          </div>
          {messages.length === 0 ? (
            <div style={{ padding: 16, color: '#94a3b8', textAlign: 'center', fontSize: '0.9rem' }}>
              No messages
            </div>
          ) : (
            <div>
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  onClick={() => handleMessageClick(msg.id)}
                  style={{
                    padding: 12,
                    borderBottom: '1px solid #f1f5f9',
                    cursor: 'pointer',
                    background: msg.read ? 'white' : '#f0f9ff',
                    fontWeight: msg.read ? 'normal' : '600',
                  }}
                >
                  <div style={{ fontSize: '0.9rem' }}>{msg.title}</div>
                  <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: 4 }}>{msg.content}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
