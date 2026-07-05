import { delay } from '@/utils/async';
import aiAssistantData from '@/data/dummy/aiAssistant.json';

const TYPING_DELAY_MS = 1200;
const LOAD_DELAY_MS = 350;

function matchResponse(userMessage, responses) {
  const text = userMessage.toLowerCase();
  const matched = responses.find((entry) =>
    entry.keywords.some((keyword) => keyword !== 'default' && text.includes(keyword))
  );
  return matched || responses.find((entry) => entry.keywords.includes('default'));
}

function createMessage(role, content) {
  return {
    id: `msg-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    role,
    content,
    timestamp: new Date().toISOString(),
  };
}

export const aiAssistantService = {
  async getPageData() {
    await delay(LOAD_DELAY_MS);
    return aiAssistantData;
  },

  createMessage,

  async getAiResponse(userMessage, responses) {
    await delay(TYPING_DELAY_MS);
    const matched = matchResponse(userMessage, responses);
    return createMessage('assistant', matched.content);
  },

  getHistoryMessages(historyId, data) {
    return (data.historyMessages[historyId] || []).map((msg, index) => ({
      ...msg,
      id: `hist-${historyId}-${index}`,
      timestamp: new Date().toISOString(),
    }));
  },
};

export default aiAssistantService;
