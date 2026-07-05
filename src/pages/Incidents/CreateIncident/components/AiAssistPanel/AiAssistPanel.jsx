import { Button } from '@mui/material';
import { FiCpu } from 'react-icons/fi';
import { StatusBadge } from '@/components/common';
import styles from './AiAssistPanel.module.css';

function AiAssistPanel({
  suggestion,
  similarIncidents = [],
  knowledgeArticles = [],
  onApplySuggestion,
}) {
  return (
    <div className={styles.panel}>
      <div className={styles.header}>
        <div className={styles.icon} aria-hidden="true">
          <FiCpu size={18} />
        </div>
        <div>
          <h3 className={styles.title}>AI Assist</h3>
          <p className={styles.subtitle}>Classification suggestions based on your description</p>
        </div>
      </div>

      <div className={styles.suggestionCard}>
        <p className={styles.summary}>{suggestion.summary}</p>
        <div className={styles.badges}>
          <StatusBadge status={suggestion.priority} type="priority" />
          <span className={styles.confidence}>{suggestion.confidence}% confidence</span>
        </div>
        <p className={styles.summary}>
          Suggested category: <strong>{suggestion.category}</strong>
        </p>
        <Button
          size="small"
          variant="outlined"
          className={styles.applyBtn}
          onClick={onApplySuggestion}
          sx={{ borderRadius: '4px', textTransform: 'none' }}
        >
          Apply suggestions
        </Button>
      </div>

      {similarIncidents.length > 0 && (
        <div>
          <h4 className={styles.sectionTitle}>Similar incidents</h4>
          <ul className={styles.list}>
            {similarIncidents.map((item) => (
              <li key={item.id}>
                <button type="button" className={styles.listItem}>
                  <span className={styles.itemId}>{item.id}</span>
                  <span className={styles.itemTitle}>{item.title}</span>
                  <div className={styles.itemMeta}>
                    <StatusBadge status={item.priority} type="priority" />
                    <StatusBadge status={item.status} />
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {knowledgeArticles.length > 0 && (
        <div>
          <h4 className={styles.sectionTitle}>Suggested knowledge</h4>
          <ul className={styles.list}>
            {knowledgeArticles.map((article) => (
              <li key={article.id} className={styles.articleItem}>
                <span className={styles.articleId}>{article.id}</span>
                <span className={styles.articleTitle}>{article.title}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default AiAssistPanel;
