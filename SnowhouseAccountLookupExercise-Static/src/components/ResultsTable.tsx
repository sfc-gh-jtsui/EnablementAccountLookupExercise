interface Props {
  columns: string[];
  rows: (string | number | null)[][];
}

export default function ResultsTable({ columns, rows }: Props) {
  if (!rows.length) {
    return <p style={{ color: 'var(--text-secondary)', fontStyle: 'italic' }}>No results returned.</p>;
  }

  return (
    <div style={{ margin: '16px 0' }}>
      <div style={{ overflowX: 'auto', borderRadius: 'var(--radius-sm)' }}>
        <table className="results-table">
          <thead>
            <tr>
              {columns.map((col, i) => (
                <th key={i}>{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, ri) => (
              <tr key={ri}>
                {row.map((cell, ci) => (
                  <td key={ci} style={{ whiteSpace: 'nowrap' }}>
                    {cell === null ? <span style={{ color: 'var(--text-secondary)' }}>NULL</span> : String(cell)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: 8 }}>
        {rows.length} row{rows.length !== 1 ? 's' : ''} returned
      </div>
    </div>
  );
}
