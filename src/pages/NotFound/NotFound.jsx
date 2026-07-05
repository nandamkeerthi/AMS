import { Link as RouterLink } from 'react-router-dom';
import { Button } from '@mui/material';
import { motion } from 'framer-motion';
import { FiHome, FiArrowLeft } from 'react-icons/fi';
import styles from './NotFound.module.css';

/**
 * 404 Not Found page.
 */
function NotFound() {
  return (
    <motion.div
      className={styles.notFound}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <p className={styles.code} aria-hidden="true">
        404
      </p>
      <h1 className={styles.title}>Page Not Found</h1>
      <p className={styles.description}>
        The page you are looking for does not exist or has been moved.
        Check the URL or return to the dashboard.
      </p>
      <div className={styles.actions}>
        <Button
          component={RouterLink}
          to="/"
          variant="contained"
          startIcon={<FiHome />}
        >
          Go to Dashboard
        </Button>
        <Button
          variant="outlined"
          startIcon={<FiArrowLeft />}
          onClick={() => window.history.back()}
        >
          Go Back
        </Button>
      </div>
    </motion.div>
  );
}

export default NotFound;
