import { motion } from 'framer-motion';
import { FiTrendingDown, FiTrendingUp } from 'react-icons/fi';
import styles from './StatCard.module.css';

/**
 * KPI stat card with trend indicator and hover animation.
 */
function StatCard({
  title,
  value,
  change,
  changeType = 'increase',
  icon: Icon,
  color = 'primary',
  index = 0,
}) {
  const isPositive = changeType === 'increase';
  const changeClass = isPositive ? styles.changePositive : styles.changeNegative;
  const TrendIcon = isPositive ? FiTrendingUp : FiTrendingDown;

  return (
    <motion.article
      className={`${styles.statCard} ${styles[color]}`}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.08 }}
      whileHover={{ y: -2 }}
    >
      <div className={styles.accentBar} aria-hidden="true" />
      <div className={styles.header}>
        <p className={styles.title}>{title}</p>
        {Icon && (
          <div className={styles.iconWrapper} aria-hidden="true">
            <Icon size={22} />
          </div>
        )}
      </div>
      <p className={styles.value}>{value}</p>
      {change !== undefined && (
        <div className={styles.footer}>
          <span className={`${styles.change} ${changeClass}`}>
            <TrendIcon size={14} aria-hidden="true" />
            {Math.abs(change)}%
          </span>
          <span className={styles.changeLabel}>vs last week</span>
        </div>
      )}
    </motion.article>
  );
}

export default StatCard;
