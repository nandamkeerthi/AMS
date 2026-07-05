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
  ProfileAvatarSection,
  ProfileUserInfoSection,
  ProfileRoleSection,
  ProfileTeamSection,
  ProfileContactSection,
} from './components';
import styles from './Profile.module.css';

function Profile() {
  const { data, loading, error, refetch } = useAsyncData(
    () => profileService.getPageData(),
    []
  );

  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ mode: 'onBlur' });

  useEffect(() => {
    if (!data) return;
    setUser(data.user);
    reset(profileService.buildFormValues(data.user));
  }, [data, reset]);

  const handleEditClick = useCallback(() => {
    setIsEditing(true);
  }, []);

  const handleReset = useCallback(() => {
    if (!user) return;
    reset(profileService.buildFormValues(user));
    toast('Profile changes reset', { icon: '↩️' });
  }, [user, reset]);

  const handleCancelEdit = useCallback(() => {
    if (!user) return;
    reset(profileService.buildFormValues(user));
    setIsEditing(false);
  }, [user, reset]);

  const onSave = handleSubmit(async (formValues) => {
    setSaving(true);
    try {
      const result = await profileService.saveProfile(formValues, user);
      setUser(result.user);
      reset(profileService.buildFormValues(result.user));
      setIsEditing(false);
      toast.success('Profile saved successfully');
    } catch {
      toast.error('Failed to save profile');
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

  if (!data || !user) {
    return (
      <ErrorState
        title="No profile data"
        message="Profile information is unavailable."
        onRetry={refetch}
      />
    );
  }

  return (
    <div className={styles.page}>
      <PageHeader
        title={data.pageConfig.title}
        subtitle={data.pageConfig.subtitle}
        breadcrumbs={[{ label: 'Home' }, { label: 'Profile' }]}
        variant="simple"
      />

      <div className={styles.layout}>
        <aside className={styles.sidebar} aria-label="Profile summary">
          <ProfileAvatarSection
            avatar={user.avatar}
            displayName={user.displayName}
            jobTitle={user.jobTitle}
            isEditing={isEditing}
            onEditClick={handleEditClick}
          />
          <ProfileRoleSection role={user.role} />
          <ProfileTeamSection team={user.team} />
        </aside>

        <div className={styles.main}>
          <ProfileUserInfoSection
            user={user}
            isEditing={isEditing}
            register={register}
            errors={errors}
          />
          <ProfileContactSection
            contact={user.contact}
            isEditing={isEditing}
            register={register}
            errors={errors}
          />

          {isEditing && (
            <FormActions
              onSave={onSave}
              onReset={handleReset}
              saving={saving}
            />
          )}
        </div>
      </div>

      {isEditing && (
        <button
          type="button"
          className={styles.cancelLink}
          onClick={handleCancelEdit}
        >
          Cancel editing
        </button>
      )}
    </div>
  );
}

export default Profile;
