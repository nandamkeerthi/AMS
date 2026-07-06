import { TextField } from '@mui/material';
import { GlassCard } from '@/components/common';
import { fieldSx } from '@/utils/mui';
import styles from './ProfileUserInfoSection.module.css';

function InfoRow({ label, value }) {
  return (
    <div className={styles.infoRow}>
      <span className={styles.label}>{label}</span>
      <span className={styles.value}>{value || '—'}</span>
    </div>
  );
}

function ProfileUserInfoSection({ user, isEditing, register, errors }) {
  return (
    <GlassCard title="User Information" variant="solid" className={styles.card}>
      {isEditing ? (
        <div className={styles.formGrid}>
          <TextField
            label="First name"
            size="small"
            fullWidth
            sx={fieldSx}
            error={Boolean(errors.firstName)}
            helperText={errors.firstName?.message}
            {...register('firstName', { required: 'First name is required' })}
          />
          <TextField
            label="Last name"
            size="small"
            fullWidth
            sx={fieldSx}
            error={Boolean(errors.lastName)}
            helperText={errors.lastName?.message}
            {...register('lastName', { required: 'Last name is required' })}
          />
          <TextField
            label="Job title"
            size="small"
            fullWidth
            sx={fieldSx}
            {...register('jobTitle')}
          />
          <TextField
            label="Department"
            size="small"
            fullWidth
            sx={fieldSx}
            {...register('department')}
          />
          <TextField
            label="Bio"
            size="small"
            fullWidth
            multiline
            minRows={3}
            sx={fieldSx}
            className={styles.fullWidth}
            {...register('bio')}
          />
        </div>
      ) : (
        <div className={styles.infoList}>
          <InfoRow label="Full name" value={user.displayName} />
          <InfoRow label="Job title" value={user.jobTitle} />
          <InfoRow label="Department" value={user.department} />
          <InfoRow label="Bio" value={user.bio} />
        </div>
      )}
    </GlassCard>
  );
}

export default ProfileUserInfoSection;
