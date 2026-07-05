import logUploadData from '@/data/dummy/logUpload.json';

import { delay } from '@/utils/async';

const SIMULATED_DELAY_MS = 400;

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

export const logUploadService = {
  async getPageData() {
    await delay(SIMULATED_DELAY_MS);
    return logUploadData;
  },

  formatFileSize,
  getFileExtension,
  buildAcceptMap,
  normalizeUploadEntry,
  createUploadFromFile,

  /** Simulated upload tick — returns next progress value */
  getNextProgress(currentProgress, fileSize) {
    const increment = fileSize > 5 * 1024 * 1024 ? 8 : fileSize > 1024 * 1024 ? 14 : 22;
    return Math.min(100, currentProgress + increment + Math.floor(Math.random() * 6));
  },
};

export default logUploadService;
