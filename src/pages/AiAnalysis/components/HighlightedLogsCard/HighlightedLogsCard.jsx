import { FiFileText } from 'react-icons/fi';
import SectionCard from '../SectionCard';
import styles from './HighlightedLogsCard.module.css';

const LEVEL_CLASS = {
  ERROR: styles.levelError,
  WARN: styles.levelWarn,
  INFO: styles.levelInfo,
  DEBUG: styles.levelDebug,
};

function HighlightedLogsCard({ logLines = [] }) {
  return (
    <SectionCard
      title="Highlighted Log Lines"
      subtitle="Evidence supporting the root cause analysis"
      icon={FiFileText}
      accent="error"
      className={styles.card}
      noPadding
    >
      <ul className={styles.list}>
        {logLines.map((line) => (
          <li key={line.id} className={styles.item}>
            <div className={styles.meta}>
              <span className={styles.lineNumber}>L{line.lineNumber}</span>
              <span className={`${styles.level} ${LEVEL_CLASS[line.level] || ''}`}>
                {line.level}
              </span>
              <span className={styles.source}>[{line.source}]</span>
            </div>
            <code className={styles.logText}>{line.text}</code>
            <p className={styles.reason}>
              <span className={styles.reasonLabel}>Why highlighted:</span>
              {line.reason}
            </p>
          </li>
        ))}
      </ul>
    </SectionCard>
  );
}

export default HighlightedLogsCard;
