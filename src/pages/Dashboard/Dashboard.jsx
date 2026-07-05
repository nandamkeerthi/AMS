import { Button } from '@mui/material';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';
import { FiCpu, FiPlus, FiDownload, FiZap } from 'react-icons/fi';
import {
  PageHeader,
  StatCard,
  GlassCard,
  DataTable,
  StatusBadge,
  ErrorState,
  SkeletonLoader,
} from '@/components/common';
import { useAsyncData } from '@/hooks';
import { dashboardService } from '@/services/dashboardService';
import { getStatIcon } from '@/utils/iconMap';
import styles from './Dashboard.module.css';

/** Format ISO date string to readable format */
function formatDate(isoString) {
  return new Date(isoString).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

/** Incident table column definitions */
const incidentColumns = [
  {
    key: 'id',
    label: 'ID',
    width: '120px',
    render: (row) => <span className={styles.incidentId}>{row.id}</span>,
  },
  {
    key: 'title',
    label: 'Title',
    render: (row) => (
      <div>
        <p className={styles.incidentsTitle}>{row.title}</p>
        {row.slaBreached && (
          <span className={styles.slaBadge}>SLA Breached</span>
        )}
      </div>
    ),
  },
  {
    key: 'priority',
    label: 'Priority',
    render: (row) => <StatusBadge status={row.priority} type="priority" />,
  },
  {
    key: 'status',
    label: 'Status',
    render: (row) => <StatusBadge status={row.status} />,
  },
  {
    key: 'assignee',
    label: 'Assignee',
    render: (row) => <span className={styles.assignee}>{row.assignee}</span>,
  },
  {
    key: 'createdAt',
    label: 'Created',
    render: (row) => (
      <span className={styles.dateText}>{formatDate(row.createdAt)}</span>
    ),
  },
];

/** Custom tooltip for Recharts */
function ChartTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div
      style={{
        background: '#fff',
        border: '1px solid #E2E8F0',
        borderRadius: 8,
        padding: '8px 12px',
        boxShadow: '0 4px 12px rgba(15,23,42,0.08)',
      }}
    >
      <p style={{ margin: 0, fontWeight: 600, fontSize: 13 }}>{label}</p>
      {payload.map((entry) => (
        <p key={entry.name} style={{ margin: '4px 0 0', fontSize: 12, color: entry.color }}>
          {entry.name}: {entry.value}
        </p>
      ))}
    </div>
  );
}

/**
 * Main dashboard page — KPIs, charts, recent incidents, and AI insights.
 */
function Dashboard() {
  const { data, loading, error, refetch } = useAsyncData(
    () => dashboardService.getDashboardData(),
    []
  );

  if (loading) {
    return (
      <div className={styles.dashboard}>
        <SkeletonLoader variant="page" />
      </div>
    );
  }

  if (error) {
    return <ErrorState message={error} onRetry={refetch} />;
  }

  if (!data) {
    return (
      <ErrorState
        title="No dashboard data"
        message="Dashboard data is unavailable."
        onRetry={refetch}
      />
    );
  }

  const headerActions = (
    <>
      <Button variant="outlined" startIcon={<FiDownload />} size="small">
        Export
      </Button>
      <Button variant="contained" startIcon={<FiPlus />} size="small">
        New Incident
      </Button>
    </>
  );

  return (
    <div className={styles.dashboard}>
      <PageHeader
        title="Operations Dashboard"
        subtitle="Real-time overview of incidents, SLA compliance, and AI insights"
        breadcrumbs={[{ label: 'Home' }, { label: 'Dashboard' }]}
        actions={headerActions}
      />

      {/* KPI Stats */}
      <section className={styles.statsGrid} aria-label="Key performance indicators">
        {data.stats.map((stat, index) => (
          <StatCard
            key={stat.id}
            title={stat.title}
            value={stat.value}
            change={stat.change}
            changeType={stat.changeType}
            icon={getStatIcon(stat.icon)}
            color={stat.color}
            index={index}
          />
        ))}
      </section>

      {/* Charts Row */}
      <section className={styles.chartsGrid} aria-label="Analytics charts">
        <GlassCard
          title="Incident Trend"
          subtitle="Open vs resolved incidents this week"
          variant="solid"
          delay={0.1}
        >
          <div className={styles.chartContainer}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data.incidentTrend}>
                <defs>
                  <linearGradient id="openGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563EB" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#2563EB" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="resolvedGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                <XAxis dataKey="date" tick={{ fontSize: 12, fill: '#64748B' }} />
                <YAxis tick={{ fontSize: 12, fill: '#64748B' }} />
                <Tooltip content={<ChartTooltip />} />
                <Area
                  type="monotone"
                  dataKey="open"
                  name="Open"
                  stroke="#2563EB"
                  fill="url(#openGradient)"
                  strokeWidth={2}
                />
                <Area
                  type="monotone"
                  dataKey="resolved"
                  name="Resolved"
                  stroke="#10B981"
                  fill="url(#resolvedGradient)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        <GlassCard
          title="By Category"
          subtitle="Incident distribution"
          variant="solid"
          delay={0.15}
        >
          <div className={styles.chartContainer}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data.categoryDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {data.categoryDistribution.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend
                  verticalAlign="bottom"
                  iconType="circle"
                  formatter={(value) => (
                    <span style={{ fontSize: 12, color: '#64748B' }}>{value}</span>
                  )}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>
      </section>

      {/* Bottom Row: Incidents + AI Insights */}
      <section className={styles.bottomGrid}>
        <GlassCard
          title="Recent Incidents"
          subtitle="Latest active and resolved incidents"
          variant="solid"
          noPadding
          delay={0.2}
          actions={
            <Button size="small" variant="text">
              View All
            </Button>
          }
        >
          <DataTable
            columns={incidentColumns}
            data={data.recentIncidents}
            onRowClick={(row) => console.log('Navigate to incident:', row.id)}
          />
        </GlassCard>

        <GlassCard
          title="AI Insights"
          subtitle="Powered by AMS Intelligence"
          variant="glass"
          delay={0.25}
          actions={
            <Button size="small" variant="text" startIcon={<FiZap />}>
              Run Analysis
            </Button>
          }
        >
          <div className={styles.insightList}>
            {data.aiInsights.map((insight) => (
              <article key={insight.id} className={styles.insightItem}>
                <div className={styles.insightIcon} aria-hidden="true">
                  <FiCpu size={20} />
                </div>
                <div className={styles.insightContent}>
                  <h4 className={styles.insightTitle}>{insight.title}</h4>
                  <p className={styles.insightDescription}>{insight.description}</p>
                  <div className={styles.insightMeta}>
                    <span className={styles.confidence}>
                      {insight.confidence}% confidence
                    </span>
                    <Button size="small" variant="outlined">
                      {insight.action}
                    </Button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </GlassCard>
      </section>
    </div>
  );
}

export default Dashboard;
