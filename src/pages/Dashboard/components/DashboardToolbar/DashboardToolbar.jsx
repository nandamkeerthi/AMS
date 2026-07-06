import { useState } from 'react';
import { Button } from '@mui/material';
import { FiDownload, FiRefreshCw } from 'react-icons/fi';
import styles from './DashboardToolbar.module.css';

const RANGES = ['24h', '7d', '30d'];

function formatUpdated(isoString) {
  if (!isoString) return '';
  return new Date(isoString).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function DashboardToolbar({ lastUpdated, onRefresh, onExport, loading }) {
  const [range, setRange] = useState('7d');

  return (
    <div className={styles.toolbar}>
      <div className={styles.left}>
        {RANGES.map((r) => (
          <button
            key={r}
            type="button"
            className={`${styles.chip} ${range === r ? styles.chipActive : ''}`}
            onClick={() => setRange(r)}
          >
            Last {r}
          </button>
        ))}
        {lastUpdated && (
          <span className={styles.updated}>
            Updated {formatUpdated(lastUpdated)}
          </span>
        )}
      </div>
      <div className={styles.right}>
        <button
          type="button"
          className={styles.iconBtn}
          onClick={onRefresh}
          aria-label="Refresh dashboard"
          disabled={loading}
        >
          <FiRefreshCw size={16} />
        </button>
        <Button
          variant="outlined"
          size="small"
          startIcon={<FiDownload size={16} />}
          onClick={onExport}
          sx={{ borderRadius: '4px', textTransform: 'none' }}
        >
          Export
        </Button>
      </div>
    </div>
  );
}

export default DashboardToolbar;
