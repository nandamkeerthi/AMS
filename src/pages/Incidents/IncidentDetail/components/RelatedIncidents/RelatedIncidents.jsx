import { useNavigate } from 'react-router-dom';
import { StatusBadge } from '@/components/common';
import styles from './RelatedIncidents.module.css';

function RelatedIncidents({ incidents = [] }) {
  const navigate = useNavigate();

  if (!incidents.length) {
    return <p className={styles.empty}>No related incidents.</p>;
  }

  return (
    <ul className={styles.list}>
      {incidents.map((item) => (
        <li key={item.id}>
          <button
            type="button"
            className={styles.link}
            onClick={() => navigate(`/incidents/${item.id}`)}
          >
            <span className={styles.id}>{item.id}</span>
            <span className={styles.title}>{item.title}</span>
            <div className={styles.badges}>
              <StatusBadge status={item.priority} type="priority" />
              <StatusBadge status={item.status} />
            </div>
          </button>
        </li>
      ))}
    </ul>
  );
}

export default RelatedIncidents;
