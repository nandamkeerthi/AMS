import { FiGitBranch } from 'react-icons/fi';
import SectionCard from '../SectionCard';
import styles from './AlternativeFixesCard.module.css';

function AlternativeFixesCard({ fixes = [] }) {
  return (
    <SectionCard
      title="Alternative Fixes"
      subtitle="Secondary options with tradeoffs"
      icon={FiGitBranch}
      accent="warning"
      className={styles.card}
    >
      <ul className={styles.list}>
        {fixes.map((fix) => (
          <li key={fix.id} className={styles.item}>
            <div className={styles.header}>
              <h4 className={styles.title}>{fix.title}</h4>
              <span className={styles.confidence}>{fix.confidence}%</span>
            </div>
            <p className={styles.description}>{fix.description}</p>
            <div className={styles.meta}>
              <span className={styles.effort}>{fix.effort} effort</span>
            </div>
            <p className={styles.tradeoff}>
              <span className={styles.tradeoffLabel}>Tradeoff:</span>
              {fix.tradeoff}
            </p>
          </li>
        ))}
      </ul>
    </SectionCard>
  );
}

export default AlternativeFixesCard;
