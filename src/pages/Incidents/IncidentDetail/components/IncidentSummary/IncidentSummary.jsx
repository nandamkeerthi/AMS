import { StatusBadge } from '@/components/common';
import styles from './IncidentSummary.module.css';

function formatDate(iso) {
  return new Date(iso).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function IncidentSummary({ incident }) {
  const { summary } = incident;

  return (
    <div className={styles.summary}>
      <p className={styles.description}>{incident.description}</p>

      <div className={styles.grid}>
        <div className={styles.field}>
          <span className={styles.label}>Application</span>
          <span className={styles.value}>{incident.application}</span>
        </div>
        <div className={styles.field}>
          <span className={styles.label}>Environment</span>
          <span className={styles.value}>{incident.environment}</span>
        </div>
        <div className={styles.field}>
          <span className={styles.label}>Category</span>
          <span className={styles.value}>{incident.category}</span>
        </div>
        <div className={styles.field}>
          <span className={styles.label}>Assignee</span>
          <span className={styles.value}>{incident.assignee}</span>
        </div>
        <div className={styles.field}>
          <span className={styles.label}>Reporter</span>
          <span className={styles.value}>{incident.reporter}</span>
        </div>
        <div className={styles.field}>
          <span className={styles.label}>Team</span>
          <span className={styles.value}>{incident.team}</span>
        </div>
        <div className={styles.field}>
          <span className={styles.label}>Created</span>
          <span className={styles.value}>{formatDate(incident.createdAt)}</span>
        </div>
        <div className={styles.field}>
          <span className={styles.label}>Last updated</span>
          <span className={styles.value}>{formatDate(incident.updatedAt)}</span>
        </div>
        <div className={styles.field}>
          <span className={styles.label}>Priority</span>
          <StatusBadge status={incident.priority} type="priority" />
        </div>
        <div className={styles.field}>
          <span className={styles.label}>Status</span>
          <StatusBadge status={incident.status} />
        </div>
      </div>

      {summary && (
        <>
          <div className={styles.highlightSection}>
            <h4 className={styles.highlightTitle}>Root cause</h4>
            <p className={styles.value}>{summary.rootCause}</p>
          </div>
          <div className={styles.highlightSection}>
            <h4 className={styles.highlightTitle}>Business impact</h4>
            <p className={styles.value}>{summary.businessImpact}</p>
          </div>
          <div className={styles.highlightSection}>
            <h4 className={styles.highlightTitle}>Workaround</h4>
            <p className={styles.value}>{summary.workaround}</p>
          </div>
          {summary.affectedServices?.length > 0 && (
            <div className={styles.highlightSection}>
              <h4 className={styles.highlightTitle}>Affected services</h4>
              <ul className={styles.highlightList}>
                {summary.affectedServices.map((svc) => (
                  <li key={svc}>{svc}</li>
                ))}
              </ul>
            </div>
          )}
        </>
      )}

      {incident.tags?.length > 0 && (
        <div className={styles.field}>
          <span className={styles.label}>Tags</span>
          <div className={styles.tags}>
            {incident.tags.map((tag) => (
              <span key={tag} className={styles.tag}>{tag}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default IncidentSummary;
