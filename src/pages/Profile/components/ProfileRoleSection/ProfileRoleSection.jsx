import { GlassCard } from '@/components/common';
import styles from './ProfileRoleSection.module.css';

function ProfileRoleSection({ role }) {
  return (
    <GlassCard title="Role" variant="solid" className={styles.card}>
      <div className={styles.content}>
        <span className={styles.roleBadge}>{role.name}</span>
        <p className={styles.description}>{role.description}</p>
      </div>
    </GlassCard>
  );
}

export default ProfileRoleSection;
