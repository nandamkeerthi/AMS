import { useMemo, useState } from 'react';
import styles from './LogsViewer.module.css';

const LEVELS = ['ALL', 'ERROR', 'WARN', 'INFO', 'DEBUG'];

function getLevelClass(level) {
  const map = {
    ERROR: styles.error,
    WARN: styles.warn,
    INFO: styles.info,
    DEBUG: styles.debug,
  };
  return map[level] || styles.info;
}

function formatLogTime(iso) {
  return new Date(iso).toISOString().replace('T', ' ').slice(0, 19);
}

function LogsViewer({ logs = [] }) {
  const [levelFilter, setLevelFilter] = useState('ALL');

  const filtered = useMemo(() => {
    if (levelFilter === 'ALL') return logs;
    return logs.filter((log) => log.level === levelFilter);
  }, [logs, levelFilter]);

  return (
    <div className={styles.viewer}>
      <div className={styles.toolbar} role="toolbar" aria-label="Log level filters">
        {LEVELS.map((level) => (
          <button
            key={level}
            type="button"
            className={`${styles.filterChip} ${levelFilter === level ? styles.filterChipActive : ''}`}
            onClick={() => setLevelFilter(level)}
          >
            {level}
          </button>
        ))}
      </div>
      <div className={styles.logList} role="log" aria-label="Incident logs">
        {filtered.length === 0 ? (
          <p className={styles.empty}>No logs match the selected filter.</p>
        ) : (
          filtered.map((log) => (
            <div key={log.id} className={styles.logEntry}>
              <span className={styles.timestamp}>{formatLogTime(log.timestamp)}</span>
              <span className={`${styles.level} ${getLevelClass(log.level)}`}>
                {log.level}
              </span>
              <span className={styles.source}>{log.source}</span>
              <span className={styles.message}>{log.message}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default LogsViewer;
