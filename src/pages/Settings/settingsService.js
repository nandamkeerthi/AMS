import settingsData from '@/data/dummy/settings.json';
import { delay } from '@/utils/async';

const LOAD_DELAY_MS = 400;
const SAVE_DELAY_MS = 600;

function buildFormValues(data) {
  return {
    theme: data.defaults.theme,
    language: data.defaults.language,
    timezone: data.defaults.timezone,
    notifications: { ...data.defaults.notifications },
    dashboard: { ...data.defaults.dashboard },
  };
}

export const settingsService = {
  async getPageData() {
    await delay(LOAD_DELAY_MS);
    return settingsData;
  },

  async saveSettings(formValues) {
    await delay(SAVE_DELAY_MS);
    return {
      success: true,
      settings: formValues,
      savedAt: new Date().toISOString(),
    };
  },

  buildFormValues,
};

export default settingsService;
