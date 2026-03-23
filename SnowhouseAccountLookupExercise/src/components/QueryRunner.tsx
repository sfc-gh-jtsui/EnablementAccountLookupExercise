import { useState } from 'react';
import { useExercise } from '../context/ExerciseContext';
import ResultsTable from './ResultsTable';

interface Props {
  queryId: string;
  buttonText?: string;
  onResults?: (data: { columns: string[]; rows: (string | number | null)[][] }) => void;
}

export default function QueryRunner({ queryId, buttonText = 'Run Query', onResults }: Props) {
  const { queryResults, setQueryResults } = useExercise();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const cached = queryResults[queryId] as unknown as { columns: string[]; rows: (string | number | null)[][] } | undefined;

  const runQuery = async () => {
    setLoading(true);
    setError(null);
    try {
      // Simulate a brief network delay for realism
      await new Promise((resolve) => setTimeout(resolve, 500));
      const res = await fetch(`${import.meta.env.BASE_URL}data/${queryId}.json`);
      if (!res.ok) {
        throw new Error(`Failed to load query results (HTTP ${res.status})`);
      }
      const data = await res.json();
      setQueryResults(queryId, data);
      onResults?.(data);
    } catch (err: any) {
      setError(err.message || 'Failed to execute query');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ margin: '16px 0' }}>
      <button
        className="btn-primary"
        onClick={runQuery}
        disabled={loading}
        style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}
      >
        {loading ? (
          <>
            <span style={{
              display: 'inline-block',
              width: 14,
              height: 14,
              border: '2px solid rgba(255,255,255,0.3)',
              borderTopColor: 'white',
              borderRadius: '50%',
              animation: 'spin 0.6s linear infinite',
            }} />
            Executing...
          </>
        ) : (
          <>
            {cached ? '↻ Re-run Query' : `▶ ${buttonText}`}
          </>
        )}
      </button>

      {error && (
        <div className="feedback-error" style={{ marginTop: 12, fontSize: '0.9rem' }}>
          Error: {error}
        </div>
      )}

      {cached && (
        <div className="fade-in">
          <ResultsTable columns={cached.columns} rows={cached.rows} />
        </div>
      )}

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
