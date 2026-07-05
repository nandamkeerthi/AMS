import { Button } from '@mui/material';
import { motion } from 'framer-motion';
import { FiAlertTriangle, FiRefreshCw } from 'react-icons/fi';
import styles from './ErrorState.module.css';

/**
 * Reusable error state with retry action.
 * @param {Object} props
 * @param {string} [props.title]
 * @param {string} [props.message]
 * @param {() => void} [props.onRetry]
 * @param {boolean} [props.compact]
 */
function ErrorState({
  title = 'Something went wrong',
  message = 'We encountered an error while loading this content. Please try again.',
  onRetry,
  compact = false,
}) {
  return (
    <motion.div
      className={`${styles.errorState} ${compact ? styles.compact : ''}`}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      role="alert"
    >
      <div className={styles.iconWrapper} aria-hidden="true">
        <FiAlertTriangle size={compact ? 28 : 36} />
      </div>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.message}>{message}</p>
      {onRetry && (
        <div className={styles.actions}>
          <Button
            variant="contained"
            startIcon={<FiRefreshCw />}
            onClick={onRetry}
          >
            Try Again
          </Button>
        </div>
      )}
    </motion.div>
  );
}

export default ErrorState;
