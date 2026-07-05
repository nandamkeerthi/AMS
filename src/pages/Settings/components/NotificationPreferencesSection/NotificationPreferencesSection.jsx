import { FormControlLabel, Switch } from '@mui/material';
import { Controller } from 'react-hook-form';
import { GlassCard } from '@/components/common';
import styles from './NotificationPreferencesSection.module.css';

function NotificationPreferencesSection({ control, items = [] }) {
  return (
    <GlassCard title="Notification Preferences" variant="solid" className={styles.card}>
      <div className={styles.list}>
        {items.map((item) => (
          <Controller
            key={item.key}
            name={`notifications.${item.key}`}
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
                label={
                  <span className={styles.labelWrap}>
                    <span className={styles.label}>{item.label}</span>
                    {item.description && (
                      <span className={styles.description}>{item.description}</span>
                    )}
                  </span>
                }
                className={styles.switchItem}
              />
            )}
          />
        ))}
      </div>
    </GlassCard>
  );
}

export default NotificationPreferencesSection;
