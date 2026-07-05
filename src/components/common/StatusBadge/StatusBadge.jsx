import { STATUS_VARIANTS, PRIORITY_VARIANTS } from '@/utils/constants';
import styles from './StatusBadge.module.css';

/**
 * Unified status/priority badge used across tables and cards.
 */
function StatusBadge({
  status,
  type = 'status',
  variant = 'filled',
  label: customLabel,
}) {
  const variants = type === 'priority' ? PRIORITY_VARIANTS : STATUS_VARIANTS;
  const config = variants[status] || { label: status, color: 'default' };
  const label = customLabel || config.label;
  const colorClass = styles[config.color] || styles.default;
  const variantClass = variant === 'outlined' ? styles.outlined : '';

  return (
    <span
      className={`${styles.badge} ${colorClass} ${variantClass}`}
      role="status"
      aria-label={`${type}: ${label}`}
    >
      <span className={styles.dot} aria-hidden="true" />
      {label}
    </span>
  );
}

export default StatusBadge;
