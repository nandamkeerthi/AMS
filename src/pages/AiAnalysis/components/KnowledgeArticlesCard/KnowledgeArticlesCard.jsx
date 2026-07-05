import { Button } from '@mui/material';
import { FiBookOpen } from 'react-icons/fi';
import toast from 'react-hot-toast';
import SectionCard from '../SectionCard';
import styles from './KnowledgeArticlesCard.module.css';

function KnowledgeArticlesCard({ articles = [] }) {
  const handleOpen = (article) => {
    toast.success(`Opening ${article.id}: ${article.title} (demo)`);
  };

  return (
    <SectionCard
      title="Recommended Knowledge Articles"
      subtitle="Runbooks and documentation matched to this incident"
      icon={FiBookOpen}
      accent="info"
      className={styles.card}
    >
      <ul className={styles.list}>
        {articles.map((article) => (
          <li key={article.id} className={styles.item}>
            <div className={styles.header}>
              <div>
                <span className={styles.articleId}>{article.id}</span>
                <h4 className={styles.title}>{article.title}</h4>
              </div>
              <span className={styles.relevance}>{article.relevance}%</span>
            </div>
            <p className={styles.summary}>{article.summary}</p>
            <div className={styles.footer}>
              <span className={styles.category}>{article.category}</span>
              <Button
                size="small"
                variant="outlined"
                onClick={() => handleOpen(article)}
                className={styles.openBtn}
              >
                View article
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </SectionCard>
  );
}

export default KnowledgeArticlesCard;
