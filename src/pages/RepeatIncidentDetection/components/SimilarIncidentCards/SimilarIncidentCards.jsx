import { Button } from '@mui/material';
import CompareArrowsOutlinedIcon from '@mui/icons-material/CompareArrowsOutlined';
import { StatusBadge } from '@/components/common';
import styles from './SimilarIncidentCards.module.css';

export function SimilarityBadge({ value }) {
  const tier =
    value >= 90 ? styles.tierHigh : value >= 75 ? styles.tierMedium : styles.tierLow;

  return (
    <span className={`${styles.badge} ${tier}`}>
      {value}%
    </span>
  );
}

function SimilarIncidentCards({ incidents = [], onCompare }) {
  if (!incidents.length) {
    return (
      <p className={styles.empty}>No similar incidents match your filters.</p>
    );
  }

  return (
    <ul className={styles.list}>
      {incidents.map((incident) => (
        <li key={incident.id} className={styles.card}>
          <div className={styles.header}>
            <div>
              <span className={styles.id}>{incident.id}</span>
              <h4 className={styles.title}>{incident.title}</h4>
            </div>
            <SimilarityBadge value={incident.similarity} />
          </div>

          <div className={styles.badges}>
            <StatusBadge status={incident.priority} type="priority" />
            <StatusBadge status={incident.status} />
          </div>

          <dl className={styles.details}>
            <div>
              <dt>Application</dt>
              <dd>{incident.application}</dd>
            </div>
            <div>
              <dt>Resolution time</dt>
              <dd>{incident.resolutionTime || '—'}</dd>
            </div>
          </dl>

          <div className={styles.section}>
            <span className={styles.sectionLabel}>Root cause</span>
            <p className={styles.sectionText}>{incident.rootCause}</p>
          </div>

          <div className={styles.section}>
            <span className={styles.sectionLabel}>Previous resolution</span>
            <p className={styles.sectionText}>
              {incident.previousResolution || 'Not yet resolved'}
            </p>
          </div>

          <Button
            size="small"
            variant="outlined"
            startIcon={<CompareArrowsOutlinedIcon />}
            onClick={() => onCompare?.(incident)}
            className={styles.compareBtn}
          >
            Compare
          </Button>
        </li>
      ))}
    </ul>
  );
}

export default SimilarIncidentCards;
