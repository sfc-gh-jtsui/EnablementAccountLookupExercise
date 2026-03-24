import { useState } from 'react';
import Navigation from '../components/Navigation';
import SqlCodeBlock from '../components/SqlCodeBlock';
import QueryRunner from '../components/QueryRunner';

function ConnectButton() {
  const [status, setStatus] = useState<'idle' | 'connecting' | 'connected' | 'error'>('idle');
  const [error, setError] = useState('');

  const handleConnect = async () => {
    setStatus('connecting');
    setError('');
    try {
      const res = await fetch('/api/connect', { method: 'POST' });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Connection failed');
      setStatus('connected');
    } catch (err: any) {
      setError(err.message);
      setStatus('error');
    }
  };

  return (
    <div className="card" style={{ marginBottom: 24, borderColor: status === 'connected' ? 'var(--success-green)' : 'var(--primary-blue)', borderLeftWidth: 3 }}>
      <h3 style={{ marginBottom: 8 }}>Connect to Snowflake</h3>
      <p style={{ marginBottom: 12, fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
        Click below to authenticate with Snowhouse. This will open a browser window for SSO login.
      </p>
      <button
        className="btn-primary"
        onClick={handleConnect}
        disabled={status === 'connecting' || status === 'connected'}
        style={{
          background: status === 'connected' ? 'var(--success-green)' : undefined,
        }}
      >
        {status === 'idle' && '🔗 Connect to Snowflake'}
        {status === 'connecting' && 'Opening browser...'}
        {status === 'connected' && '✓ Connected'}
        {status === 'error' && '🔗 Retry Connection'}
      </button>
      {status === 'error' && (
        <div className="feedback-error" style={{ marginTop: 8, fontSize: '0.85rem' }}>
          {error}
        </div>
      )}
    </div>
  );
}

export default function Page3_Step1() {
  return (
    <div className="page-content fade-in">
      <h1 style={{ marginBottom: 8 }}>Step 1: Verify Your Connection</h1>
      <p style={{ color: 'var(--text-secondary)', marginBottom: 24 }}>
        Confirm you're connected to Snowhouse with the correct role.
      </p>

      <ConnectButton />

      <div className="card" style={{ marginBottom: 24 }}>
        <h3 style={{ marginBottom: 12 }}>Check Your Role</h3>
        <p style={{ marginBottom: 16 }}>
          First, let's verify that you are logged in to Snowhouse with the{' '}
          <strong>TECHNICAL_ACCOUNT_MANAGER</strong> role. Click the button below to run a
          connection check query.
        </p>
        <SqlCodeBlock
          title="Connection Check Query"
          sql="SELECT CURRENT_ROLE() AS CURRENT_ROLE"
        />
        <QueryRunner queryId="connection-check" buttonText="Check Connection" />
      </div>

      <div className="card">
        <h3 style={{ marginBottom: 8 }}>What to expect</h3>
        <p>
          The query should return <strong>TECHNICAL_ACCOUNT_MANAGER</strong> as your current role.
          If you see a different role, make sure you switch to the correct role before proceeding.
        </p>
      </div>

      <Navigation />
    </div>
  );
}
