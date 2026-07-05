import { Button } from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { GlassCard } from '@/components/common';
import styles from './ProfileAvatarSection.module.css';

function ProfileAvatarSection({ avatar, displayName, jobTitle, isEditing, onEditClick }) {
  return (
    <GlassCard title="Avatar" variant="solid" className={styles.card}>
      <div className={styles.content}>
        <div
          className={styles.avatar}
          style={{ backgroundColor: avatar.color }}
          aria-hidden="true"
        >
          {avatar.initials}
        </div>
        <div className={styles.meta}>
          <h3 className={styles.name}>{displayName}</h3>
          <p className={styles.title}>{jobTitle}</p>
        </div>
        {!isEditing && (
          <Button
            variant="outlined"
            size="small"
            startIcon={<EditOutlinedIcon />}
            onClick={onEditClick}
            className={styles.editBtn}
          >
            Edit Profile
          </Button>
        )}
      </div>
    </GlassCard>
  );
}

export default ProfileAvatarSection;
