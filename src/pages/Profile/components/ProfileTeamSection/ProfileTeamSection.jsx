import { GlassCard } from '@/components/common';
import styles from './ProfileTeamSection.module.css';

function ProfileTeamSection({ team }) {
  return (
    <GlassCard title="Team" variant="solid" className={styles.card}>
      <dl className={styles.list}>
        <div className={styles.item}>
          <dt>Team</dt>
          <dd>{team.name}</dd>
        </div>
        <div className={styles.item}>
          <dt>Manager</dt>
          <dd>{team.manager}</dd>
        </div>
        <div className={styles.item}>
          <dt>Members</dt>
          <dd>{team.memberCount}</dd>
        </div>
        <div className={styles.item}>
          <dt>Location</dt>
          <dd>{team.location}</dd>
        </div>
      </dl>
    </GlassCard>
  );
}

export default ProfileTeamSection;
