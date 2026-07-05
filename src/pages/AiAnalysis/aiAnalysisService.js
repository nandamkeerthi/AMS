import aiAnalysisData from '@/data/dummy/aiAnalysis.json';

const SIMULATED_DELAY_MS = 350;

function delay(ms = SIMULATED_DELAY_MS) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

function formatDateTime(iso) {
  return new Date(iso).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function buildReportContent(data) {
  const lines = [
    'AMS Workbench — AI Analysis Report',
    '===================================',
    '',
    `Incident: ${data.incidentSummary.id} — ${data.incidentSummary.title}`,
    `Generated: ${formatDateTime(data.pageConfig.generatedAt)}`,
    `Confidence: ${data.confidenceScore.overall}%`,
    `Risk Level: ${data.riskLevel.level}`,
    '',
    'INCIDENT SUMMARY',
    '----------------',
    data.incidentSummary.description,
    `Business Impact: ${data.incidentSummary.businessImpact}`,
    '',
    'ROOT CAUSE',
    '----------',
    data.rootCause.summary,
    data.rootCause.detail,
    '',
    'Contributing Factors:',
    ...data.rootCause.contributingFactors.map((factor) => `- ${factor}`),
    '',
    'SUGGESTED FIXES',
    '---------------',
    ...data.suggestedFixes.map(
      (fix) =>
        `- ${fix.title} (${fix.confidence}% confidence, ${fix.effort} effort)\n  ${fix.description}`
    ),
    '',
    'ALTERNATIVE FIXES',
    '-----------------',
    ...data.alternativeFixes.map(
      (fix) =>
        `- ${fix.title} (${fix.confidence}% confidence)\n  ${fix.description}\n  Tradeoff: ${fix.tradeoff}`
    ),
    '',
    'AFFECTED SERVICES',
    '-----------------',
    ...data.affectedServices.map(
      (service) => `- ${service.name} [${service.status}]: ${service.impact}`
    ),
    '',
    'HIGHLIGHTED LOG LINES',
    '---------------------',
    ...data.highlightedLogLines.map(
      (line) => `L${line.lineNumber} [${line.level}] ${line.text}\n  Reason: ${line.reason}`
    ),
    '',
    'RECOMMENDED KNOWLEDGE ARTICLES',
    '------------------------------',
    ...data.knowledgeArticles.map(
      (article) => `- ${article.id}: ${article.title} (${article.relevance}% relevance)`
    ),
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

export const aiAnalysisService = {
  async getPageData() {
    await delay();
    return aiAnalysisData;
  },

  formatDateTime,
  buildReportContent,
  triggerDownload,
};

export default aiAnalysisService;
