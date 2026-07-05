import SmartToyOutlinedIcon from '@mui/icons-material/SmartToyOutlined';
import styles from './TypingIndicator.module.css';

function TypingIndicator() {
  return (
    <div className={styles.indicator} role="status" aria-label="AI is typing">
      <div className={styles.avatar} aria-hidden="true">
        <SmartToyOutlinedIcon fontSize="small" />
      </div>
      <div className={styles.dots}>
        <span className={styles.dot} />
        <span className={styles.dot} />
        <span className={styles.dot} />
      </div>
      <span className={styles.label}>AI Assistant is thinking...</span>
    </div>
  );
}

export default TypingIndicator;
