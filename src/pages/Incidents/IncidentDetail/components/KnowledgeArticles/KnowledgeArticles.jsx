import toast from 'react-hot-toast';
import styles from './KnowledgeArticles.module.css';

function KnowledgeArticles({ articles = [] }) {
  if (!articles.length) {
    return <p className={styles.empty}>No related knowledge articles.</p>;
  }

  return (
    <ul className={styles.list}>
      {articles.map((article) => (
        <li key={article.id}>
          <button
            type="button"
            className={styles.item}
            onClick={() => toast(`Opening ${article.id}`, { icon: '📄' })}
          >
            <span className={styles.id}>{article.id}</span>
            <div className={styles.content}>
              <span className={styles.title}>{article.title}</span>
              <span className={styles.relevance}>{article.relevance}% relevant</span>
            </div>
          </button>
        </li>
      ))}
    </ul>
  );
}

export default KnowledgeArticles;
