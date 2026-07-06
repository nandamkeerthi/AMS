import { Button } from '@mui/material';
import { FiArrowUp, FiCheck, FiUser } from 'react-icons/fi';
import { StatusBadge } from '@/components/common';
import styles from './IncidentDetailHeader.module.css';

function getSlaClass(incident) {
  if (incident.slaBreached) return styles.slaBreached;
  if (incident.slaAtRisk) return styles.slaAtRisk;
  return styles.slaOk;
}

function IncidentDetailHeader({ incident, onAssign, onEscalate, onResolve }) {
  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <p className={styles.id}>{incident.id}</p>
        <h1 className={styles.title}>{incident.title}</h1>
        <div className={styles.badges}>
          <StatusBadge status={incident.priority} type="priority" />
          <StatusBadge status={incident.status} />
          <span className={`${styles.sla} ${getSlaClass(incident)}`}>
            SLA: {incident.slaRemaining ?? '—'}
          </span>
        </div>
      </div>
      <div className={styles.actions}>
        <Button
          variant="outlined"
          size="small"
          startIcon={<FiUser />}
          onClick={onAssign}
          sx={{ borderRadius: '4px', textTransform: 'none' }}
        >
          Assign
        </Button>
        <Button
          variant="outlined"
          size="small"
          startIcon={<FiArrowUp />}
          onClick={onEscalate}
          sx={{ borderRadius: '4px', textTransform: 'none' }}
        >
          Escalate
        </Button>
        <Button
          variant="contained"
          size="small"
          startIcon={<FiCheck />}
          onClick={onResolve}
          sx={{ borderRadius: '4px', textTransform: 'none', boxShadow: 'none' }}
        >
          Resolve
        </Button>
      </div>
    </header>
  );
}

export default IncidentDetailHeader;
