import incidentDetails from '@/data/dummy/incidentDetail.json';

import { delay } from '@/utils/async';

export const incidentDetailService = {
  async getIncidentById(id) {
    await delay(750);
    const incident = incidentDetails[id];
    if (!incident) {
      throw new Error(`Incident ${id} not found`);
    }
    return incident;
  },
};

export default incidentDetailService;
