import Navigation from '../components/Navigation';

export default function Page1_Objective() {
  return (
    <div className="page-content fade-in">
      <h1 style={{ marginBottom: 8 }}>Snowhouse Account Lookup Exercise</h1>
      <p style={{ color: 'var(--text-secondary)', marginBottom: 32, fontSize: '1.05rem' }}>
        Practice finding customer account IDs in Snowhouse
      </p>

      <div className="card" style={{ marginBottom: 24 }}>
        <h2 style={{ marginBottom: 12 }}>Objective</h2>
        <p>
          Practice how to find a desired customer account ID in Snowhouse using SQL queries
          and logical deduction, then search for a customer account ID using the{' '}
          <code style={{ background: 'var(--bg-light)', padding: '2px 6px', borderRadius: 4, fontFamily: 'var(--font-mono)', fontSize: '0.9em' }}>
            account_finder
          </code>{' '}
          Cortex Code skill.
        </p>
      </div>

      <div className="card">
        <h2 style={{ marginBottom: 12 }}>Background</h2>
        <p style={{ marginBottom: 16 }}>
          <strong>Snowhouse</strong> is a Snowflake account that aggregates usage data, consumption data, and
          metadata by-and-from all Snowflake customer accounts. It is used by Services Delivery,
          Engineering, and Data Science teams to understand customer usage.
        </p>
        <p style={{ marginBottom: 16 }}>
          Included in Snowhouse is customer account setup metadata, business systems data, and
          Eng-Prod system data.
        </p>
        <p>
          The <strong>customer account ID</strong> is a key identifier when querying the{' '}
          <code style={{ background: 'var(--bg-light)', padding: '2px 6px', borderRadius: 4, fontFamily: 'var(--font-mono)', fontSize: '0.9em' }}>
            PST.SVCS
          </code>{' '}
          schema as well as the{' '}
          <code style={{ background: 'var(--bg-light)', padding: '2px 6px', borderRadius: 4, fontFamily: 'var(--font-mono)', fontSize: '0.9em' }}>
            SNOWHOUSE_IMPORT
          </code>{' '}
          database. If you only know the customer's business name, you can query Snowhouse to find
          the account ID of the particular account you are working on — then use that account ID to
          get valuable information to service the customer.
        </p>
      </div>

      <Navigation />
    </div>
  );
}
