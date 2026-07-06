import { FiShield } from 'react-icons/fi';
import SectionCard from '../SectionCard';
import styles from './RiskLevelCard.module.css';

const LEVEL_CLASS = {
  Low: styles.levelLow,
  Medium: styles.levelMedium,
  High: styles.levelHigh,
  Critical: styles.levelCritical,
};

function RiskLevelCard({ riskLevel }) {
  if (!riskLevel) return null;

  const levelClass = LEVEL_CLASS[riskLevel.level] || styles.levelMedium;

  return (
    <SectionCard
      title="Risk Level"
      subtitle="Operational and business risk assessment"
      icon={FiShield}
      accent="warning"
      className={styles.card}
    >
      <div className={`${styles.levelBadge} ${levelClass}`}>
        <span className={styles.levelText}>{riskLevel.level}</span>
        <span className={styles.levelScore}>{riskLevel.score}/100</span>
      </div>

      <p className={styles.description}>{riskLevel.description}</p>

      <ul className={styles.factors}>
        {riskLevel.factors.map((factor) => (
          <li key={factor.id} className={styles.factor}>
            <span className={styles.factorLabel}>{factor.label}</span>
            <span className={`${styles.severity} ${styles[`severity${factor.severity}`]}`}>
              {factor.severity}
            </span>
          </li>
        ))}
      </ul>
    </SectionCard>
  );
}

export default RiskLevelCard;
