import formOptions from '@/data/dummy/createKnowledgeArticle.json';

const delay = (ms = 450) => new Promise((resolve) => setTimeout(resolve, ms));

export const createKnowledgeArticleService = {
  async getFormOptions() {
    await delay(400);
    return formOptions;
  },

  async saveDraft(payload) {
    await delay(600);
    return {
      draftId: `DRAFT-KB-${Date.now()}`,
      ...payload,
      status: 'draft',
      savedAt: new Date().toISOString(),
    };
  },

  async publishArticle(payload) {
    await delay(900);
    return {
      id: `KB-${Math.floor(1100 + Math.random() * 899)}`,
      ...payload,
      status: 'published',
      publishedAt: new Date().toISOString(),
    };
  },
};

export default createKnowledgeArticleService;
