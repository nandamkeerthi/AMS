import {
  IconButton,
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
} from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import styles from './UploadFileList.module.css';

function formatUploadedAt(iso) {
  if (!iso) return '—';
  return new Date(iso).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function StatusCell({ status }) {
  if (status === 'completed') {
    return (
      <span className={`${styles.status} ${styles.statusCompleted}`}>
        <CheckCircleOutlineIcon fontSize="inherit" aria-hidden="true" />
        Completed
      </span>
    );
  }

  if (status === 'error') {
    return (
      <span className={`${styles.status} ${styles.statusError}`}>
        <ErrorOutlineIcon fontSize="inherit" aria-hidden="true" />
        Failed
      </span>
    );
  }

  return (
    <span className={`${styles.status} ${styles.statusUploading}`}>
      Uploading
    </span>
  );
}

function UploadFileList({ files = [], onDelete }) {
  if (!files.length) {
    return (
      <div className={styles.empty}>
        <InsertDriveFileOutlinedIcon className={styles.emptyIcon} aria-hidden="true" />
        <p className={styles.emptyTitle}>No files uploaded yet</p>
        <p className={styles.emptyText}>
          Drag and drop log files above or browse to begin an upload.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className={styles.mobileList} aria-label="Uploaded files">
        {files.map((file) => (
          <article key={file.id} className={styles.mobileCard}>
            <div className={styles.mobileHeader}>
              <span className={styles.fileName}>{file.name}</span>
              <Tooltip title="Delete file">
                <IconButton
                  size="small"
                  aria-label={`Delete ${file.name}`}
                  onClick={() => onDelete?.(file.id)}
                >
                  <DeleteOutlineIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </div>
            <div className={styles.mobileMeta}>
              <span>{file.format}</span>
              <span>{file.sizeLabel}</span>
              <StatusCell status={file.status} />
            </div>
            {file.status === 'uploading' && (
              <LinearProgress
                variant="determinate"
                value={file.progress}
                className={styles.progress}
                aria-label={`Upload progress for ${file.name}`}
              />
            )}
            {file.status === 'completed' && (
              <span className={styles.uploadedAt}>{formatUploadedAt(file.uploadedAt)}</span>
            )}
          </article>
        ))}
      </div>

      <TableContainer className={styles.tableContainer}>
        <Table size="small" aria-label="Uploaded log files">
          <TableHead>
            <TableRow>
              <TableCell>File name</TableCell>
              <TableCell>Format</TableCell>
              <TableCell>Size</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Progress</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {files.map((file) => (
              <TableRow key={file.id} hover>
                <TableCell className={styles.fileNameCell}>{file.name}</TableCell>
                <TableCell>{file.format || '—'}</TableCell>
                <TableCell>{file.sizeLabel}</TableCell>
                <TableCell>
                  <StatusCell status={file.status} />
                </TableCell>
                <TableCell className={styles.progressCell}>
                  {file.status === 'uploading' ? (
                    <div className={styles.progressWrap}>
                      <LinearProgress
                        variant="determinate"
                        value={file.progress}
                        className={styles.progress}
                        aria-label={`Upload progress for ${file.name}`}
                      />
                      <span className={styles.progressLabel}>{file.progress}%</span>
                    </div>
                  ) : file.status === 'completed' ? (
                    <span className={styles.uploadedAt}>{formatUploadedAt(file.uploadedAt)}</span>
                  ) : (
                    <span className={styles.errorText}>Upload failed</span>
                  )}
                </TableCell>
                <TableCell align="right">
                  <Tooltip title="Delete file">
                    <IconButton
                      size="small"
                      aria-label={`Delete ${file.name}`}
                      onClick={() => onDelete?.(file.id)}
                    >
                      <DeleteOutlineIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default UploadFileList;
