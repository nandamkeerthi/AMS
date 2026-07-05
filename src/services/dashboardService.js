import dashboardData from '@/data/dummy/dashboard.json';
import { delay } from '@/utils/async';

/**
 * Dashboard service — frontend data layer for dashboard metrics and widgets.
 * Replace dummy resolution with ASP.NET Core API calls (e.g. GET /api/dashboard).
 */
export const dashboardService = {
  async getDashboardData() {
    await delay(900);
    return Promise.resolve(dashboardData);
  },

  async getDashboardDataWithError() {
    await delay(500);
    throw new Error('Unable to connect to the analytics service. Please try again.');
  },
};

export default dashboardService;
