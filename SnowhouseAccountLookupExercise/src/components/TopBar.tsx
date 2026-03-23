import { useExercise, TOTAL_PAGES } from '../context/ExerciseContext';

export default function TopBar() {
  const { currentPage, completedPages } = useExercise();
  const progress = (completedPages.size / TOTAL_PAGES) * 100;

  return (
    <div className="topbar" style={{ flexDirection: 'column', justifyContent: 'center', gap: 0 }}>
      <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontWeight: 600, color: 'var(--navy)', fontSize: '0.9rem' }}>
          Snowhouse Exercise
        </span>
        <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
          Page {currentPage} of {TOTAL_PAGES}
        </span>
      </div>
      <div className="progress-bar" style={{ marginTop: 4 }}>
        <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
}
