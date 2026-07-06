import { motion } from 'framer-motion';
import { getNavIcon } from '@/utils/iconMap';
import styles from './QuickActionBar.module.css';

function QuickActionBar({ actions = [], onAction }) {
  if (!actions.length) return null;

  return (
    <motion.div
      className={styles.bar}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, delay: 0.1 }}
      role="toolbar"
      aria-label="Quick actions"
    >
      {actions.map((action) => {
        const Icon = getNavIcon(action.icon);
        return (
          <button
            key={action.id}
            type="button"
            className={styles.action}
            onClick={() => onAction?.(action)}
          >
            <span className={styles.icon} aria-hidden="true">
              <Icon size={16} />
            </span>
            <span className={styles.label}>{action.label}</span>
          </button>
        );
      })}
    </motion.div>
  );
}

export default QuickActionBar;
