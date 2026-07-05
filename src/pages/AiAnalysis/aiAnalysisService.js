import aiAnalysisData from '@/data/dummy/aiAnalysis.json';
import { delay } from '@/utils/async';
import { triggerDownload } from '@/utils/download';
import { formatDateTime } from '@/utils/format';

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

export const aiAnalysisService = {
  async getPageData() {
    await delay(350);
    return aiAnalysisData;
  },

  formatDateTime,
  buildReportContent,
  triggerDownload,
};

export default aiAnalysisService;
