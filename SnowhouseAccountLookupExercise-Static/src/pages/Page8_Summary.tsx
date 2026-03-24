import { useState } from 'react';
import Navigation from '../components/Navigation';

function Confetti() {
  const colors = ['#29B5E8', '#FF6B35', '#22C55E', '#F59E0B', '#8B5CF6', '#EC4899'];
  const pieces = Array.from({ length: 80 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 2,
    duration: 2 + Math.random() * 2,
    color: colors[i % colors.length],
    size: 6 + Math.random() * 6,
    rotation: Math.random() * 360,
  }));

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      pointerEvents: 'none',
      zIndex: 1000,
      overflow: 'hidden',
    }}>
      {pieces.map(p => (
        <div
          key={p.id}
          style={{
            position: 'absolute',
            left: `${p.left}%`,
            top: -20,
            width: p.size,
            height: p.size * 0.6,
            background: p.color,
            borderRadius: 2,
            transform: `rotate(${p.rotation}deg)`,
            animation: `confetti-fall ${p.duration}s ease-in ${p.delay}s forwards`,
          }}
        />
      ))}
      <style>{`
        @keyframes confetti-fall {
          0% { top: -20px; opacity: 1; transform: rotate(0deg) translateX(0); }
          100% { top: 110vh; opacity: 0; transform: rotate(720deg) translateX(${Math.random() > 0.5 ? '' : '-'}80px); }
        }
      `}</style>
    </div>
  );
}

export default function Page8_Summary() {
  const [showCelebration, setShowCelebration] = useState(false);

  return (
    <div className="page-content fade-in">
      {showCelebration && <Confetti />}

      {showCelebration && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 'var(--sidebar-width)',
          right: 0,
          zIndex: 999,
          background: 'linear-gradient(135deg, #22C55E, #29B5E8)',
          color: 'white',
          textAlign: 'center',
          padding: '16px 24px',
          fontSize: '1.3rem',
          fontWeight: 700,
          letterSpacing: '0.02em',
          animation: 'banner-in 0.5s ease-out',
        }}>
          🎉 Congratulations! You've completed the exercise! 🎉
          <style>{`
            @keyframes banner-in {
              0% { transform: translateY(-100%); opacity: 0; }
              100% { transform: translateY(0); opacity: 1; }
            }
          `}</style>
        </div>
      )}

      <h1 style={{ marginBottom: 8 }}>Exercise Summary</h1>
      <p style={{ color: 'var(--text-secondary)', marginBottom: 24 }}>
        Review what you've learned in this exercise.
      </p>

      <div className="card" style={{ marginBottom: 24 }}>
        <h2 style={{ marginBottom: 16 }}>Two Methods, One Answer</h2>
        <p style={{ marginBottom: 16 }}>
          You have followed two separate methods to check Snowhouse for important customer account
          information:
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
          <div style={{ padding: 16, background: 'var(--bg-light)', borderRadius: 'var(--radius-sm)' }}>
            <h4 style={{ marginBottom: 8 }}>Method 1: SQL Queries</h4>
            <ul style={{ paddingLeft: 16, fontSize: '0.9rem' }}>
              <li style={{ marginBottom: 4 }}>Searched the mapping table</li>
              <li style={{ marginBottom: 4 }}>Refined with filters</li>
              <li style={{ marginBottom: 4 }}>Applied logical deduction</li>
              <li>Found the production account</li>
            </ul>
          </div>
          <div style={{ padding: 16, background: 'var(--bg-light)', borderRadius: 'var(--radius-sm)' }}>
            <h4 style={{ marginBottom: 8 }}>Method 2: Cortex Code</h4>
            <ul style={{ paddingLeft: 16, fontSize: '0.9rem' }}>
              <li style={{ marginBottom: 4 }}>Used /account_finder skill</li>
              <li style={{ marginBottom: 4 }}>Got results in one step</li>
              <li style={{ marginBottom: 4 }}>Faster for simple lookups</li>
              <li>May need SQL fallback for complex cases</li>
            </ul>
          </div>
        </div>
        <p>
          While the Cortex Code method took fewer steps, it may not always yield the desired
          result immediately — especially in complex customer scenarios. In those cases, it is
          still important to know how to use SQL queries and interpret Snowhouse data to achieve
          your results.
        </p>
      </div>

      <div className="card" style={{ background: 'rgba(34,197,94,0.04)', borderColor: 'var(--success-green)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
          <span style={{ fontSize: '1.5rem' }}>🎓</span>
          <h2 style={{ margin: 0 }}>Exercise Complete</h2>
        </div>
        <p>
          You now know how to use both SQL queries and Cortex Code to find customer account
          information in Snowhouse. These skills will help you efficiently service customer
          accounts.
        </p>
      </div>

      <Navigation onComplete={() => setShowCelebration(true)} />
    </div>
  );
}
