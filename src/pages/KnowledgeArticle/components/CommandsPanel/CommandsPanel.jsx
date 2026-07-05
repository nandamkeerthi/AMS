import { Button, IconButton, Tooltip } from '@mui/material';
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
import toast from 'react-hot-toast';
import { GlassCard } from '@/components/common';
import styles from './CommandsPanel.module.css';

function CommandsPanel({ commands = [] }) {
  const handleCopy = async (command) => {
    try {
      await navigator.clipboard.writeText(command);
      toast.success('Command copied');
    } catch {
      toast.error('Unable to copy command');
    }
  };

  if (!commands.length) return null;

  return (
    <GlassCard title="Commands" subtitle="Copy and run in your terminal" variant="solid">
      <ul className={styles.list}>
        {commands.map((entry) => (
          <li key={entry.id} className={styles.item}>
            <div className={styles.header}>
              <span className={styles.label}>{entry.label}</span>
              <Tooltip title="Copy command">
                <IconButton
                  size="small"
                  aria-label={`Copy ${entry.label}`}
                  onClick={() => handleCopy(entry.command)}
                  className={styles.copyBtn}
                >
                  <ContentCopyOutlinedIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </div>
            {entry.description && (
              <p className={styles.description}>{entry.description}</p>
            )}
            <pre className={styles.code}>
              <code>{entry.command}</code>
            </pre>
            <Button
              size="small"
              variant="outlined"
              startIcon={<ContentCopyOutlinedIcon />}
              onClick={() => handleCopy(entry.command)}
              className={styles.copyButton}
            >
              Copy
            </Button>
          </li>
        ))}
      </ul>
    </GlassCard>
  );
}

export default CommandsPanel;
