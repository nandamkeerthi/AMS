import { useMemo, useState, useCallback } from 'react';
import { Button } from '@mui/material';
import toast from 'react-hot-toast';
import { FiDownload, FiPlus } from 'react-icons/fi';
import {
  PageHeader,
  StatCard,
  DataTable,
  StatusBadge,
  ErrorState,
  SkeletonLoader,
  EmptyState,
} from '@/components/common';
import { useAsyncData, useDebounce } from '@/hooks';
import { getStatIcon } from '@/utils/iconMap';
import { incidentService } from '@/services/incidentService';
import { IncidentFilterBar, IncidentViewTabs } from './components';
import styles from './IncidentList.module.css';

const VIEW_TABS = [
  { id: 'all', label: 'All incidents' },
  { id: 'open', label: 'Open' },
  { id: 'critical', label: 'Critical' },
  { id: 'sla_at_risk', label: 'SLA at risk' },
  { id: 'resolved', label: 'Resolved' },
];

function formatDate(isoString) {
  return new Date(isoString).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function getSlaClass(row) {
  if (row.status === 'resolved' || row.status === 'closed') return styles.slaResolved;
  if (row.slaBreached) return styles.slaBreached;
  if (row.slaAtRisk) return styles.slaAtRisk;
  return styles.slaOk;
}

function filterByView(incidents, viewId) {
  switch (viewId) {
    case 'open':
      return incidents.filter((i) => i.status === 'open' || i.status === 'in_progress');
    case 'critical':
      return incidents.filter((i) => i.priority === 'critical');
    case 'sla_at_risk':
      return incidents.filter((i) => i.slaAtRisk || i.slaBreached);
    case 'resolved':
      return incidents.filter((i) => i.status === 'resolved' || i.status === 'closed');
    default:
      return incidents;
  }
}

function sortIncidents(data, sortKey, sortDirection) {
  if (!sortKey) return data;

  return [...data].sort((a, b) => {
    let aVal = a[sortKey];
    let bVal = b[sortKey];

    if (sortKey === 'createdAt' || sortKey === 'updatedAt') {
      aVal = new Date(aVal).getTime();
      bVal = new Date(bVal).getTime();
    }

    if (typeof aVal === 'string') {
      aVal = aVal.toLowerCase();
      bVal = bVal.toLowerCase();
    }

    if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1;
    if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });
}

function IncidentList() {
  const { data, loading, error, refetch } = useAsyncData(
    () => incidentService.getIncidents(),
    []
  );

  const [activeView, setActiveView] = useState('all');
  const [search, setSearch] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [applicationFilter, setApplicationFilter] = useState('all');
  const [sortKey, setSortKey] = useState('createdAt');
  const [sortDirection, setSortDirection] = useState('desc');

  const debouncedSearch = useDebounce(search, 300);

  const handleSort = useCallback((key) => {
    setSortKey((prev) => {
      if (prev === key) {
        setSortDirection((dir) => (dir === 'asc' ? 'desc' : 'asc'));
        return key;
      }
      setSortDirection('asc');
      return key;
    });
  }, []);

  const viewTabs = useMemo(() => {
    if (!data?.incidents) return VIEW_TABS;
    const { incidents } = data;
    return VIEW_TABS.map((tab) => ({
      ...tab,
      count: filterByView(incidents, tab.id).length,
      critical: tab.id === 'critical',
    }));
  }, [data]);

  const filteredIncidents = useMemo(() => {
    if (!data?.incidents) return [];

    let result = filterByView(data.incidents, activeView);

    if (priorityFilter !== 'all') {
      result = result.filter((i) => i.priority === priorityFilter);
    }
    if (statusFilter !== 'all') {
      result = result.filter((i) => i.status === statusFilter);
    }
    if (applicationFilter !== 'all') {
      result = result.filter((i) => i.application === applicationFilter);
    }

    if (debouncedSearch.trim()) {
      const q = debouncedSearch.toLowerCase();
      result = result.filter(
        (i) =>
          i.id.toLowerCase().includes(q) ||
          i.title.toLowerCase().includes(q) ||
          i.assignee.toLowerCase().includes(q) ||
          i.application.toLowerCase().includes(q)
      );
    }

    return sortIncidents(result, sortKey, sortDirection);
  }, [
    data,
    activeView,
    priorityFilter,
    statusFilter,
    applicationFilter,
    debouncedSearch,
    sortKey,
    sortDirection,
  ]);

  const clearFilters = () => {
    setSearch('');
    setPriorityFilter('all');
    setStatusFilter('all');
    setApplicationFilter('all');
    setActiveView('all');
  };

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
        render: (row) => (
          <div className={styles.titleCell}>
            <span className={styles.incidentTitle}>{row.title}</span>
            {row.slaBreached && <span className={styles.slaFlag}>SLA breached</span>}
          </div>
        ),
      },
      {
        key: 'application',
        label: 'Application',
        sortable: true,
        render: (row) => <span className={styles.muted}>{row.application}</span>,
      },
      {
        key: 'priority',
        label: 'Priority',
        sortable: true,
        render: (row) => <StatusBadge status={row.priority} type="priority" />,
      },
      {
        key: 'status',
        label: 'Status',
        sortable: true,
        render: (row) => <StatusBadge status={row.status} />,
      },
      {
        key: 'assignee',
        label: 'Assignee',
        sortable: true,
        render: (row) => <span className={styles.muted}>{row.assignee}</span>,
      },
      {
        key: 'slaRemaining',
        label: 'SLA',
        render: (row) => (
          <span className={`${styles.slaTime} ${getSlaClass(row)}`}>
            {row.slaRemaining ?? '—'}
          </span>
        ),
      },
      {
        key: 'createdAt',
        label: 'Created',
        sortable: true,
        render: (row) => (
          <span className={styles.muted}>{formatDate(row.createdAt)}</span>
        ),
      },
    ],
    []
  );

  if (loading) {
    return (
      <div className={styles.incidentList}>
        <SkeletonLoader variant="page" />
      </div>
    );
  }

  if (error) {
    return <ErrorState message={error} onRetry={refetch} />;
  }

  if (!data) {
    return (
      <ErrorState
        title="No incident data"
        message="Unable to load incidents."
        onRetry={refetch}
      />
    );
  }

  const hasActiveFilters =
    search ||
    priorityFilter !== 'all' ||
    statusFilter !== 'all' ||
    applicationFilter !== 'all' ||
    activeView !== 'all';

  return (
    <div className={styles.incidentList}>
      <PageHeader
        title="My Incidents"
        subtitle="Manage and track production incidents across all applications"
        breadcrumbs={[{ label: 'Home' }, { label: 'My Incidents' }]}
        variant="simple"
        actions={
          <>
            <Button
              variant="outlined"
              startIcon={<FiDownload />}
              size="small"
              sx={{ borderRadius: '4px', textTransform: 'none' }}
              onClick={() => toast.success('Incidents exported')}
            >
              Export
            </Button>
            <Button
              variant="contained"
              startIcon={<FiPlus />}
              size="small"
              sx={{ borderRadius: '4px', textTransform: 'none', boxShadow: 'none' }}
              onClick={() => toast('Create incident — coming soon', { icon: 'ℹ️' })}
            >
              Create incident
            </Button>
          </>
        }
      />

      <section className={styles.statsGrid} aria-label="Incident statistics">
        {data.stats.map((stat, index) => (
          <StatCard
            key={stat.id}
            title={stat.title}
            value={stat.value}
            change={stat.change}
            changeType={stat.changeType}
            icon={getStatIcon(stat.icon)}
            color={stat.color}
            index={index}
          />
        ))}
      </section>

      <IncidentViewTabs
        tabs={viewTabs}
        activeTab={activeView}
        onChange={setActiveView}
      />

      <IncidentFilterBar
        search={search}
        onSearchChange={setSearch}
        priority={priorityFilter}
        onPriorityChange={setPriorityFilter}
        status={statusFilter}
        onStatusChange={setStatusFilter}
        application={applicationFilter}
        onApplicationChange={setApplicationFilter}
      />

      <section className={styles.tableSection} aria-label="Incidents table">
        <div className={styles.tableHeader}>
          <h2 className={styles.tableTitle}>
            {viewTabs.find((t) => t.id === activeView)?.label ?? 'Incidents'}
          </h2>
          <span className={styles.resultCount}>
            {filteredIncidents.length} result{filteredIncidents.length !== 1 ? 's' : ''}
          </span>
        </div>
        <div className={styles.tableBody}>
          {filteredIncidents.length === 0 ? (
            <div className={styles.emptyWrap}>
              <EmptyState
                title="No incidents found"
                description={
                  hasActiveFilters
                    ? 'Try adjusting your filters or search query.'
                    : 'There are no incidents to display.'
                }
                actionLabel={hasActiveFilters ? 'Clear filters' : undefined}
                onAction={hasActiveFilters ? clearFilters : undefined}
                compact
              />
            </div>
          ) : (
            <DataTable
              columns={columns}
              data={filteredIncidents}
              sortKey={sortKey}
              sortDirection={sortDirection}
              onSort={handleSort}
              onRowClick={(row) =>
                toast(`Opening ${row.id} — detail page coming soon`, { icon: 'ℹ️' })
              }
              getRowKey={(row) => row.id}
            />
          )}
        </div>
      </section>
    </div>
  );
}

export default IncidentList;
