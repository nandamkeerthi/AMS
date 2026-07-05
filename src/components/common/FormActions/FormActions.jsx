import { Button, CircularProgress } from '@mui/material';
import { FiSave, FiRotateCcw } from 'react-icons/fi';
import styles from './FormActions.module.css';

function FormActions({
  onSave,
  onReset,
  saving = false,
  saveLabel = 'Save',
  resetLabel = 'Reset',
}) {
  return (
    <div className={styles.actions}>
      <Button
        variant="contained"
        startIcon={saving ? <CircularProgress size={16} color="inherit" /> : <FiSave />}
        onClick={onSave}
        disabled={saving}
        className={styles.btn}
      >
        {saveLabel}
      </Button>
      <Button
        variant="outlined"
        startIcon={<FiRotateCcw />}
        onClick={onReset}
        disabled={saving}
        className={styles.btn}
      >
        {resetLabel}
      </Button>
    </div>
  );
}

export default FormActions;
