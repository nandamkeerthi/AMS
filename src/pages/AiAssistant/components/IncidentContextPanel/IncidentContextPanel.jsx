import { GlassCard, StatusBadge } from '@/components/common';
import styles from './IncidentContextPanel.module.css';

function IncidentContextPanel({ incident }) {
  if (!incident) return null;

  return (
    <GlassCard title="Incident Context" variant="solid" className={styles.panel}>
      <div className={styles.header}>
        <span className={styles.id}>{incident.id}</span>
        <div className={styles.badges}>
          <StatusBadge status={incident.priority} type="priority" />
          <StatusBadge status={incident.status} />
        </div>
      </div>
      <h4 className={styles.title}>{incident.title}</h4>
      <dl className={styles.meta}>
        <div>
          <dt>Application</dt>
          <dd>{incident.application}</dd>
        </div>
        <div>
          <dt>Assignee</dt>
          <dd>{incident.assignee}</dd>
        </div>
      </dl>
      <p className={styles.summary}>{incident.summary}</p>
    </GlassCard>
  );
}

export default IncidentContextPanel;
