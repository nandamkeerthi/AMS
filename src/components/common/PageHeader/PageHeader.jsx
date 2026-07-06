import { motion } from 'framer-motion';
import { FiChevronRight } from 'react-icons/fi';
import styles from './PageHeader.module.css';

/**
 * Reusable page header with gradient variant and breadcrumb support.
 */
function PageHeader({
  title,
  subtitle,
  breadcrumbs = [],
  actions,
  variant = 'gradient',
}) {
  const isGradient = variant === 'gradient';

  return (
    <header
      className={`${styles.pageHeader} ${isGradient ? styles.gradientHeader : styles.simple}`}
    >
      <motion.div
        className={isGradient ? styles.gradientContent : undefined}
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {breadcrumbs.length > 0 && (
          <nav className={styles.breadcrumb} aria-label="Breadcrumb">
            {breadcrumbs.map((crumb, index) => (
              <span key={crumb.label} className={styles.breadcrumbItem}>
                {index > 0 && (
                  <FiChevronRight className={styles.breadcrumbSeparator} aria-hidden="true" />
                )}
                <span>{crumb.label}</span>
              </span>
            ))}
          </nav>
        )}

        <div className={styles.titleRow}>
          <div className={styles.titleGroup}>
            <h1 className={styles.title}>{title}</h1>
            {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
          </div>
          {actions && <div className={styles.actions}>{actions}</div>}
        </div>
      </motion.div>
    </header>
  );
}

export default PageHeader;
