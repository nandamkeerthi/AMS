import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { IconButton, Tooltip } from '@mui/material';
import { FiMenu, FiBell, FiHelpCircle } from 'react-icons/fi';
import SearchBar from '@/components/common/SearchBar';
import styles from './Header.module.css';

/**
 * Top application header with search, notifications, and user menu.
 */
function Header({ onMenuClick }) {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <button
          type="button"
          className={styles.menuBtn}
          onClick={onMenuClick}
          aria-label="Open navigation menu"
        >
          <FiMenu size={20} />
        </button>

        <div className={styles.searchWrapper}>
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search incidents, tickets, knowledge..."
            fullWidth
            compact
            ariaLabel="Global search"
          />
        </div>
      </div>

      <div className={styles.right}>
        <Tooltip title="Help & Support">
          <IconButton className={styles.iconBtn} aria-label="Help and support">
            <FiHelpCircle size={20} />
          </IconButton>
        </Tooltip>

        <Tooltip title="Notifications">
          <IconButton className={styles.iconBtn} aria-label="Notifications">
            <FiBell size={20} />
            <span className={styles.notificationDot} aria-hidden="true" />
          </IconButton>
        </Tooltip>

        <RouterLink
          to="/profile"
          className={styles.userMenu}
          aria-label="Jane Doe profile — Support Lead"
        >
          <div className={styles.avatar} aria-hidden="true">
            JD
          </div>
          <div className={styles.userInfo}>
            <span className={styles.userName}>Jane Doe</span>
            <span className={styles.userRole}>Support Lead</span>
          </div>
        </RouterLink>
      </div>
    </header>
  );
}

export default Header;
