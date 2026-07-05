import { GlassCard, EmptyState } from '@/components/common';
import styles from './ChartCard.module.css';

function ChartCard({ title, subtitle, data, children, delay = 0, className = '' }) {
  const isEmpty = !data || data.length === 0;

  return (
    <GlassCard
      title={title}
      subtitle={subtitle}
      variant="solid"
      delay={delay}
      className={`${styles.chartCard} ${className}`}
    >
      {isEmpty ? (
        <EmptyState
          compact
          title="No data available"
          description="Adjust the date range or application filter to view chart data."
        />
      ) : (
        children
      )}
    </GlassCard>
  );
}

export default ChartCard;
