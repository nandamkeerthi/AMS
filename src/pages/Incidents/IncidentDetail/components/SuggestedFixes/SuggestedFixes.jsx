import { Button } from '@mui/material';
import styles from './SuggestedFixes.module.css';

function SuggestedFixes({ fixes = [], onApply }) {
  if (!fixes.length) {
    return <p className={styles.description}>No suggested fixes available.</p>;
  }

  return (
    <ul className={styles.list}>
      {fixes.map((fix) => (
        <li key={fix.id} className={styles.item}>
          <div className={styles.header}>
            <h4 className={styles.title}>{fix.title}</h4>
            <div className={styles.badges}>
              <span className={styles.confidence}>{fix.confidence}%</span>
              <span className={styles.effort}>{fix.effort}</span>
            </div>
          </div>
          <p className={styles.description}>{fix.description}</p>
          <div className={styles.actions}>
            {fix.automated && <span className={styles.autoBadge}>Auto-remediation available</span>}
            <Button
              size="small"
              variant="outlined"
              onClick={() => onApply?.(fix)}
              sx={{ borderRadius: '4px', textTransform: 'none', ml: 'auto' }}
            >
              Apply fix
            </Button>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default SuggestedFixes;
