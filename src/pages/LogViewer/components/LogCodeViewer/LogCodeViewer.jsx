import { useEffect, useMemo, useRef } from 'react';
import styles from './LogCodeViewer.module.css';

const LEVEL_CLASS = {
  ERROR: styles.levelError,
  WARN: styles.levelWarn,
  INFO: styles.levelInfo,
  DEBUG: styles.levelDebug,
};

function HighlightText({ text, search }) {
  const query = search.trim();

  if (!query) {
    return text;
  }

  const lowerText = text.toLowerCase();
  const lowerQuery = query.toLowerCase();
  const parts = [];
  let start = 0;
  let index = lowerText.indexOf(lowerQuery, start);
  let key = 0;

  while (index !== -1) {
    if (index > start) {
      parts.push(text.slice(start, index));
    }
    parts.push(
      <mark key={key} className={styles.highlight}>
        {text.slice(index, index + query.length)}
      </mark>
    );
    key += 1;
    start = index + query.length;
    index = lowerText.indexOf(lowerQuery, start);
  }

  if (start < text.length) {
    parts.push(text.slice(start));
  }

  return parts;
}

function formatDisplayTimestamp(iso) {
  const date = new Date(iso);
  const base = date.toISOString().replace('T', ' ').slice(0, 19);
  const ms = String(date.getUTCMilliseconds()).padStart(3, '0');
  return `${base}.${ms}`;
}

function LogLine({ line, search }) {
  const levelClass = LEVEL_CLASS[line.level] || styles.levelInfo;

  return (
    <div className={styles.line} data-line={line.lineNumber}>
      <span className={styles.lineNumber} aria-hidden="true">
        {line.lineNumber}
      </span>
      <code className={styles.lineContent}>
        <span className={styles.timestamp}>
          <HighlightText text={formatDisplayTimestamp(line.timestamp)} search={search} />
        </span>
        {'  '}
        <span className={`${styles.levelToken} ${levelClass}`}>
          <HighlightText text={line.level.padEnd(5, ' ')} search={search} />
        </span>
        {'  '}
        <span className={styles.source}>
          <HighlightText text={`[${line.source}]`} search={search} />
        </span>
        {'  '}
        <span className={styles.message}>
          <HighlightText text={line.message} search={search} />
        </span>
      </code>
    </div>
  );
}

function LogCodeViewer({ lines = [], search = '', emptyMessage = 'No log lines match the current filter.' }) {
  const containerRef = useRef(null);
  const firstMatchRef = useRef(null);

  const firstMatchLineNumber = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return null;

    const match = lines.find((line) => line.text.toLowerCase().includes(query));
    return match?.lineNumber ?? null;
  }, [lines, search]);

  useEffect(() => {
    firstMatchRef.current = firstMatchLineNumber;
  }, [firstMatchLineNumber]);

  useEffect(() => {
    if (!firstMatchLineNumber || !containerRef.current) return;

    const target = containerRef.current.querySelector(
      `[data-line="${firstMatchLineNumber}"]`
    );

    target?.scrollIntoView({ block: 'center', behavior: 'smooth' });
  }, [firstMatchLineNumber, lines.length]);

  return (
    <div className={styles.viewer} ref={containerRef} role="region" aria-label="Log content">
      {lines.length === 0 ? (
        <p className={styles.empty}>{emptyMessage}</p>
      ) : (
        <div className={styles.codeBlock}>
          {lines.map((line) => (
            <LogLine key={line.id} line={line} search={search} />
          ))}
        </div>
      )}
    </div>
  );
}

export default LogCodeViewer;
