import { FormControlLabel, MenuItem, Switch, TextField } from '@mui/material';
import { Controller } from 'react-hook-form';
import { GlassCard } from '@/components/common';
import { fieldSx } from '@/utils/mui';
import styles from './DashboardPreferencesSection.module.css';

function DashboardPreferencesSection({ control, dateRangeOptions = [] }) {
  return (
    <GlassCard title="Dashboard Preferences" variant="solid" className={styles.card}>
      <div className={styles.form}>
        <Controller
          name="dashboard.defaultDateRange"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              select
              label="Default date range"
              size="small"
              fullWidth
              sx={fieldSx}
            >
              {dateRangeOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          )}
        />

        <Controller
          name="dashboard.showAiInsights"
          control={control}
          render={({ field }) => (
            <FormControlLabel
              control={
                <Switch
                  checked={Boolean(field.value)}
                  onChange={(event) => field.onChange(event.target.checked)}
                  size="small"
                />
              }
              label="Show AI insights panel on dashboard"
              className={styles.switchItem}
            />
          )}
        />

        <Controller
          name="dashboard.compactMetrics"
          control={control}
          render={({ field }) => (
            <FormControlLabel
              control={
                <Switch
                  checked={Boolean(field.value)}
                  onChange={(event) => field.onChange(event.target.checked)}
                  size="small"
                />
              }
              label="Use compact metric tiles"
              className={styles.switchItem}
            />
          )}
        />

        <Controller
          name="dashboard.autoRefresh"
          control={control}
          render={({ field }) => (
            <FormControlLabel
              control={
                <Switch
                  checked={Boolean(field.value)}
                  onChange={(event) => field.onChange(event.target.checked)}
                  size="small"
                />
              }
              label="Auto-refresh dashboard data"
              className={styles.switchItem}
            />
          )}
        />
      </div>
    </GlassCard>
  );
}

export default DashboardPreferencesSection;
