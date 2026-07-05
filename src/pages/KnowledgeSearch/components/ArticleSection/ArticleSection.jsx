import { GlassCard } from '@/components/common';
import KnowledgeArticleCard from '../KnowledgeArticleCard';
import styles from './ArticleSection.module.css';

function ArticleSection({ title, subtitle, articles = [], icon: Icon, onViewArticle }) {
  if (!articles.length) return null;

  return (
    <GlassCard title={title} subtitle={subtitle} variant="solid" className={styles.section}>
      {Icon && (
        <span className={styles.iconBadge} aria-hidden="true">
          <Icon size={16} />
        </span>
      )}
      <div className={styles.grid}>
        {articles.map((article) => (
          <KnowledgeArticleCard
            key={article.id}
            article={article}
            compact
            onView={onViewArticle}
          />
        ))}
      </div>
    </GlassCard>
  );
}

export default ArticleSection;
