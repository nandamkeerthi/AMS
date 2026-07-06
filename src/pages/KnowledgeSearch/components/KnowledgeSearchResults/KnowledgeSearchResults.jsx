import { Button } from '@mui/material';
import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined';
import { DataTable, EmptyState } from '@/components/common';
import KnowledgeArticleCard from '../KnowledgeArticleCard';
import styles from './KnowledgeSearchResults.module.css';

function KnowledgeSearchResults({
  articles = [],
  isMobile = false,
  onViewArticle,
  emptyTitle = 'No articles found',
  emptyDescription = 'Try adjusting your search or filters.',
}) {
  if (!articles.length) {
    return (
      <EmptyState
        title={emptyTitle}
        description={emptyDescription}
        compact
      />
    );
  }

  if (isMobile) {
    return (
      <div className={styles.cardGrid}>
        {articles.map((article) => (
          <KnowledgeArticleCard
            key={article.id}
            article={article}
            onView={onViewArticle}
          />
        ))}
      </div>
    );
  }

  const columns = [
    {
      key: 'id',
      label: 'ID',
      width: '90px',
      render: (row) => <span className={styles.id}>{row.id}</span>,
    },
    {
      key: 'title',
      label: 'Title',
      render: (row) => (
        <div>
          <span className={styles.title}>{row.title}</span>
          <span className={styles.description}>{row.shortDescription}</span>
        </div>
      ),
    },
    {
      key: 'category',
      label: 'Category',
      width: '120px',
      render: (row) => <span className={styles.muted}>{row.category}</span>,
    },
    {
      key: 'author',
      label: 'Author',
      width: '120px',
      render: (row) => <span className={styles.muted}>{row.author}</span>,
    },
    {
      key: 'lastUpdated',
      label: 'Updated',
      width: '110px',
      render: (row) => (
        <span className={styles.muted}>
          {new Date(row.lastUpdated).toLocaleDateString('en-US', {
            month: 'short', day: 'numeric', year: 'numeric',
          })}
        </span>
      ),
    },
    {
      key: 'viewCount',
      label: 'Views',
      width: '80px',
      render: (row) => <span className={styles.muted}>{row.viewCount.toLocaleString()}</span>,
    },
    {
      key: 'aiRelevanceScore',
      label: 'AI Score',
      width: '90px',
      render: (row) => (
        <span className={styles.aiScore}>
          <AutoAwesomeOutlinedIcon fontSize="inherit" />
          {row.aiRelevanceScore}%
        </span>
      ),
    },
    {
      key: 'actions',
      label: '',
      width: '120px',
      render: (row) => (
        <Button
          size="small"
          variant="outlined"
          onClick={(event) => {
            event.stopPropagation();
            onViewArticle?.(row);
          }}
          className={styles.viewBtn}
        >
          View article
        </Button>
      ),
    },
  ];

  return (
    <div className={styles.tableWrap}>
      <DataTable
        columns={columns}
        data={articles}
        onRowClick={onViewArticle}
        emptyTitle={emptyTitle}
        emptyDescription={emptyDescription}
      />
    </div>
  );
}

export default KnowledgeSearchResults;
