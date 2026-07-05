import formOptions from '@/data/dummy/createIncidentForm.json';

import { delay } from '@/utils/async';

function matchAiSuggestion(description = '') {
  const text = description.toLowerCase();
  const { patterns, default: fallback } = formOptions.aiSuggestions;

  if (text.trim().length < 10) {
    return fallback;
  }

  const matched = patterns.find((pattern) =>
    pattern.keywords.some((keyword) => text.includes(keyword))
  );

  return matched
    ? { ...matched, summary: matched.summary }
    : {
        priority: 'medium',
        category: 'Application',
        confidence: 76,
        summary: 'General application incident — review classification before submitting.',
      };
}

export const createIncidentService = {
  async getFormOptions() {
    await delay(600);
    return formOptions;
  },

  getAiSuggestion(description) {
    return matchAiSuggestion(description);
  },

  async submitIncident(payload) {
    await delay(900);
    return {
      id: `INC-2024-${Math.floor(1800 + Math.random() * 99)}`,
      ...payload,
      status: 'open',
      createdAt: new Date().toISOString(),
    };
  },

  async saveDraft(payload) {
    await delay(400);
    return { draftId: `DRAFT-${Date.now()}`, ...payload };
  },
};

export default createIncidentService;
