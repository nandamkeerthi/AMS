import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import {
  PageHeader,
  ErrorState,
  SkeletonLoader,
  FormActions,
} from '@/components/common';
import { useAsyncData } from '@/hooks';
import { profileService } from '@/services/profileService';
import {
  ThemePreferencesSection,
  NotificationPreferencesSection,
  LanguageSection,
  TimeZoneSection,
  DashboardPreferencesSection,
} from './components';
import styles from './Settings.module.css';

function Settings() {
  const { data, loading, error, refetch } = useAsyncData(
    () => profileService.getSettingsPageData(),
    []
  );

  const [savedDefaults, setSavedDefaults] = useState(null);
  const [saving, setSaving] = useState(false);

  const { control, handleSubmit, reset } = useForm({
    mode: 'onBlur',
  });

  useEffect(() => {
    if (!data) return;
    const formValues = profileService.buildSettingsFormValues(data);
    setSavedDefaults(formValues);
    reset(formValues);
  }, [data, reset]);

  const handleReset = useCallback(() => {
    if (!savedDefaults) return;
    reset(savedDefaults);
    toast('Settings reset to last saved values', { icon: '↩️' });
  }, [savedDefaults, reset]);

  const onSave = handleSubmit(async (formValues) => {
    setSaving(true);
    try {
      await profileService.saveSettings(formValues);
      setSavedDefaults(formValues);
      toast.success('Settings saved successfully');
    } catch {
      toast.error('Failed to save settings');
    } finally {
      setSaving(false);
    }
  });

  if (loading) {
    return (
      <div className={styles.page}>
        <SkeletonLoader variant="page" />
      </div>
    );
  }

  if (error) {
    return <ErrorState message={error} onRetry={refetch} />;
  }

  if (!data) {
    return (
      <ErrorState
        title="No settings data"
        message="Settings are unavailable."
        onRetry={refetch}
      />
    );
  }

  return (
    <div className={styles.page}>
      <PageHeader
        title={data.pageConfig.title}
        subtitle={data.pageConfig.subtitle}
        breadcrumbs={[{ label: 'Home' }, { label: 'Settings' }]}
        variant="simple"
      />

      <form className={styles.form} onSubmit={onSave} noValidate>
        <div className={styles.grid}>
          <ThemePreferencesSection
            control={control}
            options={data.options.themes}
          />
          <div className={styles.fullWidth}>
            <NotificationPreferencesSection
              control={control}
              items={data.options.notificationItems}
            />
          </div>
          <LanguageSection
            control={control}
            options={data.options.languages}
          />
          <TimeZoneSection
            control={control}
            options={data.options.timezones}
          />
          <div className={styles.fullWidth}>
            <DashboardPreferencesSection
              control={control}
              dateRangeOptions={data.options.dateRanges}
            />
          </div>
        </div>

        <FormActions
          onSave={onSave}
          onReset={handleReset}
          saving={saving}
        />
      </form>
    </div>
  );
}

export default Settings;
