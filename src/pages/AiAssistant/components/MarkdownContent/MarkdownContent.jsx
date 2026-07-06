import styles from './MarkdownContent.module.css';

function renderInline(text) {
  const parts = [];
  const regex = /(\*\*[^*]+\*\*|`[^`]+`)/g;
  let lastIndex = 0;
  let match = regex.exec(text);

  while (match) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    const token = match[0];
    if (token.startsWith('**')) {
      parts.push(<strong key={match.index}>{token.slice(2, -2)}</strong>);
    } else if (token.startsWith('`')) {
      parts.push(<code key={match.index} className={styles.inlineCode}>{token.slice(1, -1)}</code>);
    }
    lastIndex = match.index + token.length;
    match = regex.exec(text);
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts.length ? parts : text;
}

function MarkdownContent({ content = '' }) {
  const blocks = content.split('\n\n');

  return (
    <div className={styles.markdown}>
      {blocks.map((block, blockIndex) => {
        const trimmed = block.trim();
        if (!trimmed) return null;

        if (trimmed.startsWith('```')) {
          const lines = trimmed.split('\n');
          const code = lines.slice(1, lines[lines.length - 1] === '```' ? -1 : undefined).join('\n');
          return (
            <pre key={blockIndex} className={styles.codeBlock}>
              <code>{code}</code>
            </pre>
          );
        }

        if (trimmed.startsWith('## ')) {
          return (
            <h3 key={blockIndex} className={styles.heading}>
              {renderInline(trimmed.slice(3))}
            </h3>
          );
        }

        if (trimmed.startsWith('### ')) {
          return (
            <h4 key={blockIndex} className={styles.subheading}>
              {renderInline(trimmed.slice(4))}
            </h4>
          );
        }

        if (trimmed.includes('\n|')) {
          const rows = trimmed.split('\n').filter((row) => row.trim() && !row.includes('---'));
          return (
            <div key={blockIndex} className={styles.tableWrap}>
              <table className={styles.table}>
                <tbody>
                  {rows.map((row) => {
                    const cells = row.split('|').filter(Boolean).map((c) => c.trim());
                    const isHeader = row === rows[0];
                    return (
                      <tr key={row}>
                        {cells.map((cell) => (
                          isHeader ? (
                            <th key={cell}>{renderInline(cell)}</th>
                          ) : (
                            <td key={cell}>{renderInline(cell)}</td>
                          )
                        ))}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          );
        }

        const lines = trimmed.split('\n');
        const isBulletList = lines.every((line) => line.match(/^[-*]\s/) || line.match(/^-\s\[[ x]\]/));
        const isNumberedList = lines.every((line) => line.match(/^\d+\.\s/));

        if (isBulletList) {
          return (
            <ul key={blockIndex} className={styles.list}>
              {lines.map((line) => (
                <li key={line}>{renderInline(line.replace(/^[-*]\s(\[[ x]\]\s)?/, ''))}</li>
              ))}
            </ul>
          );
        }

        if (isNumberedList) {
          return (
            <ol key={blockIndex} className={styles.list}>
              {lines.map((line) => (
                <li key={line}>{renderInline(line.replace(/^\d+\.\s/, ''))}</li>
              ))}
            </ol>
          );
        }

        return (
          <p key={blockIndex} className={styles.paragraph}>
            {renderInline(trimmed)}
          </p>
        );
      })}
    </div>
  );
}

export default MarkdownContent;
