import { useCallback, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import {
  PageHeader,
  GlassCard,
  ErrorState,
  SkeletonLoader,
} from '@/components/common';
import { useAsyncData } from '@/hooks';
import { incidentService } from '@/services/incidentService';
import { LogCodeViewer, LogViewerToolbar } from './components';
import styles from './LogViewer.module.css';

function LogViewer() {
  const { data, loading, error, refetch } = useAsyncData(
    () => incidentService.getLogViewerPageData(),
    []
  );

  const [search, setSearch] = useState('');
  const [levelFilter, setLevelFilter] = useState('ALL');

  const allLines = useMemo(() => data?.lines ?? [], [data?.lines]);

  const filteredLines = useMemo(
    () => incidentService.filterLines(allLines, { level: levelFilter, search }),
    [allLines, levelFilter, search]
  );

  const matchCount = useMemo(
    () => incidentService.countMatches(filteredLines, search),
    [filteredLines, search]
  );

  const handleCopy = useCallback(async () => {
    if (!filteredLines.length) {
      toast.error('No log lines to copy');
      return;
    }

    const content = incidentService.buildExportContent(filteredLines);

    try {
      await navigator.clipboard.writeText(content);
      toast.success('Logs copied to clipboard');
    } catch {
      toast.error('Unable to copy logs');
    }
  }, [filteredLines]);

  const handleDownload = useCallback(() => {
    if (!filteredLines.length) {
      toast.error('No log lines to download');
      return;
    }

    const content = incidentService.buildExportContent(filteredLines);
    const fileName = data?.pageConfig.fileName || 'application.log';
    incidentService.triggerDownload(content, fileName);
    toast.success('Log file downloaded');
  }, [filteredLines, data?.pageConfig.fileName]);

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
        title="Unable to load log viewer"
        description={error || 'Something went wrong while loading log data.'}
        actionLabel="Retry"
        onAction={refetch}
      />
    );
  }

  const errorCount = allLines.filter((line) => line.level === 'ERROR').length;
  const warnCount = allLines.filter((line) => line.level === 'WARN').length;

  return (
    <div className={styles.page}>
      <PageHeader
        title={data.pageConfig.title}
        subtitle={data.pageConfig.subtitle}
        breadcrumbs={[
          { label: 'Home' },
          { label: 'Log Viewer' },
        ]}
      />

      <div className={styles.metaBar}>
        <div className={styles.metaItem}>
          <span className={styles.metaLabel}>File</span>
          <span className={styles.metaValue}>{data.pageConfig.fileName}</span>
        </div>
        <div className={styles.metaItem}>
          <span className={styles.metaLabel}>Source</span>
          <span className={styles.metaValue}>{data.pageConfig.source}</span>
        </div>
        <div className={styles.metaItem}>
          <span className={styles.metaLabel}>Lines</span>
          <span className={styles.metaValue}>{data.pageConfig.totalLines}</span>
        </div>
        <div className={styles.metaItem}>
          <span className={styles.metaLabel}>Errors</span>
          <span className={`${styles.metaValue} ${styles.metaError}`}>{errorCount}</span>
        </div>
        <div className={styles.metaItem}>
          <span className={styles.metaLabel}>Warnings</span>
          <span className={`${styles.metaValue} ${styles.metaWarn}`}>{warnCount}</span>
        </div>
      </div>

      <GlassCard variant="solid" noPadding className={styles.viewerCard}>
        <LogViewerToolbar
          search={search}
          onSearchChange={setSearch}
          levelFilter={levelFilter}
          onLevelChange={setLevelFilter}
          levels={data.filterLevels}
          matchCount={matchCount}
          visibleLines={filteredLines.length}
          totalLines={allLines.length}
          onCopy={handleCopy}
          onDownload={handleDownload}
          fileName={data.pageConfig.fileName}
        />
        <LogCodeViewer
          lines={filteredLines}
          search={search}
        />
      </GlassCard>
    </div>
  );
}

export default LogViewer;
