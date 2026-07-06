import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  FormLabel,
} from '@mui/material';
import { Controller } from 'react-hook-form';
import { GlassCard } from '@/components/common';
import styles from './ThemePreferencesSection.module.css';

function ThemePreferencesSection({ control, options = [] }) {
  return (
    <GlassCard title="Theme Preferences" variant="solid" className={styles.card}>
      <Controller
        name="theme"
        control={control}
        render={({ field }) => (
          <FormControl component="fieldset" className={styles.fieldset}>
            <FormLabel component="legend" className={styles.legend}>
              Choose your preferred color theme
            </FormLabel>
            <RadioGroup {...field} className={styles.radioGroup}>
              {options.map((option) => (
                <FormControlLabel
                  key={option.value}
                  value={option.value}
                  control={<Radio size="small" />}
                  label={
                    <span className={styles.optionLabel}>
                      <span className={styles.optionTitle}>{option.label}</span>
                      {option.description && (
                        <span className={styles.optionDesc}>{option.description}</span>
                      )}
                    </span>
                  }
                  className={styles.radioItem}
                />
              ))}
            </RadioGroup>
          </FormControl>
        )}
      />
    </GlassCard>
  );
}

export default ThemePreferencesSection;
