import { motion } from 'framer-motion';
import styles from './GlassCard.module.css';

/**
 * Reusable card with glassmorphism or solid variant.
 * Used as container for charts, tables, and content sections.
 */
function GlassCard({
  title,
  subtitle,
  actions,
  children,
  variant = 'glass',
  noPadding = false,
  className = '',
  delay = 0,
}) {
  const hasHeader = title || subtitle || actions;

  return (
    <motion.section
      className={`${styles.glassCard} ${variant === 'solid' ? styles.solid : ''} ${!hasHeader ? styles.noHeader : ''} ${className}`}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
    >
      {hasHeader && (
        <header className={styles.header}>
          <div>
            {title && <h2 className={styles.headerTitle}>{title}</h2>}
            {subtitle && <p className={styles.headerSubtitle}>{subtitle}</p>}
          </div>
          {actions && <div className={styles.headerActions}>{actions}</div>}
        </header>
      )}
      <div className={`${styles.content} ${noPadding ? styles.contentNoPadding : ''}`}>
        {children}
      </div>
    </motion.section>
  );
}

export default GlassCard;
