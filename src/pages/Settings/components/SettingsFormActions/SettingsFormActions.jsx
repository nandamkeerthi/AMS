import { Button, CircularProgress } from '@mui/material';
import { FiSave, FiRotateCcw } from 'react-icons/fi';
import styles from './SettingsFormActions.module.css';

function SettingsFormActions({ onSave, onReset, saving }) {
  return (
    <div className={styles.actions}>
      <Button
        variant="contained"
        startIcon={saving ? <CircularProgress size={16} color="inherit" /> : <FiSave />}
        onClick={onSave}
        disabled={saving}
        className={styles.btn}
      >
        Save
      </Button>
      <Button
        variant="outlined"
        startIcon={<FiRotateCcw />}
        onClick={onReset}
        disabled={saving}
        className={styles.btn}
      >
        Reset
      </Button>
    </div>
  );
}

export default SettingsFormActions;
