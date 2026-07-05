import incidentsData from '@/data/dummy/incidents.json';

import { delay } from '@/utils/async';

export const incidentService = {
  async getIncidents() {
    await delay(800);
    return incidentsData;
  },
};

export default incidentService;
