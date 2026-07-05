import aiAssistantData from '@/data/dummy/aiAssistant.json';
import aiAnalysisData from '@/data/dummy/aiAnalysis.json';
import { delay } from '@/utils/async';
import { triggerDownload } from '@/utils/download';
import { formatDateTime } from '@/utils/format';

/**
 * AI service — frontend data layer for AI assistant and analysis features.
 * Replace dummy resolution with ASP.NET Core API calls (e.g. POST /api/ai/chat).
 */

const TYPING_DELAY_MS = 1200;

function matchResponse(userMessage, responses) {
  const text = userMessage.toLowerCase();
  const matched = responses.find((entry) =>
    entry.keywords.some((keyword) => keyword !== 'default' && text.includes(keyword))
  );
  return matched || responses.find((entry) => entry.keywords.includes('default'));
}

function createMessage(role, content) {
  return {
    id: `msg-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    role,
    content,
    timestamp: new Date().toISOString(),
  };
}

function buildAnalysisReportContent(data) {
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

export const aiService = {
  async getAssistantPageData() {
    await delay(350);
    return Promise.resolve(aiAssistantData);
  },

  createMessage,

  async getAiResponse(userMessage, responses) {
    await delay(TYPING_DELAY_MS);
    const matched = matchResponse(userMessage, responses);
    return Promise.resolve(createMessage('assistant', matched.content));
  },

  getHistoryMessages(historyId, data) {
    return (data.historyMessages[historyId] || []).map((msg, index) => ({
      ...msg,
      id: `hist-${historyId}-${index}`,
      timestamp: new Date().toISOString(),
    }));
  },

  async getAnalysisPageData() {
    await delay(350);
    return Promise.resolve(aiAnalysisData);
  },

  formatDateTime,
  buildReportContent: buildAnalysisReportContent,
  triggerDownload,
};

export default aiService;
