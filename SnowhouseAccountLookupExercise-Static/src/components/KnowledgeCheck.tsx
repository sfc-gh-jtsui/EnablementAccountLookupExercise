import { useState } from 'react';
import { useExercise } from '../context/ExerciseContext';

interface Props {
  id: string;
  question: string;
  mode: 'text' | 'radio';
  correctAnswer: string;
  options?: string[];
  hint?: string;
  explanation?: string;
}

export default function KnowledgeCheck({ id, question, mode, correctAnswer, options, hint, explanation }: Props) {
  const { answers, setAnswer, completedChecks, markCheckCompleted } = useExercise();
  const [showHint, setShowHint] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [attempts, setAttempts] = useState(0);

  const isCompleted = completedChecks.has(id);
  const currentValue = answers[id] || '';

  const handleCheck = () => {
    const userVal = currentValue.trim().toLowerCase();
    const correct = correctAnswer.trim().toLowerCase();
    if (userVal === correct) {
      setIsCorrect(true);
      markCheckCompleted(id);
    } else {
      setIsCorrect(false);
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);
      if (newAttempts >= 3) {
        setShowAnswer(true);
      }
    }
  };

  if (isCompleted) {
    return (
      <div className="knowledge-check" style={{ margin: '20px 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
          <span style={{ color: 'var(--success-green)', fontSize: '1.2rem' }}>✓</span>
          <strong>Knowledge Check — Completed</strong>
        </div>
        <p style={{ color: 'var(--text-secondary)', marginBottom: 8 }}>{question}</p>
        <p><strong>Answer:</strong> {correctAnswer}</p>
        {explanation && <p style={{ color: 'var(--text-secondary)', marginTop: 8, fontSize: '0.9rem' }}>{explanation}</p>}
      </div>
    );
  }

  return (
    <div className="knowledge-check" style={{ margin: '20px 0' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
        <span style={{ color: 'var(--accent-purple)', fontSize: '1rem' }}>✎</span>
        <strong>Knowledge Check</strong>
      </div>
      <p style={{ marginBottom: 16 }}>{question}</p>

      {mode === 'text' ? (
        <input
          type="text"
          value={currentValue}
          onChange={e => setAnswer(id, e.target.value)}
          placeholder="Type your answer..."
          style={{
            width: '100%',
            padding: '10px 12px',
            border: '1px solid var(--border-gray)',
            borderRadius: 'var(--radius-sm)',
            fontSize: '0.9rem',
            fontFamily: 'var(--font-mono)',
            marginBottom: 12,
          }}
        />
      ) : (
        <div style={{ marginBottom: 12 }}>
          {options?.map((opt, i) => (
            <label
              key={i}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: '8px 12px',
                marginBottom: 4,
                borderRadius: 'var(--radius-sm)',
                cursor: 'pointer',
                background: currentValue === opt ? 'rgba(0,161,217,0.08)' : 'transparent',
                border: currentValue === opt ? '1px solid var(--primary-blue)' : '1px solid transparent',
              }}
            >
              <input
                type="radio"
                name={id}
                value={opt}
                checked={currentValue === opt}
                onChange={() => setAnswer(id, opt)}
                style={{ accentColor: 'var(--primary-blue)' }}
              />
              <span style={{ fontSize: '0.9rem' }}>{opt}</span>
            </label>
          ))}
        </div>
      )}

      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
        <button className="btn-primary" onClick={handleCheck} disabled={!currentValue}>
          Check Answer
        </button>
        {hint && (
          <button className="btn-secondary" onClick={() => setShowHint(!showHint)}>
            {showHint ? 'Hide Hint' : 'Show Hint'}
          </button>
        )}
        {attempts >= 2 && (
          <button className="btn-secondary" onClick={() => setShowAnswer(!showAnswer)}>
            {showAnswer ? 'Hide Answer' : 'Reveal Answer'}
          </button>
        )}
      </div>

      {isCorrect === true && (
        <div className="feedback-success" style={{ marginTop: 12, fontWeight: 500 }}>
          ✓ Correct!
        </div>
      )}
      {isCorrect === false && (
        <div className="feedback-error" style={{ marginTop: 12 }}>
          Not quite — try again!
        </div>
      )}

      {hint && (
        <div className={`hint-box ${showHint ? 'visible' : ''}`} style={{ marginTop: 12 }}>
          <strong>Hint:</strong> {hint}
        </div>
      )}

      {showAnswer && (
        <div className={`answer-box visible`} style={{ marginTop: 12 }}>
          <strong>Answer:</strong> {correctAnswer}
          {explanation && <p style={{ marginTop: 4, fontSize: '0.9rem' }}>{explanation}</p>}
        </div>
      )}
    </div>
  );
}
