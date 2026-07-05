import { FiServer } from 'react-icons/fi';
import SectionCard from '../SectionCard';
import styles from './AffectedServicesCard.module.css';

const STATUS_CLASS = {
  healthy: styles.statusHealthy,
  degraded: styles.statusDegraded,
  critical: styles.statusCritical,
  at_risk: styles.statusAtRisk,
};

const STATUS_LABEL = {
  healthy: 'Healthy',
  degraded: 'Degraded',
  critical: 'Critical',
  at_risk: 'At Risk',
};

function AffectedServicesCard({ services = [] }) {
  return (
    <SectionCard
      title="Affected Services"
      subtitle={`${services.length} services analyzed`}
      icon={FiServer}
      accent="info"
      className={styles.card}
    >
      <ul className={styles.list}>
        {services.map((service) => (
          <li key={service.id} className={styles.item}>
            <div className={styles.header}>
              <span className={styles.name}>{service.name}</span>
              <span className={`${styles.status} ${STATUS_CLASS[service.status] || ''}`}>
                {STATUS_LABEL[service.status] || service.status}
              </span>
            </div>
            <p className={styles.impact}>{service.impact}</p>
            <span className={styles.region}>{service.region}</span>
          </li>
        ))}
      </ul>
    </SectionCard>
  );
}

export default AffectedServicesCard;
