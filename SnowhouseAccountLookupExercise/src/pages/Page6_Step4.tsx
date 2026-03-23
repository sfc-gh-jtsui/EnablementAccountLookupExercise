import Navigation from '../components/Navigation';
import KnowledgeCheck from '../components/KnowledgeCheck';
import { useExercise } from '../context/ExerciseContext';
import ResultsTable from '../components/ResultsTable';

export default function Page6_Step4() {
  const { completedChecks, queryResults } = useExercise();
  const bothChecked = completedChecks.has('env-column') && completedChecks.has('prod-account');

  const refinedResults = queryResults['dropbox-refined'] as
    | { columns: string[]; rows: (string | number | null)[][] }
    | undefined;

  return (
    <div className="page-content fade-in">
      <h1 style={{ marginBottom: 8 }}>Step 4: Interpret Results</h1>
      <p style={{ color: 'var(--text-secondary)', marginBottom: 24 }}>
        Scan the refined results to find Dropbox's production account.
      </p>

      <div className="card" style={{ marginBottom: 24 }}>
        <h3 style={{ marginBottom: 12 }}>Examine the Results</h3>
        <p>
          In the reduced list from Step 3, scan the results to look for indicators of the
          production account. Think about which columns contain environment information.
        </p>
      </div>

      {refinedResults ? (
        <div className="card" style={{ marginBottom: 24, background: 'var(--bg-light)' }}>
          <h4 style={{ marginBottom: 12, color: 'var(--text-secondary)' }}>Reference: Refined Query Results from Step 3</h4>
          <div style={{ overflowX: 'auto' }}>
            <ResultsTable columns={refinedResults.columns} rows={refinedResults.rows} />
          </div>
        </div>
      ) : (
        <div className="card" style={{ marginBottom: 24, background: 'var(--bg-light)', borderStyle: 'dashed' }}>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0 }}>
            No refined query results yet. Go back to Step 3 and run the refined query first.
          </p>
        </div>
      )}

      <KnowledgeCheck
        id="env-column"
        question="Which column contains information that may indicate the environment (production, dev, test)?"
        mode="radio"
        options={[
          'SNOWFLAKE_DEPLOYMENT',
          'ORGANIZATION_NAME',
          'SNOWFLAKE_ACCOUNT_ID',
          'SNOWFLAKE_ACCOUNT_ALIAS',
        ]}
        correctAnswer="SNOWFLAKE_ACCOUNT_ALIAS"
        hint="Look for a column whose values include terms like 'PROD', 'DEV', or 'TEST'."
        explanation="SNOWFLAKE_ACCOUNT_ALIAS often contains environment indicators like PROD, DEV, or TEST."
      />

      <KnowledgeCheck
        id="prod-account"
        question="Select the production account from the options below:"
        mode="radio"
        options={[
          '6411651 | prod2 | YSA11027 | PROJECT_POLARIS_TEST',
          '6657 | aznortheurope | EO55901 | GI10312',
          '7013 | prod1 | DROPBOX | PROD',
          '8397 | prod1 | DROPBOXDEV | DEV',
        ]}
        correctAnswer="7013 | prod1 | DROPBOX | PROD"
        hint="Look for the account with alias 'PROD' and name 'DROPBOX' (not DROPBOXDEV)."
        explanation="Account ID 7013 on prod1 deployment with name DROPBOX and alias PROD is the production account."
      />

      <div style={{ marginTop: 24 }}>
        <div
          className="card"
          style={{
            filter: bothChecked ? 'none' : 'blur(8px)',
            transition: 'filter 0.4s ease',
            userSelect: bothChecked ? 'auto' : 'none',
            background: 'rgba(34,197,94,0.05)',
            borderColor: 'var(--success-green)',
          }}
        >
          <h3 style={{ marginBottom: 12, color: 'var(--success-green)' }}>
            Result
          </h3>
          <p style={{ marginBottom: 16 }}>
            You did it! You've found the Dropbox production account ID and deployment by querying
            Snowhouse and applying logical deduction.
          </p>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 16,
            padding: 16,
            background: 'var(--bg-light)',
            borderRadius: 'var(--radius-sm)',
          }}>
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: 4 }}>Account ID</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--navy)' }}>7013</div>
            </div>
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: 4 }}>Deployment</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--navy)' }}>prod1</div>
            </div>
          </div>
        </div>
      </div>

      <Navigation />
    </div>
  );
}
