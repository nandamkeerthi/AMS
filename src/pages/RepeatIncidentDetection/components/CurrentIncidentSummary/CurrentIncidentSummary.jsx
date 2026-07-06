import { GlassCard, StatusBadge } from '@/components/common';
import styles from './CurrentIncidentSummary.module.css';

function CurrentIncidentSummary({ incident }) {
  if (!incident) return null;

  return (
    <GlassCard title="Current Incident Summary" variant="solid" className={styles.card}>
      <div className={styles.headerRow}>
        <div>
          <span className={styles.incidentId}>{incident.id}</span>
          <h3 className={styles.title}>{incident.title}</h3>
        </div>
        <div className={styles.badges}>
          <StatusBadge status={incident.priority} type="priority" />
          <StatusBadge status={incident.status} />
        </div>
      </div>

      <p className={styles.description}>{incident.description}</p>

      <dl className={styles.metaGrid}>
        <div className={styles.metaItem}>
          <dt>Application</dt>
          <dd>{incident.application}</dd>
        </div>
        <div className={styles.metaItem}>
          <dt>Environment</dt>
          <dd>{incident.environment}</dd>
        </div>
        <div className={styles.metaItem}>
          <dt>Assignee</dt>
          <dd>{incident.assignee}</dd>
        </div>
        <div className={styles.metaItem}>
          <dt>Created</dt>
          <dd>
            {new Date(incident.createdAt).toLocaleString('en-US', {
              month: 'short',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </dd>
        </div>
      </dl>

      <div className={styles.rootCauseBox}>
        <span className={styles.boxLabel}>Root cause (current)</span>
        <p className={styles.boxText}>{incident.rootCause}</p>
      </div>

      <div className={styles.impactBox}>
        <span className={styles.boxLabel}>Business impact</span>
        <p className={styles.boxText}>{incident.businessImpact}</p>
      </div>
    </GlassCard>
  );
}

export default CurrentIncidentSummary;
