import Navigation from '../components/Navigation';
import SqlCodeBlock from '../components/SqlCodeBlock';
import QueryRunner from '../components/QueryRunner';

const SEARCH_SQL = `SELECT SNOWFLAKE_ACCOUNT_ID, SNOWFLAKE_DEPLOYMENT, *
FROM FINANCE.CUSTOMER.SALESFORCE_SNOWFLAKE_MAPPING
WHERE 1=1
  AND (SALESFORCE_ACCOUNT_NAME ILIKE '%Dropbox%'
       OR SNOWFLAKE_ACCOUNT_NAME ILIKE '%Dropbox%')
ORDER BY SNOWFLAKE_ACCOUNT_NAME;`;

export default function Page4_Step2() {
  return (
    <div className="page-content fade-in">
      <h1 style={{ marginBottom: 8 }}>Step 2: Query Snowhouse</h1>
      <p style={{ color: 'var(--text-secondary)', marginBottom: 24 }}>
        Query the mapping table to find all Dropbox-related accounts.
      </p>

      <div className="card" style={{ marginBottom: 24 }}>
        <h3 style={{ marginBottom: 12 }}>Search for Dropbox</h3>
        <p style={{ marginBottom: 16 }}>
          The table <code style={{ background: 'var(--bg-light)', padding: '2px 6px', borderRadius: 4, fontFamily: 'var(--font-mono)', fontSize: '0.9em' }}>
            FINANCE.CUSTOMER.SALESFORCE_SNOWFLAKE_MAPPING
          </code>{' '}
          maps Salesforce account names to Snowflake account IDs and deployments.
          Let's search it for Dropbox.
        </p>
        <SqlCodeBlock title="Dropbox Search Query" sql={SEARCH_SQL} />
        <QueryRunner queryId="dropbox-search" buttonText="Run Search" />
      </div>

      <div className="card">
        <h3 style={{ marginBottom: 8 }}>Observe the Results</h3>
        <p>
          You'll notice the results contain <strong>many account entries</strong>. Some of these may be
          trial accounts, test accounts, or other non-production accounts. In the next step, we'll
          refine the query to narrow down the list.
        </p>
      </div>

      <Navigation />
    </div>
  );
}
