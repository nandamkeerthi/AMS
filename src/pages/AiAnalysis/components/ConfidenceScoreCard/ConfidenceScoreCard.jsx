import { LinearProgress } from '@mui/material';
import { FiCpu } from 'react-icons/fi';
import SectionCard from '../SectionCard';
import styles from './ConfidenceScoreCard.module.css';

function ConfidenceScoreCard({ confidenceScore }) {
  if (!confidenceScore) return null;

  return (
    <SectionCard
      title="Confidence Score"
      subtitle={confidenceScore.label}
      icon={FiCpu}
      accent="success"
      className={styles.card}
    >
      <div className={styles.scoreRing}>
        <div className={styles.scoreValue}>{confidenceScore.overall}%</div>
        <span className={styles.scoreLabel}>Overall confidence</span>
      </div>

      <ul className={styles.breakdown}>
        {confidenceScore.breakdown.map((item) => (
          <li key={item.id} className={styles.breakdownItem}>
            <div className={styles.breakdownHeader}>
              <span className={styles.breakdownLabel}>{item.label}</span>
              <span className={styles.breakdownScore}>{item.score}%</span>
            </div>
            <LinearProgress
              variant="determinate"
              value={item.score}
              className={styles.progress}
              aria-label={`${item.label} confidence ${item.score}%`}
            />
          </li>
        ))}
      </ul>
    </SectionCard>
  );
}

export default ConfidenceScoreCard;
