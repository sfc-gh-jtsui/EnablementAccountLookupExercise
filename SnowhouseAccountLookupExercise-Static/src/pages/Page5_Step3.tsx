import Navigation from '../components/Navigation';
import SqlCodeBlock from '../components/SqlCodeBlock';
import QueryRunner from '../components/QueryRunner';
import KnowledgeCheck from '../components/KnowledgeCheck';
import { useExercise } from '../context/ExerciseContext';

const REFINED_SQL = `SELECT SNOWFLAKE_ACCOUNT_ID, SNOWFLAKE_DEPLOYMENT, *
FROM FINANCE.CUSTOMER.SALESFORCE_SNOWFLAKE_MAPPING
WHERE 1=1
  AND (SALESFORCE_ACCOUNT_NAME ILIKE '%Dropbox%'
       OR SNOWFLAKE_ACCOUNT_NAME ILIKE '%Dropbox%')
  AND ORGANIZATION_NAME IS NOT NULL
ORDER BY SNOWFLAKE_ACCOUNT_NAME;`;

const QUERY_WITH_BLANK = `SELECT SNOWFLAKE_ACCOUNT_ID, SNOWFLAKE_DEPLOYMENT, *
FROM FINANCE.CUSTOMER.SALESFORCE_SNOWFLAKE_MAPPING
WHERE 1=1
  AND (SALESFORCE_ACCOUNT_NAME ILIKE '%Dropbox%'
       OR SNOWFLAKE_ACCOUNT_NAME ILIKE '%Dropbox%')
  ______________________________
ORDER BY SNOWFLAKE_ACCOUNT_NAME;`;

export default function Page5_Step3() {
  const { completedChecks } = useExercise();
  const isCheckDone = completedChecks.has('refine-query');

  return (
    <div className="page-content fade-in">
      <h1 style={{ marginBottom: 8 }}>Step 3: Refine Your Query</h1>
      <p style={{ color: 'var(--text-secondary)', marginBottom: 24 }}>
        Filter out incomplete records to narrow down the results.
      </p>

      <div className="card" style={{ marginBottom: 24 }}>
        <h3 style={{ marginBottom: 12 }}>Analyzing the Initial Results</h3>
        <p style={{ marginBottom: 12 }}>
          In your initial results, you found many account entries. Some of these may be trial accounts,
          test accounts, etc. To refine this list, notice where:
        </p>
        <ul style={{ paddingLeft: 24, marginBottom: 16 }}>
          <li style={{ marginBottom: 8 }}>
            Essential data is <strong>missing</strong>, such as <code style={{ background: 'var(--bg-light)', padding: '2px 6px', borderRadius: 4, fontFamily: 'var(--font-mono)', fontSize: '0.9em' }}>ORGANIZATION_NAME</code>
          </li>
          <li>
            Field values indicate it is <strong>not a primary account</strong>, such as
            "Walmart - Parent (No Opps or UCs here, parent account only)" or "Walmart Labs India"
          </li>
        </ul>
      </div>

      <div className="card" style={{ marginBottom: 24, background: 'var(--bg-light)' }}>
        <h4 style={{ marginBottom: 8, color: 'var(--text-secondary)' }}>Reference: Query with missing clause</h4>
        <pre style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.85rem',
          lineHeight: 1.6,
          whiteSpace: 'pre-wrap',
          margin: 0,
          color: 'var(--navy)',
        }}>{QUERY_WITH_BLANK}</pre>
      </div>

      <KnowledgeCheck
        id="refine-query"
        question="What AND clause should you add to exclude records with NULL values in ORGANIZATION_NAME?"
        mode="text"
        correctAnswer="AND ORGANIZATION_NAME IS NOT NULL"
        hint="You need an AND clause that filters out rows where ORGANIZATION_NAME has no value."
        explanation="Adding AND ORGANIZATION_NAME IS NOT NULL removes rows where this essential field is missing, helping narrow down to real, active accounts."
      />

      <div style={{ marginTop: 24, marginBottom: 24, position: 'relative' }}>
        {!isCheckDone && (
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 2,
            borderRadius: 'var(--radius-md)',
            background: 'rgba(255,255,255,0.1)',
          }}>
            <span style={{
              padding: '8px 20px',
              background: 'var(--navy)',
              color: 'var(--white)',
              borderRadius: 'var(--radius-sm)',
              fontSize: '0.85rem',
              fontWeight: 500,
            }}>
              Complete the Knowledge Check to reveal
            </span>
          </div>
        )}
        <div
          className="card"
          style={{
            filter: isCheckDone ? 'none' : 'blur(6px)',
            transition: 'filter 0.4s ease',
            userSelect: isCheckDone ? 'auto' : 'none',
            pointerEvents: isCheckDone ? 'auto' : 'none',
          }}
        >
          <h3 style={{ marginBottom: 12 }}>Refined Query</h3>
          <p style={{ marginBottom: 16 }}>
            Here's the updated query with the filter applied. Run it to see the reduced results.
          </p>
          <SqlCodeBlock title="Refined Dropbox Query" sql={REFINED_SQL} />
          <QueryRunner queryId="dropbox-refined" buttonText="Run Refined Query" />
        </div>
      </div>

      <Navigation />
    </div>
  );
}
