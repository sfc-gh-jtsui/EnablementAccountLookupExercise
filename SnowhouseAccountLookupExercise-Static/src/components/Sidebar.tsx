import { useExercise } from '../context/ExerciseContext';

const chapters = [
  'Objective & Background',
  'Scenario Context',
  'Step 1: Verify Your Connection',
  'Step 2: Query Snowhouse',
  'Step 3: Refine Your Query',
  'Step 4: Interpret Results',
  'Step 5: Query Cortex Code',
  'Summary',
];

export default function Sidebar() {
  const { currentPage, completedPages, setCurrentPage } = useExercise();

  return (
    <div className="sidebar" style={{ padding: '24px 0' }}>
      <div style={{ padding: '0 20px 20px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        <img src={`${import.meta.env.BASE_URL}images/snowyhousechimney.png`} alt="Snowhouse" style={{ width: 40, height: 40, marginBottom: 4 }} />
        <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'rgba(255,255,255,0.5)', marginBottom: 4 }}>
          Activity Guide
        </div>
        <div style={{ fontSize: '1.1rem', fontWeight: 600 }}>
          Snowhouse Exercise
        </div>
      </div>
      <nav style={{ padding: '12px 0' }}>
        {chapters.map((title, i) => {
          const page = i + 1;
          const isCurrent = page === currentPage;
          const isCompleted = completedPages.has(page);
          return (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                width: '100%',
                padding: '10px 20px',
                border: 'none',
                background: isCurrent ? 'rgba(0,161,217,0.15)' : 'transparent',
                color: 'var(--white)',
                cursor: 'pointer',
                textAlign: 'left',
                fontSize: '0.85rem',
                transition: 'background 0.15s',
              }}
              onMouseEnter={e => { if (!isCurrent) (e.currentTarget.style.background = 'rgba(255,255,255,0.05)'); }}
              onMouseLeave={e => { if (!isCurrent) (e.currentTarget.style.background = 'transparent'); }}
            >
              <span
                style={{
                  width: 22,
                  height: 22,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.7rem',
                  fontWeight: 600,
                  flexShrink: 0,
                  border: isCompleted || isCurrent ? 'none' : '2px solid rgba(255,255,255,0.3)',
                  background: isCompleted ? 'var(--success-green)' : isCurrent ? 'var(--primary-blue)' : 'transparent',
                  color: 'var(--white)',
                }}
              >
                {isCompleted ? '✓' : page}
              </span>
              <span style={{ opacity: isCurrent ? 1 : 0.8 }}>{title}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
