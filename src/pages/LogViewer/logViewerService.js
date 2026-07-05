import logViewerData from '@/data/dummy/logViewer.json';
import { delay } from '@/utils/async';
import { triggerDownload } from '@/utils/download';

const SIMULATED_DELAY_MS = 350;

function formatTimestamp(iso) {
  const date = new Date(iso);
  const base = date.toISOString().replace('T', ' ').slice(0, 19);
  const ms = String(date.getUTCMilliseconds()).padStart(3, '0');
  return `${base}.${ms}`;
}

function formatLogLine(entry) {
  const timestamp = formatTimestamp(entry.timestamp);
  const level = entry.level.padEnd(5, ' ');
  return `${timestamp}  ${level}  [${entry.source}]  ${entry.message}`;
}

function buildLogLines(logs = []) {
  return logs.map((entry, index) => ({
    id: entry.id,
    lineNumber: index + 1,
    level: entry.level,
    source: entry.source,
    timestamp: entry.timestamp,
    message: entry.message,
    text: formatLogLine(entry),
  }));
}

function filterLines(lines, { level = 'ALL', search = '' } = {}) {
  let result = lines;

  if (level !== 'ALL') {
    result = result.filter((line) => line.level === level);
  }

  const query = search.trim().toLowerCase();
  if (query) {
    result = result.filter(
      (line) =>
        line.text.toLowerCase().includes(query) ||
        line.message.toLowerCase().includes(query) ||
        line.source.toLowerCase().includes(query)
    );
  }

  return result;
}

function countMatches(lines, search = '') {
  const query = search.trim().toLowerCase();
  if (!query) return 0;

  return lines.reduce((count, line) => {
    const text = line.text.toLowerCase();
    let index = text.indexOf(query);
    let lineMatches = 0;

    while (index !== -1) {
      lineMatches += 1;
      index = text.indexOf(query, index + query.length);
    }

    return count + lineMatches;
  }, 0);
}

function buildExportContent(lines) {
  return lines.map((line) => line.text).join('\n');
}

export const logViewerService = {
  async getPageData() {
    await delay(SIMULATED_DELAY_MS);
    return {
      ...logViewerData,
      lines: buildLogLines(logViewerData.logs),
    };
  },

  formatLogLine,
  buildLogLines,
  filterLines,
  countMatches,
  buildExportContent,
  triggerDownload,
};

export default logViewerService;
