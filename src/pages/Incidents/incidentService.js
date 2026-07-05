import incidentsData from '@/data/dummy/incidents.json';

const delay = (ms = 700) => new Promise((resolve) => setTimeout(resolve, ms));

export const incidentService = {
  async getIncidents() {
    await delay(800);
    return incidentsData;
  },
};

export default incidentService;
