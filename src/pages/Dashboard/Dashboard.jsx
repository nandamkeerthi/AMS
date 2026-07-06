import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import toast from 'react-hot-toast';
import { FiPlus } from 'react-icons/fi';
import { formatDate } from '@/utils/format';
import {
  PageHeader,
  GlassCard,
  DataTable,
  StatusBadge,
  ErrorState,
  SkeletonLoader,
} from '@/components/common';
import { useAsyncData } from '@/hooks';
import { dashboardService } from '@/services/dashboardService';
import { getStatIcon } from '@/utils/iconMap';
import {
  AlertBanner,
  DashboardToolbar,
  MetricTile,
  QuickActionBar,
  ServiceHealthPanel,
  InsightCard,
  TeamPerformanceTable,
  IncidentTrendChart,
  CategoryDonutChart,
} from './components';
import styles from './Dashboard.module.css';

const incidentColumns = [
  {
    key: 'id',
    label: 'Incident ID',
    width: '130px',
    render: (row) => <span className={styles.incidentLink}>{row.id}</span>,
  },
  {
    key: 'title',
    label: 'Title',
    render: (row) => (
      <div className={styles.titleCell}>
        <span className={styles.incidentTitle}>{row.title}</span>
        {row.slaBreached && <span className={styles.slaFlag}>SLA breached</span>}
      </div>
    ),
  },
  {
    key: 'application',
    label: 'Application',
    render: (row) => <span className={styles.muted}>{row.application}</span>,
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
    render: (row) => <span className={styles.muted}>{row.assignee}</span>,
  },
  {
    key: 'createdAt',
    label: 'Created',
    render: (row) => (
      <span className={styles.muted}>{formatDate(row.createdAt)}</span>
    ),
  },
];

function Dashboard() {
  const navigate = useNavigate();
  const { data, loading, error, refetch } = useAsyncData(
    () => dashboardService.getDashboardData(),
    []
  );

  const handleExport = () => {
    toast.success('Dashboard report exported successfully');
  };

  const handleQuickAction = (action) => {
    switch (action.id) {
      case 'view-assigned-incidents':
        navigate('/incidents');
        return;
      case 'escalated-incidents':
        navigate('/incidents');
        return;
      case 'ask-ai':
        navigate('/ai-assistant');
        return;
      case 'runbook':
        navigate('/knowledge');
        return;
      default:
        toast(`${action.label} — coming soon`, { icon: 'ℹ️' });
    }
  };

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

  return (
    <div className={styles.dashboard}>
      <PageHeader
        title="Dashboard"
        subtitle="Monitor operations, service health, and AI recommendations"
        breadcrumbs={[{ label: 'Home' }, { label: 'Dashboard' }]}
        variant="simple"
        actions={
          <Button
            variant="contained"
            startIcon={<FiPlus />}
            size="small"
            sx={{ borderRadius: '4px', textTransform: 'none', boxShadow: 'none' }}
            onClick={() => navigate('/incidents')}
          >
            View Assigned Incidents
          </Button>
        }
      />

      <DashboardToolbar
        lastUpdated={data.lastUpdated}
        onRefresh={refetch}
        onExport={handleExport}
        loading={loading}
      />

      {data.alertBanner && (
        <AlertBanner
          message={data.alertBanner.message}
          severity={data.alertBanner.severity}
          count={data.alertBanner.count}
          onView={() => toast('Opening critical incidents', { icon: '🔴' })}
        />
      )}

      <section className={styles.metricsGrid} aria-label="Key metrics">
        {data.stats.map((stat, index) => (
          <MetricTile
            key={stat.id}
            title={stat.title}
            value={stat.value}
            change={stat.change}
            changeType={stat.changeType}
            icon={getStatIcon(stat.icon)}
            color={stat.color}
            linkLabel={stat.linkLabel}
            index={index}
          />
        ))}
      </section>

      <QuickActionBar actions={data.quickActions} onAction={handleQuickAction} />

      <section className={styles.mainGrid} aria-label="Dashboard analytics">
        <div className={styles.primaryColumn}>
          <GlassCard
            title="Incident volume"
            subtitle="Open vs resolved — last 7 days"
            variant="solid"
            delay={0.08}
          >
            <IncidentTrendChart data={data.incidentTrend} />
          </GlassCard>

          <GlassCard
            title="Recent incidents"
            subtitle="Latest activity across all applications"
            variant="solid"
            noPadding
            delay={0.12}
            actions={
              <Button size="small" variant="text" sx={{ textTransform: 'none' }}>
                See all incidents
              </Button>
            }
          >
            <DataTable columns={incidentColumns} data={data.recentIncidents} />
          </GlassCard>
        </div>

        <aside className={styles.sideColumn} aria-label="Service health and insights">
          <GlassCard
            title="Service health"
            subtitle="Application status overview"
            variant="solid"
            delay={0.1}
          >
            <ServiceHealthPanel services={data.serviceHealth} />
          </GlassCard>

          <GlassCard
            title="Incidents by category"
            subtitle="Current period distribution"
            variant="solid"
            delay={0.14}
          >
            <CategoryDonutChart data={data.categoryDistribution} />
          </GlassCard>

          <GlassCard
            title="Recommendations"
            subtitle="AI-generated insights"
            variant="solid"
            delay={0.16}
            actions={
              <Button size="small" variant="text" sx={{ textTransform: 'none' }}>
                View all
              </Button>
            }
          >
            <div className={styles.insightsList}>
              {data.aiInsights.map((insight) => (
                <InsightCard
                  key={insight.id}
                  insight={insight}
                  onAction={() => toast.success(`Action: ${insight.action}`)}
                />
              ))}
            </div>
          </GlassCard>
        </aside>
      </section>

      <GlassCard
        title="Team performance"
        subtitle="Resolution metrics by engineer — last 7 days"
        variant="solid"
        delay={0.18}
      >
        <TeamPerformanceTable data={data.teamPerformance} />
      </GlassCard>
    </div>
  );
}

export default Dashboard;
