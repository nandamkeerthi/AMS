import knowledgeSearchData from '@/data/dummy/knowledgeSearch.json';

import { delay } from '@/utils/async';

const SIMULATED_DELAY_MS = 350;

function getArticlesByIds(articles, ids = []) {
  const map = new Map(articles.map((article) => [article.id, article]));
  return ids.map((id) => map.get(id)).filter(Boolean);
}

function computeSearchScore(article, query) {
  const q = query.toLowerCase();
  let score = article.aiRelevanceScore * 0.3;

  if (article.title.toLowerCase().includes(q)) score += 40;
  if (article.shortDescription.toLowerCase().includes(q)) score += 20;
  if (article.id.toLowerCase().includes(q)) score += 15;
  if (article.author.toLowerCase().includes(q)) score += 5;
  if (article.tags.some((tag) => tag.toLowerCase().includes(q))) score += 10;
  if (article.application.toLowerCase().includes(q)) score += 8;
  if (article.category.toLowerCase().includes(q)) score += 8;

  return score;
}

function filterArticles(
  articles,
  { search = '', category = 'all', application = 'all', tag = 'all', categoryId = 'all' } = {}
) {
  let result = articles;

  if (category !== 'all') {
    result = result.filter((article) => article.category === category);
  }

  if (categoryId !== 'all') {
    const categoryMap = {
      runbook: 'Runbook',
      troubleshooting: 'Troubleshooting',
      'best-practice': 'Best Practice',
      architecture: 'Architecture',
    };
    const mapped = categoryMap[categoryId];
    if (mapped) {
      result = result.filter((article) => article.category === mapped);
    }
  }

  if (application !== 'all') {
    result = result.filter((article) => article.application === application);
  }

  if (tag !== 'all') {
    result = result.filter((article) => article.tags.includes(tag));
  }

  const query = search.trim().toLowerCase();
  if (query) {
    result = result.filter(
      (article) =>
        article.title.toLowerCase().includes(query) ||
        article.shortDescription.toLowerCase().includes(query) ||
        article.id.toLowerCase().includes(query) ||
        article.author.toLowerCase().includes(query) ||
        article.application.toLowerCase().includes(query) ||
        article.category.toLowerCase().includes(query) ||
        article.tags.some((t) => t.toLowerCase().includes(query))
    );
  }

  return result;
}

function sortArticles(articles, sortBy = 'relevance', search = '') {
  const sorted = [...articles];

  switch (sortBy) {
    case 'most_viewed':
      return sorted.sort((a, b) => b.viewCount - a.viewCount);
    case 'recently_updated':
      return sorted.sort(
        (a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime()
      );
    case 'relevance':
    default:
      if (search.trim()) {
        return sorted.sort(
          (a, b) => computeSearchScore(b, search) - computeSearchScore(a, search)
        );
      }
      return sorted.sort((a, b) => b.aiRelevanceScore - a.aiRelevanceScore);
  }
}

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export const knowledgeSearchService = {
  async getPageData() {
    await delay(SIMULATED_DELAY_MS);
    return knowledgeSearchData;
  },

  getArticlesByIds,
  filterArticles,
  sortArticles,
  formatDate,
};

export default knowledgeSearchService;
