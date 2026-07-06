import { useCallback, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { FiClock, FiCpu, FiTrendingUp } from 'react-icons/fi';
import {
  PageHeader,
  GlassCard,
  ErrorState,
  SkeletonLoader,
} from '@/components/common';
import { useAsyncData, useDebounce, useMediaQuery } from '@/hooks';
import { BREAKPOINTS } from '@/utils/constants';
import { knowledgeService } from '@/services/knowledgeService';
import {
  CategoriesPanel,
  KnowledgeFilterBar,
  KnowledgeSortBar,
  ArticleSection,
  KnowledgeSearchResults,
} from './components';
import styles from './KnowledgeSearch.module.css';

function KnowledgeSearch() {
  const { data, loading, error, refetch } = useAsyncData(
    () => knowledgeService.getSearchPageData(),
    []
  );

  const isMobile = useMediaQuery(BREAKPOINTS.tablet);

  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [applicationFilter, setApplicationFilter] = useState('all');
  const [tagFilter, setTagFilter] = useState('all');
  const [categoryNavId, setCategoryNavId] = useState('all');
  const [sortBy, setSortBy] = useState('relevance');

  const debouncedSearch = useDebounce(search, 300);
  const isSearching = Boolean(debouncedSearch.trim());

  const filteredArticles = useMemo(() => {
    if (!data) return [];

    const filtered = knowledgeService.filterArticles(data.articles, {
      search: debouncedSearch,
      category: categoryFilter,
      application: applicationFilter,
      tag: tagFilter,
      categoryId: categoryNavId,
    });

    return knowledgeService.sortArticles(filtered, sortBy, debouncedSearch);
  }, [
    data,
    debouncedSearch,
    categoryFilter,
    applicationFilter,
    tagFilter,
    categoryNavId,
    sortBy,
  ]);

  const aiSuggested = useMemo(
    () => (data ? knowledgeService.getArticlesByIds(data.articles, data.aiSuggestedIds) : []),
    [data]
  );

  const recentArticles = useMemo(
    () => (data ? knowledgeService.getArticlesByIds(data.articles, data.recentIds) : []),
    [data]
  );

  const popularArticles = useMemo(
    () => (data ? knowledgeService.getArticlesByIds(data.articles, data.popularIds) : []),
    [data]
  );

  const handleCategoryNav = useCallback((categoryId) => {
    setCategoryNavId(categoryId);
    if (categoryId === 'all') {
      setCategoryFilter('all');
    } else {
      const map = {
        runbook: 'Runbook',
        troubleshooting: 'Troubleshooting',
        'best-practice': 'Best Practice',
        architecture: 'Architecture',
      };
      setCategoryFilter(map[categoryId] || 'all');
    }
  }, []);

  const handleViewArticle = useCallback((article) => {
    toast.success(`Opening ${article.id}: ${article.title} (demo)`);
  }, []);

  if (loading) {
    return (
      <div className={styles.page}>
        <SkeletonLoader variant="page" />
      </div>
    );
  }

  if (error || !data) {
    return (
      <ErrorState
        title="Unable to load knowledge search"
        description={error || 'Something went wrong while loading knowledge articles.'}
        actionLabel="Retry"
        onAction={refetch}
      />
    );
  }

  return (
    <div className={styles.page}>
      <PageHeader
        title={data.pageConfig.title}
        subtitle={data.pageConfig.subtitle}
        breadcrumbs={[
          { label: 'Home' },
          { label: 'Knowledge Search' },
        ]}
      />

      <div className={styles.layout}>
        <aside className={styles.sidebar}>
          <CategoriesPanel
            categories={data.categories}
            activeId={categoryNavId}
            onSelect={handleCategoryNav}
          />
        </aside>

        <div className={styles.main}>
          <GlassCard variant="solid" noPadding className={styles.searchCard}>
            <KnowledgeFilterBar
              search={search}
              onSearchChange={setSearch}
              category={categoryFilter}
              onCategoryChange={(value) => {
                setCategoryFilter(value);
                setCategoryNavId('all');
              }}
              application={applicationFilter}
              onApplicationChange={setApplicationFilter}
              tag={tagFilter}
              onTagChange={setTagFilter}
              categoryOptions={data.filterOptions.categories}
              applicationOptions={data.filterOptions.applications}
              tagOptions={data.filterOptions.tags}
            />
            <KnowledgeSortBar
              sortBy={sortBy}
              onSortChange={setSortBy}
              resultCount={filteredArticles.length}
            />
          </GlassCard>

          {isSearching || categoryFilter !== 'all' || applicationFilter !== 'all' || tagFilter !== 'all' || categoryNavId !== 'all' ? (
            <GlassCard
              title="Search Results"
              subtitle={`${filteredArticles.length} article${filteredArticles.length === 1 ? '' : 's'} matching your criteria`}
              variant="solid"
              noPadding
            >
              <KnowledgeSearchResults
                articles={filteredArticles}
                isMobile={isMobile}
                onViewArticle={handleViewArticle}
              />
            </GlassCard>
          ) : (
            <>
              <ArticleSection
                title="AI Suggested Articles"
                subtitle="Personalized recommendations based on recent incidents"
                articles={aiSuggested}
                icon={FiCpu}
                onViewArticle={handleViewArticle}
              />
              <ArticleSection
                title="Recent Articles"
                subtitle="Recently updated documentation"
                articles={recentArticles}
                icon={FiClock}
                onViewArticle={handleViewArticle}
              />
              <ArticleSection
                title="Popular Articles"
                subtitle="Most viewed across the organization"
                articles={popularArticles}
                icon={FiTrendingUp}
                onViewArticle={handleViewArticle}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default KnowledgeSearch;
