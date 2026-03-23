const SQL_KEYWORDS = [
  'SELECT', 'FROM', 'WHERE', 'AND', 'OR', 'ORDER BY',
  'ILIKE', 'AS', 'IS', 'NOT', 'NULL', 'LIKE', 'IN',
  'JOIN', 'ON', 'GROUP BY', 'HAVING', 'LIMIT', 'DISTINCT',
];

function highlightSql(sql: string): string {
  let result = sql
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  // Highlight string literals first
  result = result.replace(/'[^']*'/g, match => `<span style="color:#98C379">${match}</span>`);

  // Highlight keywords (whole word, case insensitive)
  for (const kw of SQL_KEYWORDS) {
    const escaped = kw.replace(/\s+/g, '\\s+');
    const regex = new RegExp(`\\b(${escaped})\\b`, 'gi');
    result = result.replace(regex, '<span class="sql-keyword">$1</span>');
  }

  // Highlight comments
  result = result.replace(/--.*/g, match => `<span style="color:var(--text-secondary)">${match}</span>`);

  return result;
}

interface Props {
  sql: string;
  title?: string;
}

export default function SqlCodeBlock({ sql, title }: Props) {
  return (
    <div style={{ margin: '16px 0' }}>
      {title && (
        <div style={{
          fontSize: '0.75rem',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          color: 'var(--text-secondary)',
          marginBottom: 6,
          fontWeight: 600,
        }}>
          {title}
        </div>
      )}
      <pre className="code-block">
        <code dangerouslySetInnerHTML={{ __html: highlightSql(sql) }} />
      </pre>
    </div>
  );
}
