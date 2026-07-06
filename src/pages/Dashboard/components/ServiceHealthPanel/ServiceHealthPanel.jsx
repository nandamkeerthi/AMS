import styles from './ServiceHealthPanel.module.css';

function ServiceHealthPanel({ services = [], onSelect }) {
  return (
    <div className={styles.panel}>
      <ul className={styles.list}>
        {services.map((service) => (
          <li key={service.id}>
            <button
              type="button"
              className={styles.item}
              onClick={() => onSelect?.(service)}
            >
              <div className={styles.left}>
                <span
                  className={`${styles.dot} ${styles[service.status] || styles.healthy}`}
                  aria-hidden="true"
                />
                <p className={styles.name}>{service.name}</p>
              </div>
              <div className={styles.meta}>
                <span className={styles.status}>{service.status}</span>
                {service.incidents > 0 && (
                  <span className={`${styles.incidents} ${styles.incidentsActive}`}>
                    {service.incidents} active
                  </span>
                )}
              </div>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ServiceHealthPanel;
