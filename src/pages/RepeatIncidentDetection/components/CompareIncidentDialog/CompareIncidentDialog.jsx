import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { StatusBadge } from '@/components/common';
import { SimilarityBadge } from '../SimilarIncidentCards';
import styles from './CompareIncidentDialog.module.css';

function CompareIncidentDialog({ open, onClose, currentIncident, similarIncident }) {
  if (!currentIncident || !similarIncident) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      aria-labelledby="compare-dialog-title"
    >
      <DialogTitle id="compare-dialog-title" className={styles.title}>
        Compare incidents
        <IconButton
          aria-label="Close compare dialog"
          onClick={onClose}
          className={styles.closeBtn}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers className={styles.content}>
        <div className={styles.similarityBanner}>
          <SimilarityBadge value={similarIncident.similarity} />
          <span className={styles.similarityText}>
            {similarIncident.similarity}% similarity between incidents
          </span>
        </div>

        <div className={styles.compareGrid}>
          <section className={styles.column}>
            <header className={styles.columnHeader}>
              <span className={styles.columnLabel}>Current incident</span>
              <h3 className={styles.incidentTitle}>{currentIncident.title}</h3>
              <span className={styles.incidentId}>{currentIncident.id}</span>
              <div className={styles.badges}>
                <StatusBadge status={currentIncident.priority} type="priority" />
                <StatusBadge status={currentIncident.status} />
              </div>
            </header>

            <div className={styles.field}>
              <span className={styles.fieldLabel}>Application</span>
              <p className={styles.fieldValue}>{currentIncident.application}</p>
            </div>
            <div className={styles.field}>
              <span className={styles.fieldLabel}>Root cause</span>
              <p className={styles.fieldValue}>{currentIncident.rootCause}</p>
            </div>
            <div className={styles.field}>
              <span className={styles.fieldLabel}>Previous resolution</span>
              <p className={styles.fieldValueMuted}>In progress — not yet resolved</p>
            </div>
            <div className={styles.field}>
              <span className={styles.fieldLabel}>Resolution time</span>
              <p className={styles.fieldValueMuted}>—</p>
            </div>
          </section>

          <section className={styles.column}>
            <header className={styles.columnHeader}>
              <span className={styles.columnLabel}>Similar incident</span>
              <h3 className={styles.incidentTitle}>{similarIncident.title}</h3>
              <span className={styles.incidentId}>{similarIncident.id}</span>
              <div className={styles.badges}>
                <StatusBadge status={similarIncident.priority} type="priority" />
                <StatusBadge status={similarIncident.status} />
              </div>
            </header>

            <div className={styles.field}>
              <span className={styles.fieldLabel}>Application</span>
              <p className={styles.fieldValue}>{similarIncident.application}</p>
            </div>
            <div className={styles.field}>
              <span className={styles.fieldLabel}>Root cause</span>
              <p className={styles.fieldValue}>{similarIncident.rootCause}</p>
            </div>
            <div className={styles.field}>
              <span className={styles.fieldLabel}>Previous resolution</span>
              <p className={styles.fieldValue}>
                {similarIncident.previousResolution || 'Not available'}
              </p>
            </div>
            <div className={styles.field}>
              <span className={styles.fieldLabel}>Resolution time</span>
              <p className={styles.fieldValue}>
                {similarIncident.resolutionTime || '—'}
              </p>
            </div>
          </section>
        </div>

        {similarIncident.matchingSignals?.length > 0 && (
          <div className={styles.signals}>
            <span className={styles.fieldLabel}>Matching signals</span>
            <ul className={styles.signalList}>
              {similarIncident.matchingSignals.map((signal) => (
                <li key={signal}>{signal}</li>
              ))}
            </ul>
          </div>
        )}
      </DialogContent>

      <DialogActions className={styles.actions}>
        <Button onClick={onClose} sx={{ textTransform: 'none', borderRadius: '4px' }}>
          Close
        </Button>
        <Button
          variant="contained"
          onClick={onClose}
          sx={{ textTransform: 'none', borderRadius: '4px', boxShadow: 'none' }}
        >
          Apply previous resolution
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default CompareIncidentDialog;
