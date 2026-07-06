import { MenuItem, TextField } from '@mui/material';
import { SearchBar } from '@/components/common';
import styles from './IncidentFilterBar.module.css';

const PRIORITY_OPTIONS = [
  { value: 'all', label: 'All priorities' },
  { value: 'critical', label: 'Critical' },
  { value: 'high', label: 'High' },
  { value: 'medium', label: 'Medium' },
  { value: 'low', label: 'Low' },
];

const STATUS_OPTIONS = [
  { value: 'all', label: 'All statuses' },
  { value: 'open', label: 'Open' },
  { value: 'in_progress', label: 'In Progress' },
  { value: 'resolved', label: 'Resolved' },
  { value: 'closed', label: 'Closed' },
];

const APPLICATION_OPTIONS = [
  { value: 'all', label: 'All applications' },
  { value: 'Core Banking API', label: 'Core Banking API' },
  { value: 'Customer Portal', label: 'Customer Portal' },
  { value: 'Payment Gateway', label: 'Payment Gateway' },
  { value: 'Identity Service', label: 'Identity Service' },
  { value: 'Data Pipeline', label: 'Data Pipeline' },
  { value: 'Analytics Platform', label: 'Analytics Platform' },
  { value: 'Monitoring Stack', label: 'Monitoring Stack' },
];

function IncidentFilterBar({
  search,
  onSearchChange,
  priority,
  onPriorityChange,
  status,
  onStatusChange,
  application,
  onApplicationChange,
}) {
  const selectSx = {
    '& .MuiOutlinedInput-root': { borderRadius: '4px', fontSize: '0.875rem' },
  };

  return (
    <div className={styles.filterBar} role="search">
      <div className={styles.searchWrap}>
        <SearchBar
          value={search}
          onChange={onSearchChange}
          placeholder="Search incidents by ID, title, assignee..."
          fullWidth
          compact
          ariaLabel="Search incidents"
        />
      </div>
      <TextField
        select
        size="small"
        value={priority}
        onChange={(e) => onPriorityChange(e.target.value)}
        className={styles.select}
        sx={selectSx}
        aria-label="Filter by priority"
      >
        {PRIORITY_OPTIONS.map((opt) => (
          <MenuItem key={opt.value} value={opt.value}>
            {opt.label}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        select
        size="small"
        value={status}
        onChange={(e) => onStatusChange(e.target.value)}
        className={styles.select}
        sx={selectSx}
        aria-label="Filter by status"
      >
        {STATUS_OPTIONS.map((opt) => (
          <MenuItem key={opt.value} value={opt.value}>
            {opt.label}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        select
        size="small"
        value={application}
        onChange={(e) => onApplicationChange(e.target.value)}
        className={styles.select}
        sx={selectSx}
        aria-label="Filter by application"
      >
        {APPLICATION_OPTIONS.map((opt) => (
          <MenuItem key={opt.value} value={opt.value}>
            {opt.label}
          </MenuItem>
        ))}
      </TextField>
    </div>
  );
}

export default IncidentFilterBar;
