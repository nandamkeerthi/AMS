import { useCallback, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import {
  PageHeader,
  ErrorState,
  SkeletonLoader,
  EmptyState,
} from '@/components/common';
import { useAsyncData } from '@/hooks';
import { analyticsService } from './analyticsService';
import { AnalyticsToolbar, ChartCard } from './components';
import {
  IncidentTrendLineChart,
  ResolutionTimeBarChart,
  StatusDistributionPieChart,
  AiAccuracyAreaChart,
  RepeatIncidentLineChart,
  KnowledgeGrowthAreaChart,
  TopApplicationsBarChart,
  MonthlySummaryBarChart,
} from './components/charts';
import styles from './Analytics.module.css';

const DEFAULT_DATE_RANGE = '30d';
const DEFAULT_APPLICATION = 'all';

function Analytics() {
  const { data, loading, error, refetch } = useAsyncData(
    () => analyticsService.getPageData(),
    []
  );

  const [dateRange, setDateRange] = useState(DEFAULT_DATE_RANGE);
  const [application, setApplication] = useState(DEFAULT_APPLICATION);

  const chartData = useMemo(() => {
    if (!data) return null;
    return analyticsService.getChartData(data, dateRange, application);
  }, [data, dateRange, application]);

  const filterLabels = useMemo(() => {
    if (!data) {
      return { dateRangeLabel: '', applicationLabel: '' };
    }

    const dateRangeLabel =
      data.filterOptions.dateRanges.find((option) => option.value === dateRange)?.label ||
      dateRange;
    const applicationLabel =
      data.filterOptions.applications.find((option) => option.value === application)?.label ||
      application;

    return { dateRangeLabel, applicationLabel };
  }, [data, dateRange, application]);

  const handleExport = useCallback(() => {
    if (!chartData) return;

    const content = analyticsService.buildReportContent(
      {
        dateRangeLabel: filterLabels.dateRangeLabel,
        applicationLabel: filterLabels.applicationLabel,
      },
      chartData
    );
    const fileName = `analytics-report-${dateRange}-${application === 'all' ? 'all-apps' : 'filtered'}.txt`;
    analyticsService.triggerDownload(content, fileName);
    toast.success('Analytics report exported successfully');
  }, [chartData, filterLabels, dateRange, application]);

  if (loading) {
    return (
      <div className={styles.page}>
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
        title="No analytics data"
        message="Analytics data is unavailable."
        onRetry={refetch}
      />
    );
  }

  if (!chartData) {
    return (
      <div className={styles.page}>
        <PageHeader
          title={data.pageConfig.title}
          subtitle={data.pageConfig.subtitle}
          breadcrumbs={[{ label: 'Home' }, { label: 'Analytics' }]}
          variant="simple"
        />
        <EmptyState
          title="No data for selected range"
          description="Choose a different date range to view analytics charts."
          actionLabel="Reset filters"
          onAction={() => {
            setDateRange(DEFAULT_DATE_RANGE);
            setApplication(DEFAULT_APPLICATION);
          }}
        />
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <PageHeader
        title={data.pageConfig.title}
        subtitle={data.pageConfig.subtitle}
        breadcrumbs={[{ label: 'Home' }, { label: 'Analytics' }]}
        variant="simple"
      />

      <AnalyticsToolbar
        dateRange={dateRange}
        onDateRangeChange={setDateRange}
        application={application}
        onApplicationChange={setApplication}
        dateRangeOptions={data.filterOptions.dateRanges}
        applicationOptions={data.filterOptions.applications}
        onExport={handleExport}
      />

      <section className={styles.chartGrid} aria-label="Analytics charts">
        <ChartCard
          title="Incident Trend"
          subtitle="Daily incident volume and critical incidents"
          data={chartData.incidentTrend}
          delay={0.04}
        >
          <IncidentTrendLineChart data={chartData.incidentTrend} />
        </ChartCard>

        <ChartCard
          title="Resolution Time"
          subtitle="Average time to resolve by priority"
          data={chartData.resolutionTime}
          delay={0.06}
        >
          <ResolutionTimeBarChart data={chartData.resolutionTime} />
        </ChartCard>

        <ChartCard
          title="Incident Status Distribution"
          subtitle="Current incident status breakdown"
          data={chartData.statusDistribution}
          delay={0.08}
        >
          <StatusDistributionPieChart data={chartData.statusDistribution} />
        </ChartCard>

        <ChartCard
          title="AI Recommendation Accuracy"
          subtitle="Model accuracy over the selected period"
          data={chartData.aiAccuracy}
          delay={0.1}
        >
          <AiAccuracyAreaChart data={chartData.aiAccuracy} />
        </ChartCard>

        <ChartCard
          title="Repeat Incident Trend"
          subtitle="Repeat vs total incidents over time"
          data={chartData.repeatIncidentTrend}
          delay={0.12}
        >
          <RepeatIncidentLineChart data={chartData.repeatIncidentTrend} />
        </ChartCard>

        <ChartCard
          title="Knowledge Article Growth"
          subtitle="Total and newly published articles"
          data={chartData.knowledgeGrowth}
          delay={0.14}
        >
          <KnowledgeGrowthAreaChart data={chartData.knowledgeGrowth} />
        </ChartCard>

        <ChartCard
          title="Top Applications"
          subtitle="Highest incident volume by application"
          data={chartData.topApplications}
          delay={0.16}
        >
          <TopApplicationsBarChart data={chartData.topApplications} />
        </ChartCard>

        <ChartCard
          title="Monthly Incident Summary"
          subtitle="Opened, resolved, and critical incidents by month"
          data={chartData.monthlySummary}
          delay={0.18}
          className={styles.fullWidth}
        >
          <MonthlySummaryBarChart data={chartData.monthlySummary} />
        </ChartCard>
      </section>
    </div>
  );
}

export default Analytics;
