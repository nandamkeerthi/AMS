import { TextField } from '@mui/material';
import { GlassCard } from '@/components/common';
import styles from './ProfileContactSection.module.css';

const fieldSx = {
  '& .MuiOutlinedInput-root': { borderRadius: '4px' },
};

function InfoRow({ label, value }) {
  return (
    <div className={styles.infoRow}>
      <span className={styles.label}>{label}</span>
      <span className={styles.value}>{value || '—'}</span>
    </div>
  );
}

function ProfileContactSection({ contact, isEditing, register, errors }) {
  return (
    <GlassCard title="Contact Details" variant="solid" className={styles.card}>
      {isEditing ? (
        <div className={styles.formGrid}>
          <TextField
            label="Email"
            size="small"
            fullWidth
            type="email"
            sx={fieldSx}
            error={Boolean(errors.email)}
            helperText={errors.email?.message}
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Enter a valid email address',
              },
            })}
          />
          <TextField
            label="Phone"
            size="small"
            fullWidth
            sx={fieldSx}
            {...register('phone')}
          />
          <TextField
            label="Location"
            size="small"
            fullWidth
            sx={fieldSx}
            {...register('location')}
          />
          <TextField
            label="Slack handle"
            size="small"
            fullWidth
            sx={fieldSx}
            {...register('slackHandle')}
          />
        </div>
      ) : (
        <div className={styles.infoList}>
          <InfoRow label="Email" value={contact.email} />
          <InfoRow label="Phone" value={contact.phone} />
          <InfoRow label="Location" value={contact.location} />
          <InfoRow label="Slack" value={contact.slackHandle} />
        </div>
      )}
    </GlassCard>
  );
}

export default ProfileContactSection;
