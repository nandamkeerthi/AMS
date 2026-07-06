import { useCallback } from 'react';
import { Button } from '@mui/material';
import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined';
import toast from 'react-hot-toast';
import {
  PageHeader,
  ErrorState,
  SkeletonLoader,
} from '@/components/common';
import { useAsyncData } from '@/hooks';
import { aiService } from '@/services/aiService';
import {
  IncidentSummaryCard,
  RootCauseCard,
  ConfidenceScoreCard,
  SuggestedFixesCard,
  RiskLevelCard,
  AffectedServicesCard,
  HighlightedLogsCard,
  KnowledgeArticlesCard,
  AlternativeFixesCard,
} from './components';
import styles from './AiAnalysis.module.css';

function AiAnalysis() {
  const { data, loading, error, refetch } = useAsyncData(
    () => aiService.getAnalysisPageData(),
    []
  );

  const handleDownloadReport = useCallback(() => {
    if (!data) return;

    const content = aiService.buildReportContent(data);
    aiService.triggerDownload(content, data.pageConfig.reportFileName);
    toast.success('AI analysis report downloaded');
  }, [data]);

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
        title="Unable to load AI analysis"
        description={error || 'Something went wrong while loading analysis data.'}
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
          { label: data.pageConfig.incidentId },
          { label: 'AI Analysis' },
        ]}
        actions={
          <Button
            variant="contained"
            startIcon={<DownloadOutlinedIcon />}
            onClick={handleDownloadReport}
            className={styles.downloadBtn}
          >
            Download Report
          </Button>
        }
      />

      <div className={styles.metaStrip}>
        <span>
          <strong>Incident:</strong> {data.pageConfig.incidentId}
        </span>
        <span>
          <strong>Generated:</strong>{' '}
          {aiService.formatDateTime(data.pageConfig.generatedAt)}
        </span>
        <span>
          <strong>Confidence:</strong> {data.confidenceScore.overall}%
        </span>
        <span>
          <strong>Risk:</strong> {data.riskLevel.level}
        </span>
      </div>

      <div className={styles.grid}>
        <IncidentSummaryCard summary={data.incidentSummary} />

        <ConfidenceScoreCard confidenceScore={data.confidenceScore} />
        <RiskLevelCard riskLevel={data.riskLevel} />

        <RootCauseCard rootCause={data.rootCause} />

        <SuggestedFixesCard fixes={data.suggestedFixes} />
        <AlternativeFixesCard fixes={data.alternativeFixes} />

        <AffectedServicesCard services={data.affectedServices} />
        <KnowledgeArticlesCard articles={data.knowledgeArticles} />

        <HighlightedLogsCard logLines={data.highlightedLogLines} />
      </div>
    </div>
  );
}

export default AiAnalysis;
