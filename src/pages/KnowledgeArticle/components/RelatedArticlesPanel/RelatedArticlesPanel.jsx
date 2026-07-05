import { useNavigate } from 'react-router-dom';
import { GlassCard } from '@/components/common';
import styles from './RelatedArticlesPanel.module.css';

function RelatedArticlesPanel({ articles = [] }) {
  const navigate = useNavigate();

  if (!articles.length) return null;

  return (
    <GlassCard title="Related Articles" variant="solid">
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
              <span className={styles.relevance}>{article.relevance}% relevant</span>
            </button>
          </li>
        ))}
      </ul>
    </GlassCard>
  );
}

export default RelatedArticlesPanel;
