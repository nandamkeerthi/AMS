import analyticsData from '@/data/dummy/analytics.json';
import { delay } from '@/utils/async';
import { triggerDownload } from '@/utils/download';

/**
 * Analytics service — frontend data layer for reporting and chart data.
 * Replace dummy resolution with ASP.NET Core API calls (e.g. GET /api/analytics).
 */

function scaleValue(value, scale) {
  return Math.max(1, Math.round(value * scale));
}

function scaleDataPoint(point, scale, numericKeys) {
  const scaled = { ...point };
  numericKeys.forEach((key) => {
    if (typeof scaled[key] === 'number') {
      scaled[key] = scaleValue(scaled[key], scale);
    }
  });
  return scaled;
}

function filterByApplication(dataset, application) {
  if (application === 'all') return dataset;

  const scale = analyticsData.applicationScales[application] || 1;

  return {
    incidentTrend: dataset.incidentTrend.map((d) =>
      scaleDataPoint(d, scale, ['incidents', 'critical'])
    ),
    resolutionTime: dataset.resolutionTime.map((d) =>
      scaleDataPoint(d, scale * 0.9 + 0.1, ['hours'])
    ),
    statusDistribution: dataset.statusDistribution.map((d) =>
      scaleDataPoint(d, scale, ['value'])
    ),
    aiAccuracy: dataset.aiAccuracy,
    repeatIncidentTrend: dataset.repeatIncidentTrend.map((d) =>
      scaleDataPoint(d, scale, ['repeat', 'total'])
    ),
    knowledgeGrowth: dataset.knowledgeGrowth,
    topApplications: dataset.topApplications.filter((d) => d.name === application),
    monthlySummary: dataset.monthlySummary.map((d) =>
      scaleDataPoint(d, scale, ['opened', 'resolved', 'critical'])
    ),
  };
}

function buildReportContent(filters, chartData) {
  const lines = [
    'AMS Workbench — Analytics Report',
    '================================',
    '',
    `Date range: ${filters.dateRangeLabel}`,
    `Application: ${filters.applicationLabel}`,
    `Generated: ${new Date().toLocaleString()}`,
    '',
    'INCIDENT TREND',
    '--------------',
    ...chartData.incidentTrend.map(
      (row) => `${row.label}: ${row.incidents} incidents (${row.critical} critical)`
    ),
    '',
    'RESOLUTION TIME (hours)',
    '-----------------------',
    ...chartData.resolutionTime.map((row) => `${row.label}: ${row.hours}h`),
    '',
    'STATUS DISTRIBUTION',
    '-------------------',
    ...chartData.statusDistribution.map((row) => `${row.name}: ${row.value}`),
    '',
    'AI RECOMMENDATION ACCURACY',
    '--------------------------',
    ...chartData.aiAccuracy.map((row) => `${row.label}: ${row.accuracy}%`),
    '',
    'TOP APPLICATIONS',
    '----------------',
    ...chartData.topApplications.map((row) => `${row.name}: ${row.incidents}`),
  ];

  return lines.join('\n');
}

export const analyticsService = {
  async getPageData() {
    await delay(400);
    return Promise.resolve(analyticsData);
  },

  getChartData(pageData, dateRange, application) {
    const base = pageData.datasets[dateRange];
    if (!base) return null;
    return filterByApplication(base, application);
  },

  buildReportContent,
  triggerDownload,
};

export default analyticsService;
