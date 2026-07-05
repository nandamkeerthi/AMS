import dashboardData from '@/data/dummy/dashboard.json';

/**
 * Simulates API delay for realistic loading states.
 * @param {number} ms - Delay in milliseconds
 */
const delay = (ms = 800) => new Promise((resolve) => setTimeout(resolve, ms));

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
