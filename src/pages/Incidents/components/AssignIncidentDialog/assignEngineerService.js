import engineersData from '@/data/dummy/engineers.json';

import { delay } from '@/utils/async';

export const assignEngineerService = {
  async getEngineers() {
    await delay(350);
    return engineersData.engineers;
  },
};

export default assignEngineerService;
