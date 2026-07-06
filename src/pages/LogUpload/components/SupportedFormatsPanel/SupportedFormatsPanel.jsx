import { Chip, Stack } from '@mui/material';
import styles from './SupportedFormatsPanel.module.css';

function SupportedFormatsPanel({ formats = [], maxFileSizeMb = 50 }) {
  return (
    <div className={styles.panel}>
      <p className={styles.intro}>
        Upload log exports from your applications and infrastructure. Files are validated
        against supported formats before processing.
      </p>

      <ul className={styles.list}>
        {formats.map((format) => (
          <li key={format.extension} className={styles.item}>
            <div className={styles.itemHeader}>
              <Chip
                label={format.extension}
                size="small"
                className={styles.chip}
                variant="outlined"
              />
              <span className={styles.label}>{format.label}</span>
            </div>
            <p className={styles.description}>{format.description}</p>
          </li>
        ))}
      </ul>

      <Stack spacing={0.5} className={styles.limits}>
        <p className={styles.limitItem}>
          <strong>Max file size:</strong> {maxFileSizeMb} MB
        </p>
        <p className={styles.limitItem}>
          <strong>Encoding:</strong> UTF-8 recommended for text-based logs
        </p>
      </Stack>
    </div>
  );
}

export default SupportedFormatsPanel;
