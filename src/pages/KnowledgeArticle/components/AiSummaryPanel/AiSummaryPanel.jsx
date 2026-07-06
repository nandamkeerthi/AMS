import { FiCpu } from 'react-icons/fi';
import { GlassCard } from '@/components/common';
import styles from './AiSummaryPanel.module.css';

function AiSummaryPanel({ aiSummary }) {
  if (!aiSummary) return null;

  return (
    <GlassCard title="AI Summary" variant="solid" className={styles.panel}>
      <div className={styles.header}>
        <div className={styles.iconWrap} aria-hidden="true">
          <FiCpu size={18} />
        </div>
        <span className={styles.confidence}>{aiSummary.confidence}% confidence</span>
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

export default AiSummaryPanel;
