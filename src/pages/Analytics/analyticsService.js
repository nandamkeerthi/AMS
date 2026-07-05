import analyticsData from '@/data/dummy/analytics.json';

const LOAD_DELAY_MS = 400;

function delay(ms = LOAD_DELAY_MS) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

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

function triggerDownload(content, fileName) {
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = fileName;
  anchor.click();
  URL.revokeObjectURL(url);
}

export const analyticsService = {
  async getPageData() {
    await delay();
    return analyticsData;
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
