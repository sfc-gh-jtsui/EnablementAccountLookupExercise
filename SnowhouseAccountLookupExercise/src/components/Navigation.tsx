import { useExercise, TOTAL_PAGES } from '../context/ExerciseContext';

interface Props {
  onComplete?: () => void;
}

export default function Navigation({ onComplete }: Props) {
  const { currentPage, setCurrentPage, markPageCompleted } = useExercise();

  const handleBack = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleContinue = () => {
    markPageCompleted(currentPage);
    if (currentPage < TOTAL_PAGES) setCurrentPage(currentPage + 1);
  };

  const handleComplete = () => {
    markPageCompleted(currentPage);
    onComplete?.();
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      paddingTop: 32,
      marginTop: 32,
      borderTop: '1px solid var(--border-gray)',
    }}>
      <button
        className="btn-secondary"
        onClick={handleBack}
        disabled={currentPage === 1}
        style={{ opacity: currentPage === 1 ? 0.4 : 1 }}
      >
        ← Back
      </button>
      {currentPage < TOTAL_PAGES ? (
        <button className="btn-primary" onClick={handleContinue}>
          Continue →
        </button>
      ) : (
        <button
          className="btn-primary"
          onClick={handleComplete}
          style={{ background: 'var(--success-green)' }}
        >
          ✓ Complete!
        </button>
      )}
    </div>
  );
}
