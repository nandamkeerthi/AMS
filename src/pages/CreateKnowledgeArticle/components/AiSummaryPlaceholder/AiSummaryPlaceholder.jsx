import { FiCpu } from 'react-icons/fi';
import { GlassCard } from '@/components/common';
import styles from './AiSummaryPlaceholder.module.css';

function AiSummaryPlaceholder({ aiSummary }) {
  if (!aiSummary) return null;

  return (
    <GlassCard title="AI Summary" subtitle="Generated on publish" variant="solid" className={styles.panel}>
      <div className={styles.header}>
        <div className={styles.iconWrap} aria-hidden="true">
          <FiCpu size={18} />
        </div>
        <span className={styles.status}>Pending generation</span>
      </div>
      <p className={styles.summary}>{aiSummary.summary}</p>
      {aiSummary.keyPoints?.length > 0 && (
        <ul className={styles.keyPoints}>
          {aiSummary.keyPoints.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
      )}
    </GlassCard>
  );
}

export default AiSummaryPlaceholder;
