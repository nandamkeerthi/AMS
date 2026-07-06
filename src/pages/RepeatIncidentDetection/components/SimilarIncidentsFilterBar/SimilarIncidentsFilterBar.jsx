import { MenuItem, TextField } from '@mui/material';
import { SearchBar } from '@/components/common';
import styles from './SimilarIncidentsFilterBar.module.css';

const selectSx = {
  '& .MuiOutlinedInput-root': { borderRadius: '4px', fontSize: '0.875rem' },
};

function SimilarIncidentsFilterBar({
  search,
  onSearchChange,
  application,
  onApplicationChange,
  status,
  onStatusChange,
  applicationOptions = [],
  statusOptions = [],
  resultCount = 0,
}) {
  return (
    <div className={styles.filterBar} role="search">
      <div className={styles.searchWrap}>
        <SearchBar
          value={search}
          onChange={onSearchChange}
          placeholder="Search similar incidents by ID, title, root cause..."
          fullWidth
          compact
          ariaLabel="Search similar incidents"
        />
      </div>
      <TextField
        select
        size="small"
        label="Application"
        value={application}
        onChange={(event) => onApplicationChange(event.target.value)}
        className={styles.select}
        sx={selectSx}
        aria-label="Filter by application"
      >
        {applicationOptions.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        select
        size="small"
        label="Status"
        value={status}
        onChange={(event) => onStatusChange(event.target.value)}
        className={styles.select}
        sx={selectSx}
        aria-label="Filter by status"
      >
        {statusOptions.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
      <span className={styles.resultCount}>
        {resultCount} result{resultCount === 1 ? '' : 's'}
      </span>
    </div>
  );
}

export default SimilarIncidentsFilterBar;
