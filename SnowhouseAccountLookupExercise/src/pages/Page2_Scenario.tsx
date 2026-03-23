import Navigation from '../components/Navigation';
import Checklist from '../components/Checklist';

const prerequisites = [
  { id: 'access', label: 'Access to Snowhouse' },
  { id: 'role', label: 'TECHNICAL_ACCOUNT_MANAGER role assigned to your user' },
  { id: 'cortex', label: 'Cortex Code installed on Snowflake CLI or SnowWork desktop app installed' },
  { id: 'connected', label: 'Snowhouse connected to Snowflake CLI or SnowWork desktop app' },
];

export default function Page2_Scenario() {
  return (
    <div className="page-content fade-in">
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
        <h1 style={{ margin: 0 }}>Scenario Context</h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {/* Dropbox logo */}
          <svg width="32" height="32" viewBox="0 0 256 218" xmlns="http://www.w3.org/2000/svg">
            <path d="M63.995 0L0 40.771l63.995 40.772L128 40.771zM192.005 0L128 40.771l64.005 40.772L256 40.771zM0 122.321l63.995 40.772L128 122.321 63.995 81.543zM192.005 81.543L128 122.321l64.005 40.772L256 122.321zM64.005 176.258L128 217.03l63.995-40.772L128 135.486z" fill="#0061FF"/>
          </svg>
          <span style={{ fontSize: '1.5rem', color: 'var(--text-secondary)' }}>+</span>
          <img src="/images/Snowflake_Logomark_blue.png" alt="Snowflake" style={{ width: 32, height: 32 }} />
        </div>
      </div>

      <div className="card" style={{ marginBottom: 24 }}>
        <h2 style={{ marginBottom: 12 }}>Your Assignment</h2>
        <p style={{ marginBottom: 16 }}>
          You have been assigned to the <strong>Dropbox</strong> account and want to find the
          account ID and deployment of their <strong>production</strong> Snowflake account to
          perform a health check.
        </p>
      </div>

      <div className="card" style={{ marginBottom: 24 }}>
        <h2 style={{ marginBottom: 12 }}>Goal</h2>
        <p>
          Find the <code style={{ background: 'var(--bg-light)', padding: '2px 6px', borderRadius: 4, fontFamily: 'var(--font-mono)', fontSize: '0.9em' }}>SNOWFLAKE_ACCOUNT_ID</code>{' '}
          and <code style={{ background: 'var(--bg-light)', padding: '2px 6px', borderRadius: 4, fontFamily: 'var(--font-mono)', fontSize: '0.9em' }}>SNOWFLAKE_DEPLOYMENT</code>{' '}
          for Dropbox's production account.
        </p>
      </div>

      <div className="card">
        <h2 style={{ marginBottom: 12 }}>Prerequisites</h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: 8, fontSize: '0.9rem' }}>
          Check off each item as you confirm it. This checklist is for your reference — it won't block your progress.
        </p>
        <Checklist items={prerequisites} />
      </div>

      <Navigation />
    </div>
  );
}
