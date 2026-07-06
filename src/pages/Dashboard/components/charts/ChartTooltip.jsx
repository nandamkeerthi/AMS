import styles from './ChartTooltip.module.css';

export function AreaChartTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;

  return (
    <div className={styles.tooltip}>
      <p className={styles.label}>{label}</p>
      {payload.map((entry) => (
        <p
          key={entry.name}
          className={styles.row}
          style={{ '--series-color': entry.color, color: 'var(--series-color)' }}
        >
          {entry.name}: {entry.value}
        </p>
      ))}
    </div>
  );
}

export function LegendText({ value }) {
  return <span className={styles.legendText}>{value}</span>;
}
