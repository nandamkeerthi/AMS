import dashboardData from '@/data/dummy/dashboard.json';

import { delay } from '@/utils/async';

/**
 * Dashboard data service — returns dummy JSON with simulated latency.
 */
export const dashboardService = {
  async getDashboardData() {
    await delay(900);
    return dashboardData;
  },

  async getDashboardDataWithError() {
    await delay(500);
    throw new Error('Unable to connect to the analytics service. Please try again.');
  },
};

export default dashboardService;
