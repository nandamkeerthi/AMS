import knowledgeArticlesData from '@/data/dummy/knowledgeArticles.json';

import { delay } from '@/utils/async';

const SIMULATED_DELAY_MS = 350;

function formatDateTime(iso) {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export const knowledgeArticleService = {
  async getArticleById(id) {
    await delay(SIMULATED_DELAY_MS);

    const article = knowledgeArticlesData.articles[id];
    if (!article) {
      throw new Error(`Article ${id} not found`);
    }

    return article;
  },

  formatDateTime,
};

export default knowledgeArticleService;
