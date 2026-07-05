import styles from './TeamPerformanceTable.module.css';

function getSlaClass(sla) {
  if (sla >= 95) return styles.slaGood;
  if (sla >= 90) return styles.slaWarn;
  return styles.slaBad;
}

function TeamPerformanceTable({ data = [] }) {
  if (!data.length) return null;

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th scope="col">Engineer</th>
          <th scope="col">Resolved</th>
          <th scope="col">Avg Time</th>
          <th scope="col">SLA %</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <tr key={row.name}>
            <td className={styles.name}>{row.name}</td>
            <td>{row.resolved}</td>
            <td>{row.avgTime}</td>
            <td>
              <div className={styles.slaCell}>
                <span className={getSlaClass(row.sla)}>{row.sla}%</span>
                <div className={styles.barTrack} aria-hidden="true">
                  <div
                    className={styles.barFill}
                    style={{ '--bar-width': `${row.sla}%` }}
                  />
                </div>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TeamPerformanceTable;
