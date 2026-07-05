import PropTypes from 'prop-types';
import { CircularProgress, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import styles from './LoadingState.module.css';

/**
 * Reusable loading state with optional message.
 * Used across all pages during data fetch.
 */
function LoadingState({ message = 'Loading...', fullPage = false, compact = false }) {
  const containerClass = [
    styles.loadingState,
    fullPage ? styles.fullPage : '',
    compact ? styles.compact : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <motion.div
      className={containerClass}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      role="status"
      aria-live="polite"
      aria-label={message}
    >
      <CircularProgress size={fullPage ? 48 : 36} thickness={4} />
      {message && (
        <Typography className={styles.message} variant="body2">
          {message}
        </Typography>
      )}
    </motion.div>
  );
}

LoadingState.propTypes = {
  message: PropTypes.string,
  fullPage: PropTypes.bool,
  compact: PropTypes.bool,
};

export default LoadingState;
