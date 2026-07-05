import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { GlassCard, EmptyState } from '@/components/common';
import styles from './RelatedKnowledgePanel.module.css';

function RelatedKnowledgePanel({ articles = [] }) {
  const navigate = useNavigate();

  if (!articles.length) {
    return (
      <GlassCard title="Related Knowledge Articles" variant="solid">
        <EmptyState
          compact
          title="No related articles"
          description="Knowledge articles linked to this incident will appear here."
        />
      </GlassCard>
    );
  }

  return (
    <GlassCard title="Related Knowledge Articles" variant="solid">
      <ul className={styles.list}>
        {articles.map((article) => (
          <li key={article.id}>
            <button
              type="button"
              className={styles.item}
              onClick={() => navigate(`/knowledge/${article.id}`)}
            >
              <span className={styles.id}>{article.id}</span>
              <span className={styles.title}>{article.title}</span>
              <span className={styles.relevance}>{article.relevance}%</span>
            </button>
          </li>
        ))}
      </ul>
      <Button
        size="small"
        variant="outlined"
        onClick={() => navigate('/knowledge')}
        className={styles.browseBtn}
      >
        Browse knowledge base
      </Button>
    </GlassCard>
  );
}

export default RelatedKnowledgePanel;
