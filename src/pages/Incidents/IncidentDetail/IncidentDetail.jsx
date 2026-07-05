import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { PageHeader, GlassCard, ErrorState, SkeletonLoader } from '@/components/common';
import { useAsyncData } from '@/hooks';
import { incidentDetailService } from './incidentDetailService';
import {
  IncidentDetailHeader,
  IncidentSummary,
  IncidentTimeline,
  LogsViewer,
  AiAnalysisCard,
  SuggestedFixes,
  RelatedIncidents,
  KnowledgeArticles,
  CommentsSection,
  ResolutionSection,
  DetailTabs,
} from './components';
import styles from './IncidentDetail.module.css';

const TABS = [
  { id: 'overview', label: 'Overview' },
  { id: 'timeline', label: 'Timeline' },
  { id: 'logs', label: 'Logs' },
  { id: 'comments', label: 'Comments' },
  { id: 'resolution', label: 'Resolution' },
];

function IncidentDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [localComments, setLocalComments] = useState(null);
  const [localResolution, setLocalResolution] = useState(null);

  const { data: incident, loading, error, refetch } = useAsyncData(
    () => incidentDetailService.getIncidentById(id),
    [id]
  );

  const comments = localComments ?? incident?.comments ?? [];
  const resolution = localResolution ?? incident?.resolution;

  const handleAddComment = (content) => {
    const newComment = {
      id: `c-${Date.now()}`,
      author: 'Jane Doe',
      role: 'Support Lead',
      content,
      timestamp: new Date().toISOString(),
    };
    setLocalComments([...(localComments ?? incident?.comments ?? []), newComment]);
  };

  const handleResolve = ({ code, notes }) => {
    setLocalResolution({
      status: 'resolved',
      code,
      notes,
      resolvedBy: 'Jane Doe',
      resolvedAt: new Date().toISOString(),
    });
  };

  if (loading) {
    return (
      <div className={styles.detail}>
        <SkeletonLoader variant="page" />
      </div>
    );
  }

  if (error) {
    return (
      <ErrorState
        title="Incident not found"
        message={error}
        onRetry={() => navigate('/incidents')}
      />
    );
  }

  if (!incident) {
    return <ErrorState message="Incident data unavailable." onRetry={refetch} />;
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className={styles.overviewGrid}>
            <GlassCard title="Incident summary" variant="solid">
              <IncidentSummary incident={incident} />
            </GlassCard>
            <GlassCard title="AI analysis" variant="solid">
              <AiAnalysisCard analysis={incident.aiAnalysis} />
            </GlassCard>
            <GlassCard title="Suggested fixes" variant="solid">
              <SuggestedFixes
                fixes={incident.suggestedFixes}
                onApply={(fix) => toast.success(`Applying: ${fix.title}`)}
              />
            </GlassCard>
          </div>
        );
      case 'timeline':
        return (
          <GlassCard title="Activity timeline" variant="solid">
            <IncidentTimeline events={incident.timeline} />
          </GlassCard>
        );
      case 'logs':
        return (
          <GlassCard title="System logs" subtitle="Filtered log entries related to this incident" variant="solid">
            <LogsViewer logs={incident.logs} />
          </GlassCard>
        );
      case 'comments':
        return (
          <GlassCard title="Comments & work notes" variant="solid">
            <CommentsSection comments={comments} onAddComment={handleAddComment} />
          </GlassCard>
        );
      case 'resolution':
        return (
          <GlassCard title="Resolution" variant="solid">
            <ResolutionSection resolution={resolution} onResolve={handleResolve} />
          </GlassCard>
        );
      default:
        return null;
    }
  };

  return (
    <div className={styles.detail}>
      <PageHeader
        title="Incident details"
        breadcrumbs={[
          { label: 'Home' },
          { label: 'Incidents' },
          { label: incident.id },
        ]}
        variant="simple"
      />

      <IncidentDetailHeader
        incident={incident}
        onAssign={() => toast('Assign dialog — coming soon', { icon: 'ℹ️' })}
        onEscalate={() => toast('Incident escalated', { icon: '⬆️' })}
        onResolve={() => setActiveTab('resolution')}
      />

      <div className={styles.layout}>
        <div className={styles.main}>
          <DetailTabs tabs={TABS} activeTab={activeTab} onChange={setActiveTab}>
            {renderTabContent()}
          </DetailTabs>
        </div>

        <aside className={styles.sidebar} aria-label="Related resources">
          <GlassCard title="Related incidents" variant="solid">
            <RelatedIncidents incidents={incident.relatedIncidents} />
          </GlassCard>
          <GlassCard title="Knowledge articles" variant="solid">
            <KnowledgeArticles articles={incident.knowledgeArticles} />
          </GlassCard>
        </aside>
      </div>
    </div>
  );
}

export default IncidentDetail;
