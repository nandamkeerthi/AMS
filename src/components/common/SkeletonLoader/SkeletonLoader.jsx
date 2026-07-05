import { Skeleton } from '@mui/material';
import styles from './SkeletonLoader.module.css';

/**
 * Flexible skeleton loader with preset layouts.
 * @param {Object} props
 * @param {'card'|'table'|'page'|'stat'|'text'} [props.variant]
 * @param {number} [props.rows]
 * @param {number} [props.height]
 */
function SkeletonLoader({ variant = 'card', rows = 5, height = 120 }) {
  if (variant === 'stat') {
    return (
      <div className={styles.statsGrid}>
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton
            key={i}
            variant="rounded"
            height={height}
            className={styles.skeletonCard}
          />
        ))}
      </div>
    );
  }

  if (variant === 'table') {
    return (
      <div className={styles.skeletonTable}>
        <Skeleton variant="rounded" height={48} />
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className={styles.skeletonRow}>
            <Skeleton variant="rounded" width="15%" height={40} />
            <Skeleton variant="rounded" width="35%" height={40} />
            <Skeleton variant="rounded" width="15%" height={40} />
            <Skeleton variant="rounded" width="15%" height={40} />
            <Skeleton variant="rounded" width="20%" height={40} />
          </div>
        ))}
      </div>
    );
  }

  if (variant === 'page') {
    return (
      <div className={styles.skeletonPage}>
        <Skeleton variant="rounded" height={80} />
        <SkeletonLoader variant="stat" />
        <div className={styles.chartGrid}>
          <Skeleton variant="rounded" height={320} />
          <Skeleton variant="rounded" height={320} />
        </div>
        <SkeletonLoader variant="table" rows={5} />
      </div>
    );
  }

  if (variant === 'text') {
    return (
      <div className={styles.skeletonGrid}>
        {Array.from({ length: rows }).map((_, i) => (
          <Skeleton key={i} variant="text" height={24} width={`${100 - i * 10}%`} />
        ))}
      </div>
    );
  }

  return (
    <Skeleton
      variant="rounded"
      height={height}
      className={styles.skeletonCard}
    />
  );
}

export default SkeletonLoader;
