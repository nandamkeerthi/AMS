import { Button, Chip } from '@mui/material';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined';
import toast from 'react-hot-toast';
import styles from './KnowledgeArticleCard.module.css';

function KnowledgeArticleCard({ article, compact = false, onView }) {
  const handleView = () => {
    if (onView) {
      onView(article);
    } else {
      toast.success(`Opening ${article.id}: ${article.title} (demo)`);
    }
  };

  return (
    <article className={`${styles.card} ${compact ? styles.compact : ''}`}>
      <div className={styles.header}>
        <div className={styles.headerMain}>
          <span className={styles.articleId}>{article.id}</span>
          <Chip label={article.category} size="small" variant="outlined" className={styles.categoryChip} />
        </div>
        <span className={styles.aiScore} title="AI relevance score">
          <AutoAwesomeOutlinedIcon className={styles.aiIcon} fontSize="inherit" />
          {article.aiRelevanceScore}%
        </span>
      </div>

      <h3 className={styles.title}>{article.title}</h3>
      <p className={styles.description}>{article.shortDescription}</p>

      <div className={styles.tags}>
        {article.tags.map((tag) => (
          <Chip key={tag} label={tag} size="small" className={styles.tag} />
        ))}
      </div>

      <div className={styles.meta}>
        <span className={styles.metaItem}>
          <strong>Author:</strong> {article.author}
        </span>
        <span className={styles.metaItem}>
          <strong>Updated:</strong> {new Date(article.lastUpdated).toLocaleDateString('en-US', {
            month: 'short', day: 'numeric', year: 'numeric',
          })}
        </span>
        <span className={styles.metaItem}>
          <VisibilityOutlinedIcon className={styles.viewIcon} fontSize="inherit" />
          {article.viewCount.toLocaleString()} views
        </span>
      </div>

      <Button
        variant="outlined"
        size="small"
        onClick={handleView}
        className={styles.viewBtn}
      >
        View article
      </Button>
    </article>
  );
}

export default KnowledgeArticleCard;
