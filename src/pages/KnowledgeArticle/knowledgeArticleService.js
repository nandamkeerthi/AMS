import knowledgeArticlesData from '@/data/dummy/knowledgeArticles.json';

const SIMULATED_DELAY_MS = 350;

function delay(ms = SIMULATED_DELAY_MS) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

function formatDateTime(iso) {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export const knowledgeArticleService = {
  async getArticleById(id) {
    await delay();

    const article = knowledgeArticlesData.articles[id];
    if (!article) {
      throw new Error(`Article ${id} not found`);
    }

    return article;
  },

  formatDateTime,
};

export default knowledgeArticleService;
