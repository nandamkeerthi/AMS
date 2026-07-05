import { FiTarget } from 'react-icons/fi';
import SectionCard from '../SectionCard';
import styles from './RootCauseCard.module.css';

function RootCauseCard({ rootCause }) {
  if (!rootCause) return null;

  return (
    <SectionCard
      title="Root Cause"
      subtitle="AI-identified primary failure mechanism"
      icon={FiTarget}
      accent="purple"
      className={styles.card}
    >
      <p className={styles.summary}>{rootCause.summary}</p>
      <p className={styles.detail}>{rootCause.detail}</p>

      {rootCause.contributingFactors?.length > 0 && (
        <>
          <h4 className={styles.sectionLabel}>Contributing factors</h4>
          <ul className={styles.list}>
            {rootCause.contributingFactors.map((factor) => (
              <li key={factor}>{factor}</li>
            ))}
          </ul>
        </>
      )}
    </SectionCard>
  );
}

export default RootCauseCard;
