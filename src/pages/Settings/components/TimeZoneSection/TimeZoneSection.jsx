import { MenuItem, TextField } from '@mui/material';
import { Controller } from 'react-hook-form';
import { GlassCard } from '@/components/common';
import styles from './TimeZoneSection.module.css';

const fieldSx = {
  '& .MuiOutlinedInput-root': { borderRadius: '4px' },
};

function TimeZoneSection({ control, options = [] }) {
  return (
    <GlassCard title="Time Zone" variant="solid" className={styles.card}>
      <Controller
        name="timezone"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            select
            label="Time zone"
            size="small"
            fullWidth
            sx={fieldSx}
            helperText="Used for incident timestamps, SLA calculations, and reports"
          >
            {options.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        )}
      />
    </GlassCard>
  );
}

export default TimeZoneSection;
