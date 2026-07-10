import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';

export function LoginForm() {
  const { login } = useAuth();
  const [username, setUsername] = useState('brian');
  const [password, setPassword] = useState('password');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);
    setMessage('');

    try {
      await login({ username, password });
      setMessage('Signed in successfully.');
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Login failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="page-card" onSubmit={handleSubmit} style={{ maxWidth: 420, margin: '0 auto' }}>
      <h2>Sign in</h2>
      <p className="page-subtitle">Authenticate through the Rust layer and load the correct dashboard.</p>
      <div style={{ display: 'grid', gap: 12, marginTop: 16 }}>
        <label>
          <div>Username</div>
          <input value={username} onChange={(event) => setUsername(event.target.value)} style={{ width: '100%', padding: 10, marginTop: 4 }} />
        </label>
        <label>
          <div>Password</div>
          <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} style={{ width: '100%', padding: 10, marginTop: 4 }} />
        </label>
        <button type="submit" disabled={isSubmitting} style={{ padding: 10, cursor: 'pointer' }}>
          {isSubmitting ? 'Signing in…' : 'Sign in'}
        </button>
      </div>
      {message ? <p style={{ marginTop: 12 }}>{message}</p> : null}
    </form>
  );
}
