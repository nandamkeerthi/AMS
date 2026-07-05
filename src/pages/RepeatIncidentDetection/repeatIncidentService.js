import repeatIncidentData from '@/data/dummy/repeatIncidentDetection.json';

import { delay } from '@/utils/async';

const SIMULATED_DELAY_MS = 350;

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

export const repeatIncidentService = {
  async getPageData() {
    await delay(SIMULATED_DELAY_MS);
    return repeatIncidentData;
  },

  filterSimilarIncidents,
  sortSimilarIncidents,
};

export default repeatIncidentService;
