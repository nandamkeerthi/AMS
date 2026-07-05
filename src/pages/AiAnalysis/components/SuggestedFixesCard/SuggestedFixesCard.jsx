import { Button, Chip } from '@mui/material';
import { FiTool } from 'react-icons/fi';
import toast from 'react-hot-toast';
import SectionCard from '../SectionCard';
import styles from './SuggestedFixesCard.module.css';

function SuggestedFixesCard({ fixes = [] }) {
  const handleApply = (fix) => {
    toast.success(`Applied fix: ${fix.title} (demo)`);
  };

  return (
    <SectionCard
      title="Suggested Fixes"
      subtitle="Primary remediation recommendations"
      icon={FiTool}
      accent="primary"
      className={styles.card}
    >
      <ul className={styles.list}>
        {fixes.map((fix) => (
          <li key={fix.id} className={styles.item}>
            <div className={styles.header}>
              <h4 className={styles.title}>{fix.title}</h4>
              <div className={styles.badges}>
                <span className={styles.confidence}>{fix.confidence}%</span>
                <Chip label={fix.effort} size="small" variant="outlined" className={styles.chip} />
              </div>
            </div>
            <p className={styles.description}>{fix.description}</p>
            <div className={styles.footer}>
              <span className={styles.recovery}>Est. recovery: {fix.estimatedRecovery}</span>
              {fix.automated && (
                <Chip label="Auto-remediation" size="small" color="success" variant="outlined" />
              )}
              <Button
                size="small"
                variant={fix.priority === 'primary' ? 'contained' : 'outlined'}
                onClick={() => handleApply(fix)}
                className={styles.applyBtn}
              >
                Apply fix
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </SectionCard>
  );
}

export default SuggestedFixesCard;
