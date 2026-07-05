import {
  FiActivity,
  FiMessageSquare,
  FiCpu,
  FiUser,
  FiRefreshCw,
} from 'react-icons/fi';
import styles from './IncidentTimeline.module.css';

const ICON_MAP = {
  system: FiActivity,
  status: FiRefreshCw,
  comment: FiMessageSquare,
  ai: FiCpu,
  assignment: FiUser,
};

function formatTime(iso) {
  return new Date(iso).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function IncidentTimeline({ events = [] }) {
  if (!events.length) {
    return <p className={styles.action}>No timeline events recorded.</p>;
  }

  return (
    <ul className={styles.timeline}>
      {events.map((event) => {
        const Icon = ICON_MAP[event.type] || FiActivity;
        return (
          <li key={event.id} className={styles.item}>
            <div className={`${styles.icon} ${styles[event.type] || styles.system}`}>
              <Icon size={14} aria-hidden="true" />
            </div>
            <div className={styles.content}>
              <div className={styles.meta}>
                <span className={styles.author}>{event.author}</span>
                <span className={styles.typeBadge}>{event.type}</span>
                <span className={styles.time}>{formatTime(event.timestamp)}</span>
              </div>
              <p className={styles.action}>{event.action}</p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

export default IncidentTimeline;
