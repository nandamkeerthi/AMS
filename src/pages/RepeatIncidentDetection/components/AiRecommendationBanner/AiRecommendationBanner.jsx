import { Button } from '@mui/material';
import { FiCpu } from 'react-icons/fi';
import toast from 'react-hot-toast';
import styles from './AiRecommendationBanner.module.css';

function AiRecommendationBanner({ recommendation, onAction }) {
  if (!recommendation) return null;

  const handleAction = () => {
    if (onAction) {
      onAction(recommendation);
    } else {
      toast.success(`Opening ${recommendation.runbookId} (demo)`);
    }
  };

  return (
    <aside className={styles.banner} aria-label="AI recommendation">
      <div className={styles.iconWrap} aria-hidden="true">
        <FiCpu size={22} />
      </div>
      <div className={styles.content}>
        <div className={styles.header}>
          <h2 className={styles.title}>{recommendation.title}</h2>
          <span className={styles.confidence}>{recommendation.confidence}% confidence</span>
        </div>
        <p className={styles.message}>{recommendation.message}</p>
      </div>
      <Button
        variant="contained"
        size="small"
        onClick={handleAction}
        className={styles.actionBtn}
      >
        {recommendation.actionLabel}
      </Button>
    </aside>
  );
}

export default AiRecommendationBanner;
