import { StatusBadge } from '@/components/common';
import { FiAlertCircle } from 'react-icons/fi';
import SectionCard from '../SectionCard';
import styles from './IncidentSummaryCard.module.css';

function IncidentSummaryCard({ summary }) {
  if (!summary) return null;

  return (
    <SectionCard
      title="Incident Summary"
      subtitle={`${summary.id} · ${summary.application}`}
      icon={FiAlertCircle}
      accent="primary"
      className={styles.card}
    >
      <div className={styles.headerRow}>
        <h3 className={styles.incidentTitle}>{summary.title}</h3>
        <div className={styles.badges}>
          <StatusBadge status={summary.priority} />
          <StatusBadge status={summary.status} />
        </div>
      </div>

      <p className={styles.description}>{summary.description}</p>

      <dl className={styles.metaGrid}>
        <div className={styles.metaItem}>
          <dt>Environment</dt>
          <dd>{summary.environment}</dd>
        </div>
        <div className={styles.metaItem}>
          <dt>Assignee</dt>
          <dd>{summary.assignee}</dd>
        </div>
        <div className={styles.metaItem}>
          <dt>Detection</dt>
          <dd>{summary.detectionSource}</dd>
        </div>
        <div className={styles.metaItem}>
          <dt>Created</dt>
          <dd>{new Date(summary.createdAt).toLocaleString('en-US', {
            month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit',
          })}</dd>
        </div>
      </dl>

      <div className={styles.impactBox}>
        <span className={styles.impactLabel}>Business impact</span>
        <p className={styles.impactText}>{summary.businessImpact}</p>
      </div>
    </SectionCard>
  );
}

export default IncidentSummaryCard;
