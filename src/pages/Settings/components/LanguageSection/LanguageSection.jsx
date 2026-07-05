import { MenuItem, TextField } from '@mui/material';
import { Controller } from 'react-hook-form';
import { GlassCard } from '@/components/common';
import { fieldSx } from '@/utils/mui';
import styles from './LanguageSection.module.css';

function LanguageSection({ control, options = [] }) {
  return (
    <GlassCard title="Language" variant="solid" className={styles.card}>
      <Controller
        name="language"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            select
            label="Display language"
            size="small"
            fullWidth
            sx={fieldSx}
            helperText="Choose the language used across the workspace interface"
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

export default LanguageSection;
