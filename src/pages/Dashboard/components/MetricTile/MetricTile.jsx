import { motion } from 'framer-motion';
import { FiTrendingDown, FiTrendingUp } from 'react-icons/fi';
import styles from './MetricTile.module.css';

function MetricTile({
  title,
  value,
  change,
  changeType = 'increase',
  icon: Icon,
  color = 'primary',
  linkLabel,
  onLinkClick,
  index = 0,
}) {
  const isIncrease = changeType === 'increase';
  const TrendIcon = isIncrease ? FiTrendingUp : FiTrendingDown;
  const trendClass = change !== undefined
    ? isIncrease
      ? styles.trendUp
      : styles.trendDown
    : styles.trendNeutral;

  return (
    <motion.article
      className={`${styles.tile} ${styles[color]}`}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.06 }}
      whileHover={{ y: -1 }}
    >
      {Icon && (
        <div className={styles.iconWrapper} aria-hidden="true">
          <Icon size={20} />
        </div>
      )}
      <div className={styles.body}>
        <p className={styles.title}>{title}</p>
        <p className={styles.value}>{value}</p>
        {change !== undefined && (
          <div className={styles.footer}>
            <span className={`${styles.trend} ${trendClass}`}>
              <TrendIcon size={12} aria-hidden="true" />
              {Math.abs(change)}%
            </span>
            <span className={styles.trendLabel}>vs last period</span>
          </div>
        )}
        {linkLabel && (
          <button type="button" className={styles.link} onClick={onLinkClick}>
            {linkLabel}
          </button>
        )}
      </div>
    </motion.article>
  );
}

export default MetricTile;
