import Navigation from '../components/Navigation';
import SqlCodeBlock from '../components/SqlCodeBlock';
import QueryRunner from '../components/QueryRunner';

function LaunchSnowhouseButton() {
  const handleLaunch = () => {
    window.open('https://SFCOGSOPS-SNOWHOUSE_AWS_US_WEST_2.snowflakecomputing.com', '_blank');
  };

  return (
    <div className="card" style={{ marginBottom: 24, borderColor: 'var(--primary-blue)', borderLeftWidth: 3 }}>
      <h3 style={{ marginBottom: 8 }}>Launch Snowhouse</h3>
      <p style={{ marginBottom: 12, fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
        Click below to launch Snowhouse in a separate window. Run the exercise queries in the live environment to follow along with the exercise steps.
      </p>
      <button
        className="btn-primary"
        onClick={handleLaunch}
      >
        🔗 Launch Snowhouse
      </button>
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

      <LaunchSnowhouseButton />

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
