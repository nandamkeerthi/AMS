import incidentDetails from '@/data/dummy/incidentDetail.json';

const delay = (ms = 700) => new Promise((resolve) => setTimeout(resolve, ms));

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
