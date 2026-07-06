import AttachFileOutlinedIcon from '@mui/icons-material/AttachFileOutlined';
import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined';
import { Button, IconButton, Tooltip } from '@mui/material';
import toast from 'react-hot-toast';
import { GlassCard } from '@/components/common';
import styles from './AttachmentsPanel.module.css';

function AttachmentsPanel({ attachments = [] }) {
  const handleDownload = (file) => {
    toast.success(`Downloading ${file.name} (demo)`);
  };

  if (!attachments.length) return null;

  return (
    <GlassCard title="Attachments" variant="solid">
      <ul className={styles.list}>
        {attachments.map((file) => (
          <li key={file.id} className={styles.item}>
            <AttachFileOutlinedIcon className={styles.icon} fontSize="small" aria-hidden="true" />
            <div className={styles.info}>
              <span className={styles.name}>{file.name}</span>
              <span className={styles.size}>{file.size} · {file.type.toUpperCase()}</span>
            </div>
            <Tooltip title="Download">
              <IconButton
                size="small"
                aria-label={`Download ${file.name}`}
                onClick={() => handleDownload(file)}
              >
                <DownloadOutlinedIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </li>
        ))}
      </ul>
      <Button
        size="small"
        variant="outlined"
        startIcon={<DownloadOutlinedIcon />}
        onClick={() => toast.success('Downloading all attachments (demo)')}
        className={styles.downloadAll}
      >
        Download all
      </Button>
    </GlassCard>
  );
}

export default AttachmentsPanel;
