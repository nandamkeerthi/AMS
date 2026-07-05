import { useCallback, useMemo, useState } from 'react';
import { Button } from '@mui/material';
import CompareArrowsOutlinedIcon from '@mui/icons-material/CompareArrowsOutlined';
import toast from 'react-hot-toast';
import {
  PageHeader,
  GlassCard,
  DataTable,
  StatusBadge,
  ErrorState,
  SkeletonLoader,
} from '@/components/common';
import { useAsyncData, useDebounce, useMediaQuery } from '@/hooks';
import { BREAKPOINTS } from '@/utils/constants';
import { repeatIncidentService } from './repeatIncidentService';
import {
  AiRecommendationBanner,
  CurrentIncidentSummary,
  SimilarIncidentsFilterBar,
  SimilarIncidentCards,
  SimilarityBadge,
  CompareIncidentDialog,
} from './components';
import styles from './RepeatIncidentDetection.module.css';

function RepeatIncidentDetection() {
  const { data, loading, error, refetch } = useAsyncData(
    () => repeatIncidentService.getPageData(),
    []
  );

  const isMobile = useMediaQuery(BREAKPOINTS.tablet);

  const [search, setSearch] = useState('');
  const [applicationFilter, setApplicationFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortKey, setSortKey] = useState('similarity');
  const [sortDirection, setSortDirection] = useState('desc');
  const [compareTarget, setCompareTarget] = useState(null);

  const debouncedSearch = useDebounce(search, 300);

  const filteredIncidents = useMemo(() => {
    if (!data) return [];

    const filtered = repeatIncidentService.filterSimilarIncidents(
      data.similarIncidents,
      {
        search: debouncedSearch,
        application: applicationFilter,
        status: statusFilter,
      }
    );

    return repeatIncidentService.sortSimilarIncidents(filtered, sortKey, sortDirection);
  }, [data, debouncedSearch, applicationFilter, statusFilter, sortKey, sortDirection]);

  const handleSort = useCallback((key) => {
    setSortKey((prev) => {
      if (prev === key) {
        setSortDirection((dir) => (dir === 'asc' ? 'desc' : 'asc'));
        return prev;
      }
      setSortDirection(key === 'similarity' ? 'desc' : 'asc');
      return key;
    });
  }, []);

  const handleCompare = useCallback((incident) => {
    setCompareTarget(incident);
  }, []);

  const handleCloseCompare = useCallback(() => {
    setCompareTarget(null);
  }, []);

  const handleRecommendationAction = useCallback((recommendation) => {
    toast.success(`Opening ${recommendation.runbookId} (demo)`);
  }, []);

  const columns = useMemo(
    () => [
      {
        key: 'id',
        label: 'Incident ID',
        width: '130px',
        sortable: true,
        render: (row) => <span className={styles.incidentId}>{row.id}</span>,
      },
      {
        key: 'title',
        label: 'Title',
        sortable: true,
        render: (row) => <span className={styles.incidentTitle}>{row.title}</span>,
      },
      {
        key: 'application',
        label: 'Application',
        sortable: true,
        render: (row) => <span className={styles.muted}>{row.application}</span>,
      },
      {
        key: 'status',
        label: 'Status',
        sortable: true,
        render: (row) => <StatusBadge status={row.status} />,
      },
      {
        key: 'similarity',
        label: 'Similarity',
        sortable: true,
        width: '110px',
        render: (row) => <SimilarityBadge value={row.similarity} />,
      },
      {
        key: 'rootCause',
        label: 'Root Cause',
        sortable: true,
        render: (row) => <span className={styles.truncate}>{row.rootCause}</span>,
      },
      {
        key: 'previousResolution',
        label: 'Previous Resolution',
        sortable: true,
        render: (row) => (
          <span className={styles.truncate}>
            {row.previousResolution || '—'}
          </span>
        ),
      },
      {
        key: 'resolutionTime',
        label: 'Resolution Time',
        sortable: true,
        width: '120px',
        render: (row) => (
          <span className={styles.muted}>{row.resolutionTime || '—'}</span>
        ),
      },
      {
        key: 'compare',
        label: '',
        width: '110px',
        render: (row) => (
          <Button
            size="small"
            variant="outlined"
            startIcon={<CompareArrowsOutlinedIcon />}
            onClick={(event) => {
              event.stopPropagation();
              handleCompare(row);
            }}
            className={styles.compareBtn}
          >
            Compare
          </Button>
        ),
      },
    ],
    [handleCompare]
  );

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
        title="Unable to load repeat incident detection"
        description={error || 'Something went wrong while loading detection data.'}
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
          { label: data.currentIncident.id },
          { label: 'Repeat Detection' },
        ]}
      />

      <AiRecommendationBanner
        recommendation={data.aiRecommendation}
        onAction={handleRecommendationAction}
      />

      <CurrentIncidentSummary incident={data.currentIncident} />

      <GlassCard
        title="Similar Incidents"
        subtitle={`${filteredIncidents.length} match${filteredIncidents.length === 1 ? '' : 'es'} found`}
        variant="solid"
        noPadding
      >
        <SimilarIncidentsFilterBar
          search={search}
          onSearchChange={setSearch}
          application={applicationFilter}
          onApplicationChange={setApplicationFilter}
          status={statusFilter}
          onStatusChange={setStatusFilter}
          applicationOptions={data.filterOptions.applications}
          statusOptions={data.filterOptions.statuses}
          resultCount={filteredIncidents.length}
        />

        {isMobile ? (
          <SimilarIncidentCards
            incidents={filteredIncidents}
            onCompare={handleCompare}
          />
        ) : (
          <div className={styles.tableWrap}>
            <DataTable
              columns={columns}
              data={filteredIncidents}
              sortKey={sortKey}
              sortDirection={sortDirection}
              onSort={handleSort}
              emptyTitle="No similar incidents found"
              emptyDescription="Try adjusting your search or filters to find matching historical incidents."
            />
          </div>
        )}
      </GlassCard>

      <CompareIncidentDialog
        open={Boolean(compareTarget)}
        onClose={handleCloseCompare}
        currentIncident={data.currentIncident}
        similarIncident={compareTarget}
      />
    </div>
  );
}

export default RepeatIncidentDetection;
