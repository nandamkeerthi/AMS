import { FiCpu } from 'react-icons/fi';
import styles from './AiAnalysisCard.module.css';

function AiAnalysisCard({ analysis }) {
  if (!analysis) return null;

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.icon} aria-hidden="true">
          <FiCpu size={20} />
        </div>
        <div>
          <h3 className={styles.title}>AI Analysis</h3>
          <span className={styles.confidence}>{analysis.confidence}% confidence</span>
        </div>
      </div>
      <p className={styles.summary}>{analysis.summary}</p>
      {analysis.findings?.length > 0 && (
        <>
          <h4 className={styles.sectionTitle}>Key findings</h4>
          <ul className={styles.list}>
            {analysis.findings.map((finding) => (
              <li key={finding}>{finding}</li>
            ))}
          </ul>
        </>
      )}
      {analysis.recommendedActions?.length > 0 && (
        <>
          <h4 className={styles.sectionTitle}>Recommended actions</h4>
          <ul className={styles.actions}>
            {analysis.recommendedActions.map((action) => (
              <li key={action} className={styles.actionItem}>{action}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default AiAnalysisCard;
