import { MenuItem, TextField, Button } from '@mui/material';
import { FiDownload } from 'react-icons/fi';
import styles from './AnalyticsToolbar.module.css';

const selectSx = {
  '& .MuiOutlinedInput-root': { borderRadius: '4px', fontSize: '0.875rem' },
};

function AnalyticsToolbar({
  dateRange,
  onDateRangeChange,
  application,
  onApplicationChange,
  dateRangeOptions = [],
  applicationOptions = [],
  onExport,
}) {
  return (
    <div className={styles.toolbar}>
      <div className={styles.left}>
        <div className={styles.chipGroup} role="group" aria-label="Date range">
          {dateRangeOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              className={`${styles.chip} ${dateRange === option.value ? styles.chipActive : ''}`}
              onClick={() => onDateRangeChange(option.value)}
            >
              {option.label}
            </button>
          ))}
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
      </div>
      <div className={styles.right}>
        <Button
          variant="outlined"
          size="small"
          startIcon={<FiDownload size={16} />}
          onClick={onExport}
          sx={{ borderRadius: '4px', textTransform: 'none' }}
        >
          Export Report
        </Button>
      </div>
    </div>
  );
}

export default AnalyticsToolbar;
