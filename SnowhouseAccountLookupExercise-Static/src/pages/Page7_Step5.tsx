import Navigation from '../components/Navigation';
import SqlCodeBlock from '../components/SqlCodeBlock';

export default function Page7_Step5() {
  return (
    <div className="page-content fade-in">
      <h1 style={{ marginBottom: 8 }}>Step 5: Query Cortex Code</h1>
      <p style={{ color: 'var(--text-secondary)', marginBottom: 24 }}>
        Try the faster method — use the account_finder skill.
      </p>

      <div className="card" style={{ marginBottom: 24 }}>
        <h3 style={{ marginBottom: 12 }}>The Cortex Code Approach</h3>
        <p style={{ marginBottom: 16 }}>
          Now let's try using <strong>Cortex Code</strong> to find Dropbox's Snowflake account ID
          and deployment. This is often faster for straightforward lookups.
        </p>
        <p style={{ marginBottom: 16 }}>
          On your computer, open Cortex Code in <strong>Snowflake CLI</strong> or <strong>SnowWork</strong>. Then use the{' '}
          <code style={{ background: 'var(--bg-light)', padding: '2px 6px', borderRadius: 4, fontFamily: 'var(--font-mono)', fontSize: '0.9em' }}>
            account_finder
          </code>{' '}
          skill to ask for Dropbox's account ID and deployment.
        </p>
        <SqlCodeBlock
          title="Cortex Code Command"
          sql="/account_finder Find the Snowflake Account ID and Deployment for Dropbox's production account"
        />
      </div>

      <div className="card" style={{ marginBottom: 24 }}>
        <h3 style={{ marginBottom: 12 }}>Expected Response</h3>
        <p style={{ marginBottom: 16 }}>
          Cortex Code should return a table like this:
        </p>
        <div style={{ overflowX: 'auto', borderRadius: 'var(--radius-sm)' }}>
          <table className="results-table">
            <thead>
              <tr>
                <th>Field</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Snowflake Account ID</strong></td>
                <td><code style={{ fontFamily: 'var(--font-mono)' }}>90210</code></td>
              </tr>
              <tr>
                <td><strong>Snowflake Deployment</strong></td>
                <td><code style={{ fontFamily: 'var(--font-mono)' }}>prod1</code></td>
              </tr>
              <tr>
                <td>Account Name</td>
                <td>—</td>
              </tr>
              <tr>
                <td>Alias</td>
                <td>PROD</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="card" style={{ background: 'rgba(0,161,217,0.04)', borderColor: 'var(--primary-blue)' }}>
        <h3 style={{ marginBottom: 8, color: 'var(--primary-blue)' }}>💡 Pro Tip</h3>
        <p>
          The Cortex Code method is faster for straightforward account lookups. However, it may
          not always yield the desired result immediately — especially in complex customer
          scenarios. That's why it's important to know the manual SQL approach too.
        </p>
      </div>

      <Navigation />
    </div>
  );
}
