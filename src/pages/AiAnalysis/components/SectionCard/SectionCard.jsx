import styles from './SectionCard.module.css';

function SectionCard({
  title,
  subtitle,
  icon: Icon,
  accent = 'primary',
  actions,
  children,
  className = '',
  noPadding = false,
}) {
  return (
    <section className={`${styles.card} ${styles[accent]} ${className}`}>
      <header className={styles.header}>
        <div className={styles.headerMain}>
          {Icon && (
            <div className={styles.iconWrap} aria-hidden="true">
              <Icon size={18} />
            </div>
          )}
          <div>
            <h2 className={styles.title}>{title}</h2>
            {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
          </div>
        </div>
        {actions && <div className={styles.actions}>{actions}</div>}
      </header>
      <div className={`${styles.content} ${noPadding ? styles.contentNoPadding : ''}`}>
        {children}
      </div>
    </section>
  );
}

export default SectionCard;
