import { useMemo } from 'react';
import {
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Tooltip,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined';
import FilterListOutlinedIcon from '@mui/icons-material/FilterListOutlined';
import styles from './LogViewerToolbar.module.css';

function LogViewerToolbar({
  search = '',
  onSearchChange,
  levelFilter = 'ALL',
  onLevelChange,
  levels = [],
  matchCount = 0,
  visibleLines = 0,
  totalLines = 0,
  onCopy,
  onDownload,
  fileName = 'logs.log',
}) {
  const matchLabel = useMemo(() => {
    if (!search.trim()) return `${visibleLines} of ${totalLines} lines`;
    return `${matchCount} match${matchCount === 1 ? '' : 'es'} · ${visibleLines} lines`;
  }, [search, matchCount, visibleLines, totalLines]);

  return (
    <div className={styles.toolbar}>
      <div className={styles.searchRow}>
        <TextField
          size="small"
          placeholder="Search logs..."
          value={search}
          onChange={(event) => onSearchChange?.(event.target.value)}
          className={styles.searchField}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon fontSize="small" />
              </InputAdornment>
            ),
          }}
          inputProps={{ 'aria-label': 'Search logs' }}
        />
        <span className={styles.matchCount}>{matchLabel}</span>
      </div>

      <div className={styles.actionsRow}>
        <div className={styles.filters} role="toolbar" aria-label="Log level filters">
          <FilterListOutlinedIcon className={styles.filterIcon} fontSize="small" aria-hidden="true" />
          {levels.map((level) => (
            <button
              key={level}
              type="button"
              className={`${styles.filterChip} ${styles[`level${level}`] || ''} ${levelFilter === level ? styles.filterChipActive : ''}`}
              onClick={() => onLevelChange?.(level)}
            >
              {level}
            </button>
          ))}
        </div>

        <div className={styles.actions}>
          <Tooltip title="Copy visible logs">
            <IconButton
              size="small"
              aria-label="Copy visible logs"
              onClick={onCopy}
              className={styles.actionButton}
            >
              <ContentCopyOutlinedIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title={`Download as ${fileName}`}>
            <IconButton
              size="small"
              aria-label="Download logs"
              onClick={onDownload}
              className={styles.actionButton}
            >
              <DownloadOutlinedIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Button
            type="button"
            variant="outlined"
            size="small"
            startIcon={<ContentCopyOutlinedIcon />}
            onClick={onCopy}
            className={styles.copyButton}
          >
            Copy
          </Button>
          <Button
            type="button"
            variant="contained"
            size="small"
            startIcon={<DownloadOutlinedIcon />}
            onClick={onDownload}
            className={styles.downloadButton}
          >
            Download
          </Button>
        </div>
      </div>
    </div>
  );
}

export default LogViewerToolbar;
