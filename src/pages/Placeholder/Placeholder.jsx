import { motion } from 'framer-motion';
import { PageHeader } from '@/components/common';
import { getNavIcon } from '@/utils/iconMap';
import styles from './Placeholder.module.css';

/**
 * Placeholder page for routes not yet implemented.
 * Displays consistent empty/coming-soon state within the design system.
 */
function Placeholder({ title, description, iconKey = 'dashboard' }) {
  const Icon = getNavIcon(iconKey);

  return (
    <div>
      <PageHeader
        title={title}
        subtitle={description}
        variant="simple"
      />
      <motion.div
        className={styles.placeholder}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className={styles.icon} aria-hidden="true">
          <Icon size={40} />
        </div>
        <h2 className={styles.title}>Coming Soon</h2>
        <p className={styles.description}>
          The {title} module is under development. This page will be built following
          the AMS Workbench design system with full loading, empty, and error states.
        </p>
        <span className={styles.badge}>In Development</span>
      </motion.div>
    </div>
  );
}

export default Placeholder;
