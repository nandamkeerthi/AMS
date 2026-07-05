import engineersData from '@/data/dummy/engineers.json';

const delay = (ms = 400) => new Promise((resolve) => setTimeout(resolve, ms));

export const assignEngineerService = {
  async getEngineers() {
    await delay(350);
    return engineersData.engineers;
  },
};

export default assignEngineerService;
