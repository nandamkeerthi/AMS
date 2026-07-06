import incidentsData from '@/data/dummy/incidents.json';
import incidentDetails from '@/data/dummy/incidentDetail.json';
import createIncidentFormData from '@/data/dummy/createIncidentForm.json';
import engineersData from '@/data/dummy/engineers.json';
import repeatIncidentData from '@/data/dummy/repeatIncidentDetection.json';
import logUploadData from '@/data/dummy/logUpload.json';
import logViewerData from '@/data/dummy/logViewer.json';
import { delay } from '@/utils/async';
import { triggerDownload } from '@/utils/download';

/**
 * Incident service — frontend data layer for incidents, logs, and related workflows.
 * Replace dummy resolution with ASP.NET Core API calls (e.g. GET /api/incidents).
 */

function matchAiSuggestion(description = '') {
  const text = description.toLowerCase();
  const { patterns, default: fallback } = createIncidentFormData.aiSuggestions;

  if (text.trim().length < 10) {
    return fallback;
  }

  const matched = patterns.find((pattern) =>
    pattern.keywords.some((keyword) => text.includes(keyword))
  );

  return matched
    ? { ...matched, summary: matched.summary }
    : {
        priority: 'medium',
        category: 'Application',
        confidence: 76,
        summary: 'General application incident — review classification before submitting.',
      };
}

function filterSimilarIncidents(
  incidents,
  { search = '', application = 'all', status = 'all' } = {}
) {
  let result = incidents;

  if (application !== 'all') {
    result = result.filter((item) => item.application === application);
  }

  if (status !== 'all') {
    result = result.filter((item) => item.status === status);
  }

  const query = search.trim().toLowerCase();
  if (query) {
    result = result.filter(
      (item) =>
        item.id.toLowerCase().includes(query) ||
        item.title.toLowerCase().includes(query) ||
        item.rootCause.toLowerCase().includes(query) ||
        item.previousResolution?.toLowerCase().includes(query) ||
        item.matchingSignals.some((signal) => signal.toLowerCase().includes(query))
    );
  }

  return result;
}

function sortSimilarIncidents(data, sortKey, sortDirection) {
  if (!sortKey) return data;

  return [...data].sort((a, b) => {
    let aVal = a[sortKey];
    let bVal = b[sortKey];

    if (sortKey === 'resolvedAt') {
      aVal = aVal ? new Date(aVal).getTime() : 0;
      bVal = bVal ? new Date(bVal).getTime() : 0;
    }

    if (typeof aVal === 'string') {
      aVal = aVal.toLowerCase();
      bVal = bVal.toLowerCase();
    }

    if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1;
    if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });
}

function formatFileSize(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function getFileExtension(name = '') {
  const dotIndex = name.lastIndexOf('.');
  if (dotIndex === -1) return '';
  return name.slice(dotIndex).toLowerCase();
}

function buildAcceptMap(formats = []) {
  const accept = {};

  formats.forEach((format) => {
    format.mimeTypes.forEach((mime) => {
      if (!accept[mime]) {
        accept[mime] = [];
      }
      if (!accept[mime].includes(format.extension)) {
        accept[mime].push(format.extension);
      }
    });
  });

  return accept;
}

function normalizeUploadEntry(entry) {
  return {
    id: entry.id,
    name: entry.name,
    size: entry.size,
    sizeLabel: formatFileSize(entry.size),
    format: entry.format || getFileExtension(entry.name),
    status: entry.status || 'completed',
    progress: entry.progress ?? 100,
    uploadedAt: entry.uploadedAt || new Date().toISOString(),
    source: 'history',
  };
}

function createUploadFromFile(file) {
  return {
    id: `upload-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    name: file.name,
    size: file.size,
    sizeLabel: formatFileSize(file.size),
    format: getFileExtension(file.name),
    status: 'uploading',
    progress: 0,
    uploadedAt: null,
    source: 'local',
    file,
  };
}

function formatLogTimestamp(iso) {
  const date = new Date(iso);
  const base = date.toISOString().replace('T', ' ').slice(0, 19);
  const ms = String(date.getUTCMilliseconds()).padStart(3, '0');
  return `${base}.${ms}`;
}

function formatLogLine(entry) {
  const timestamp = formatLogTimestamp(entry.timestamp);
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

function filterLogLines(lines, { level = 'ALL', search = '' } = {}) {
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

function countLogMatches(lines, search = '') {
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

function buildLogExportContent(lines) {
  return lines.map((line) => line.text).join('\n');
}

export const incidentService = {
  async getIncidents() {
    await delay(800);
    return Promise.resolve(incidentsData);
  },

  async getIncidentById(id) {
    await delay(750);
    const incident = incidentDetails[id];
    if (!incident) {
      throw new Error(`Incident ${id} not found`);
    }
    return Promise.resolve(incident);
  },

  async getFormOptions() {
    await delay(600);
    return Promise.resolve(createIncidentFormData);
  },

  getAiSuggestion(description) {
    return matchAiSuggestion(description);
  },

  async submitIncident(payload) {
    await delay(900);
    return Promise.resolve({
      id: `INC-2024-${Math.floor(1800 + Math.random() * 99)}`,
      ...payload,
      status: 'open',
      createdAt: new Date().toISOString(),
    });
  },

  async saveDraft(payload) {
    await delay(400);
    return Promise.resolve({ draftId: `DRAFT-${Date.now()}`, ...payload });
  },

  async getEngineers() {
    await delay(350);
    return Promise.resolve(engineersData.engineers);
  },

  async getRepeatDetectionPageData() {
    await delay(350);
    return Promise.resolve(repeatIncidentData);
  },

  filterSimilarIncidents,
  sortSimilarIncidents,

  async getLogUploadPageData() {
    await delay(400);
    return Promise.resolve(logUploadData);
  },

  formatFileSize,
  getFileExtension,
  buildAcceptMap,
  normalizeUploadEntry,
  createUploadFromFile,

  getNextProgress(currentProgress, fileSize) {
    const increment = fileSize > 5 * 1024 * 1024 ? 8 : fileSize > 1024 * 1024 ? 14 : 22;
    return Math.min(100, currentProgress + increment + Math.floor(Math.random() * 6));
  },

  async getLogViewerPageData() {
    await delay(350);
    return Promise.resolve({
      ...logViewerData,
      lines: buildLogLines(logViewerData.logs),
    });
  },

  formatLogLine,
  buildLogLines,
  filterLines: filterLogLines,
  countMatches: countLogMatches,
  buildExportContent: buildLogExportContent,
  triggerDownload,
};

export default incidentService;
