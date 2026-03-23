import { useExercise } from '../context/ExerciseContext';

interface Props {
  items: { id: string; label: string }[];
}

export default function Checklist({ items }: Props) {
  const { checklist, toggleChecklistItem } = useExercise();

  const completed = items.filter(item => checklist[item.id]).length;

  return (
    <div style={{ margin: '16px 0' }}>
      <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: 8 }}>
        {completed} of {items.length} completed
      </div>
      {items.map(item => (
        <div className="checklist-item" key={item.id}>
          <input
            type="checkbox"
            id={item.id}
            checked={!!checklist[item.id]}
            onChange={() => toggleChecklistItem(item.id)}
          />
          <label
            htmlFor={item.id}
            style={{
              fontSize: '0.9rem',
              textDecoration: checklist[item.id] ? 'line-through' : 'none',
              color: checklist[item.id] ? 'var(--text-secondary)' : 'inherit',
              cursor: 'pointer',
            }}
          >
            {item.label}
          </label>
        </div>
      ))}
    </div>
  );
}
