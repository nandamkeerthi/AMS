import { Button, MenuItem, TextField } from '@mui/material';
import { FiCheckCircle } from 'react-icons/fi';
import toast from 'react-hot-toast';
import styles from './ResolutionSection.module.css';

const RESOLUTION_CODES = [
  { value: 'fixed', label: 'Fixed — permanently resolved' },
  { value: 'workaround', label: 'Workaround — temporary fix applied' },
  { value: 'duplicate', label: 'Duplicate — merged with another incident' },
  { value: 'not_reproducible', label: 'Not reproducible' },
  { value: 'wont_fix', label: "Won't fix" },
];

function formatDate(iso) {
  if (!iso) return '—';
  return new Date(iso).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function ResolutionSection({ resolution, onResolve }) {
  if (resolution?.status === 'resolved') {
    return (
      <div className={styles.resolved}>
        <div className={styles.resolvedBadge}>
          <FiCheckCircle size={18} aria-hidden="true" />
          Incident resolved
        </div>
        <div className={styles.field}>
          <div className={styles.fieldLabel}>Resolution code</div>
          <div className={styles.fieldValue}>{resolution.code}</div>
        </div>
        <div className={styles.field}>
          <div className={styles.fieldLabel}>Resolved by</div>
          <div className={styles.fieldValue}>{resolution.resolvedBy}</div>
        </div>
        <div className={styles.field}>
          <div className={styles.fieldLabel}>Resolved at</div>
          <div className={styles.fieldValue}>{formatDate(resolution.resolvedAt)}</div>
        </div>
        <div className={styles.field}>
          <div className={styles.fieldLabel}>Notes</div>
          <div className={styles.fieldValue}>{resolution.notes}</div>
        </div>
      </div>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const code = formData.get('code');
    const notes = formData.get('notes');
    if (!code || !notes?.trim()) {
      toast.error('Resolution code and notes are required');
      return;
    }
    onResolve?.({ code, notes: notes.trim() });
    toast.success('Incident marked as resolved');
  };

  return (
    <div className={styles.unresolved}>
      <p className={styles.statusLabel}>Resolution</p>
      <form className={styles.form} onSubmit={handleSubmit}>
        <TextField
          select
          name="code"
          label="Resolution code"
          fullWidth
          required
          defaultValue=""
          sx={{ '& .MuiOutlinedInput-root': { borderRadius: '4px' } }}
        >
          <MenuItem value="" disabled>Select resolution code</MenuItem>
          {RESOLUTION_CODES.map((opt) => (
            <MenuItem key={opt.value} value={opt.value}>
              {opt.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          name="notes"
          label="Resolution notes"
          placeholder="Describe the root cause and fix applied..."
          multiline
          minRows={4}
          fullWidth
          required
          sx={{ '& .MuiOutlinedInput-root': { borderRadius: '4px' } }}
        />
        <div className={styles.actions}>
          <Button
            type="submit"
            variant="contained"
            startIcon={<FiCheckCircle />}
            sx={{ borderRadius: '4px', textTransform: 'none', boxShadow: 'none' }}
          >
            Mark as resolved
          </Button>
        </div>
      </form>
    </div>
  );
}

export default ResolutionSection;
