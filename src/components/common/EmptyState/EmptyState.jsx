import { Button } from '@mui/material';
import { motion } from 'framer-motion';
import { FiInbox } from 'react-icons/fi';
import styles from './EmptyState.module.css';

/**
 * Reusable empty state for lists, tables, and pages with no data.
 */
function EmptyState({
  icon: IconComponent = FiInbox,
  title = 'No data found',
  description = 'There is nothing to display at the moment.',
  actionLabel,
  onAction,
  secondaryActionLabel,
  onSecondaryAction,
  compact = false,
}) {
  const Icon = IconComponent;

  return (
    <motion.div
      className={`${styles.emptyState} ${compact ? styles.compact : ''}`}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      role="status"
    >
      <div className={styles.iconWrapper} aria-hidden="true">
        <Icon size={compact ? 28 : 36} />
      </div>
      <h3 className={styles.title}>{title}</h3>
      {description && <p className={styles.description}>{description}</p>}
      {(actionLabel || secondaryActionLabel) && (
        <div className={styles.actions}>
          {actionLabel && (
            <Button variant="contained" onClick={onAction}>
              {actionLabel}
            </Button>
          )}
          {secondaryActionLabel && (
            <Button variant="outlined" onClick={onSecondaryAction}>
              {secondaryActionLabel}
            </Button>
          )}
        </div>
      )}
    </motion.div>
  );
}

export default EmptyState;
