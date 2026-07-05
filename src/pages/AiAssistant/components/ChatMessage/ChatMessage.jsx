import { IconButton, Tooltip } from '@mui/material';
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
import SmartToyOutlinedIcon from '@mui/icons-material/SmartToyOutlined';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import toast from 'react-hot-toast';
import MarkdownContent from '../MarkdownContent';
import styles from './ChatMessage.module.css';

function formatTime(iso) {
  return new Date(iso).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });
}

function ChatMessage({ message, onCopy }) {
  const isUser = message.role === 'user';

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message.content);
      toast.success('Response copied');
      onCopy?.(message);
    } catch {
      toast.error('Unable to copy');
    }
  };

  return (
    <div className={`${styles.message} ${isUser ? styles.user : styles.assistant}`}>
      <div className={styles.avatar} aria-hidden="true">
        {isUser ? <PersonOutlineIcon fontSize="small" /> : <SmartToyOutlinedIcon fontSize="small" />}
      </div>
      <div className={styles.body}>
        <div className={styles.header}>
          <span className={styles.role}>{isUser ? 'You' : 'AI Assistant'}</span>
          {message.timestamp && (
            <time className={styles.time} dateTime={message.timestamp}>
              {formatTime(message.timestamp)}
            </time>
          )}
        </div>
        <div className={styles.content}>
          {isUser ? (
            <p className={styles.userText}>{message.content}</p>
          ) : (
            <MarkdownContent content={message.content} />
          )}
        </div>
        {!isUser && (
          <div className={styles.actions}>
            <Tooltip title="Copy response">
              <IconButton size="small" aria-label="Copy response" onClick={handleCopy}>
                <ContentCopyOutlinedIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </div>
        )}
      </div>
    </div>
  );
}

export default ChatMessage;
