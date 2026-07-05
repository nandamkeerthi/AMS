import { motion } from 'framer-motion';
import { FiAlertCircle } from 'react-icons/fi';
import styles from './AlertBanner.module.css';

function AlertBanner({ message, severity = 'critical', count, onView }) {
  if (!message) return null;

  return (
    <motion.div
      className={`${styles.banner} ${styles[severity] || styles.critical}`}
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      transition={{ duration: 0.25 }}
      role="alert"
    >
      <div className={styles.content}>
        <span className={styles.icon} aria-hidden="true">
          <FiAlertCircle size={18} />
        </span>
        <p className={styles.message}>{message}</p>
      </div>
      {onView && (
        <button type="button" className={styles.action} onClick={onView}>
          View {count ? `(${count})` : ''}
        </button>
      )}
    </motion.div>
  );
}

export default AlertBanner;
