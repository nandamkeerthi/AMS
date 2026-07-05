import { Button } from '@mui/material';
import BoltOutlinedIcon from '@mui/icons-material/BoltOutlined';
import { GlassCard } from '@/components/common';
import styles from './SuggestedActionsPanel.module.css';

function SuggestedActionsPanel({ actions = [], onAction, disabled = false }) {
  if (!actions.length) return null;

  return (
    <GlassCard title="Suggested Actions" variant="solid">
      <ul className={styles.list}>
        {actions.map((action) => (
          <li key={action.id}>
            <Button
              type="button"
              fullWidth
              variant="outlined"
              startIcon={<BoltOutlinedIcon />}
              disabled={disabled}
              onClick={() => onAction?.(action)}
              className={styles.actionBtn}
            >
              {action.label}
            </Button>
          </li>
        ))}
      </ul>
    </GlassCard>
  );
}

export default SuggestedActionsPanel;
