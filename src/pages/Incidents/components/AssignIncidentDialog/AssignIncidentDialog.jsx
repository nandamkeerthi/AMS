import { useEffect, useMemo, useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Avatar,
  CircularProgress,
} from '@mui/material';
import { SearchBar, EmptyState } from '@/components/common';
import { useDebounce } from '@/hooks';
import { incidentService } from '@/services/incidentService';
import styles from './AssignIncidentDialog.module.css';

const AVAILABILITY_LABELS = {
  available: 'Available',
  busy: 'Busy',
  away: 'Away',
  offline: 'Offline',
};

function getWorkloadClass(assigned, capacity) {
  const ratio = assigned / capacity;
  if (ratio >= 1) return styles.workloadFull;
  if (ratio >= 0.75) return styles.workloadHigh;
  return '';
}

function AssignIncidentDialog({
  open,
  onClose,
  onAssign,
  incidentId,
  currentAssignee,
}) {
  const [engineers, setEngineers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedId, setSelectedId] = useState(null);
  const [assigning, setAssigning] = useState(false);

  const debouncedSearch = useDebounce(search, 250);

  useEffect(() => {
    if (!open) return;

    setSearch('');
    setSelectedId(null);
    setLoading(true);

    incidentService
      .getEngineers()
      .then((data) => setEngineers(data))
      .finally(() => setLoading(false));
  }, [open]);

  useEffect(() => {
    if (!open || !currentAssignee || !engineers.length) return;
    const match = engineers.find((e) => e.name === currentAssignee);
    if (match) setSelectedId(match.id);
  }, [open, currentAssignee, engineers]);

  const filteredEngineers = useMemo(() => {
    if (!debouncedSearch.trim()) return engineers;
    const q = debouncedSearch.toLowerCase();
    return engineers.filter(
      (eng) =>
        eng.name.toLowerCase().includes(q) ||
        eng.skill.toLowerCase().includes(q) ||
        eng.team.toLowerCase().includes(q) ||
        eng.email.toLowerCase().includes(q)
    );
  }, [engineers, debouncedSearch]);

  const selectedEngineer = engineers.find((e) => e.id === selectedId);

  const handleAssign = async () => {
    if (!selectedEngineer) return;
    setAssigning(true);
    try {
      await new Promise((r) => setTimeout(r, 500));
      onAssign?.(selectedEngineer);
      onClose?.();
    } finally {
      setAssigning(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{ sx: { borderRadius: '8px' } }}
      aria-labelledby="assign-incident-dialog-title"
    >
      <DialogTitle id="assign-incident-dialog-title" sx={{ pb: 1 }}>
        Assign incident
        {incidentId && (
          <p className={styles.incidentRef}>
            Assigning <span className={styles.incidentId}>{incidentId}</span>
            {currentAssignee && currentAssignee !== 'Unassigned' && (
              <> · Currently: {currentAssignee}</>
            )}
          </p>
        )}
      </DialogTitle>

      <DialogContent className={styles.dialogContent}>
        <div className={styles.searchWrap}>
          <SearchBar
            value={search}
            onChange={setSearch}
            placeholder="Search engineers by name, skill, or team..."
            fullWidth
            compact
            ariaLabel="Search engineers"
          />
        </div>

        {loading ? (
          <div className={styles.loadingWrap}>
            <CircularProgress size={32} />
          </div>
        ) : filteredEngineers.length === 0 ? (
          <EmptyState
            title="No engineers found"
            description="Try a different search term."
            compact
          />
        ) : (
          <ul className={styles.engineerList} role="listbox" aria-label="Engineers">
            {filteredEngineers.map((engineer) => {
              const isSelected = selectedId === engineer.id;
              const { assigned, capacity } = engineer.workload;
              const workloadPct = Math.min((assigned / capacity) * 100, 100);

              return (
                <li key={engineer.id}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={isSelected}
                    className={`${styles.engineerCard} ${isSelected ? styles.engineerCardSelected : ''}`}
                    onClick={() => setSelectedId(engineer.id)}
                  >
                    <Avatar className={styles.avatar} aria-hidden="true">
                      {engineer.initials}
                    </Avatar>
                    <div className={styles.body}>
                      <div className={styles.nameRow}>
                        <h4 className={styles.name}>{engineer.name}</h4>
                        <span
                          className={`${styles.availability} ${styles[engineer.availability]}`}
                        >
                          <span className={styles.availabilityDot} aria-hidden="true" />
                          {AVAILABILITY_LABELS[engineer.availability]}
                        </span>
                      </div>
                      <p className={styles.team}>{engineer.team}</p>
                      <p className={styles.skill}>{engineer.skill}</p>
                      <div className={styles.meta}>
                        <div className={styles.workload}>
                          <span className={styles.workloadLabel}>Current workload</span>
                          <span className={styles.workloadValue}>
                            {assigned} / {capacity} incidents
                          </span>
                          <div className={styles.workloadBar} aria-hidden="true">
                            <div
                              className={`${styles.workloadFill} ${getWorkloadClass(assigned, capacity)}`}
                              style={{ width: `${workloadPct}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2, pt: 1 }}>
        <Button
          onClick={onClose}
          disabled={assigning}
          sx={{ borderRadius: '4px', textTransform: 'none' }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handleAssign}
          disabled={!selectedEngineer || assigning || selectedEngineer?.availability === 'offline'}
          sx={{ borderRadius: '4px', textTransform: 'none', boxShadow: 'none' }}
        >
          {assigning ? 'Assigning...' : 'Assign'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AssignIncidentDialog;
