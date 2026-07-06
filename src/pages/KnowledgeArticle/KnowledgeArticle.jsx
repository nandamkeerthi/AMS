import { useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import toast from 'react-hot-toast';
import {
  PageHeader,
  GlassCard,
  ErrorState,
  SkeletonLoader,
} from '@/components/common';
import { useAsyncData } from '@/hooks';
import { knowledgeService } from '@/services/knowledgeService';
import {
  ArticleMetadata,
  AiSummaryPanel,
  CommandsPanel,
  RelatedArticlesPanel,
  AttachmentsPanel,
  FeedbackPanel,
} from './components';
import styles from './KnowledgeArticle.module.css';

function KnowledgeArticle() {
  const { id } = useParams();

  const { data: article, loading, error, refetch } = useAsyncData(
    () => knowledgeService.getArticleById(id),
    [id]
  );

  const handleEdit = useCallback(() => {
    toast.success(`Opening editor for ${id} (demo)`);
  }, [id]);

  if (loading) {
    return (
      <div className={styles.page}>
        <SkeletonLoader variant="page" />
      </div>
    );
  }

  if (error) {
    return (
      <ErrorState
        title="Article not found"
        message={error || 'The requested knowledge article could not be loaded.'}
        onRetry={refetch}
      />
    );
  }

  if (!article) {
    return (
      <ErrorState
        title="Article not found"
        message="The requested knowledge article could not be loaded."
        onRetry={refetch}
      />
    );
  }

  return (
    <div className={styles.page}>
      <PageHeader
        title={article.title}
        subtitle={article.id}
        breadcrumbs={[
          { label: 'Home' },
          { label: 'Knowledge' },
          { label: article.id },
        ]}
        actions={
          <Button
            variant="outlined"
            startIcon={<EditOutlinedIcon />}
            onClick={handleEdit}
            className={styles.editBtn}
          >
            Edit
          </Button>
        }
      />

      <ArticleMetadata metadata={article.metadata} />

      <AiSummaryPanel aiSummary={article.aiSummary} />

      <div className={styles.layout}>
        <div className={styles.main}>
          <GlassCard title="Problem" variant="solid">
            <p className={styles.prose}>{article.problem}</p>
          </GlassCard>

          <GlassCard title="Symptoms" variant="solid">
            <ul className={styles.bulletList}>
              {article.symptoms.map((symptom) => (
                <li key={symptom}>{symptom}</li>
              ))}
            </ul>
          </GlassCard>

          <GlassCard title="Root Cause" variant="solid">
            <p className={styles.prose}>{article.rootCause}</p>
          </GlassCard>

          <GlassCard title="Resolution Steps" variant="solid">
            <ol className={styles.stepsList}>
              {article.resolutionSteps.map((step, index) => (
                <li key={step.id} className={styles.step}>
                  <span className={styles.stepNumber}>{index + 1}</span>
                  <div>
                    <h4 className={styles.stepTitle}>{step.title}</h4>
                    <p className={styles.stepDescription}>{step.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </GlassCard>

          <CommandsPanel commands={article.commands} />
        </div>

        <aside className={styles.sidebar}>
          <RelatedArticlesPanel articles={article.relatedArticles} />
          <AttachmentsPanel attachments={article.attachments} />
          <FeedbackPanel />
        </aside>
      </div>
    </div>
  );
}

export default KnowledgeArticle;
