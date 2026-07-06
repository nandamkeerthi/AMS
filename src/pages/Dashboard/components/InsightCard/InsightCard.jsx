import { FiCpu } from 'react-icons/fi';
import styles from './InsightCard.module.css';

function InsightCard({ insight, onAction }) {
  return (
    <article className={styles.card}>
      <div className={styles.iconWrap} aria-hidden="true">
        <FiCpu size={18} />
      </div>
      <div className={styles.content}>
        <h4 className={styles.title}>{insight.title}</h4>
        <p className={styles.description}>{insight.description}</p>
        <div className={styles.footer}>
          <span className={styles.confidence}>{insight.confidence}% confidence</span>
          <button
            type="button"
            className={styles.action}
            onClick={() => onAction?.(insight)}
          >
            {insight.action} →
          </button>
        </div>
      </div>
    </article>
  );
}

export default InsightCard;
