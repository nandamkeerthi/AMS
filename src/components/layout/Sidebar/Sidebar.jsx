import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FiChevronLeft,
  FiChevronRight,
  FiActivity,
} from 'react-icons/fi';
import { NAV_ITEMS, APP_NAME } from '@/utils/constants';
import { getNavIcon } from '@/utils/iconMap';
import styles from './Sidebar.module.css';

/**
 * Application sidebar with navigation, collapse, and mobile drawer support.
 */
function Sidebar({ collapsed, onToggleCollapse, mobileOpen, onMobileClose, isMobile }) {
  const sidebarClass = [
    styles.sidebar,
    collapsed && !isMobile ? styles.collapsed : '',
    isMobile && !mobileOpen ? styles.mobileHidden : '',
    isMobile && mobileOpen ? styles.mobileOpen : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <>
      {isMobile && mobileOpen && (
        <div
          className={styles.overlay}
          onClick={onMobileClose}
          aria-hidden="true"
        />
      )}

      <aside className={sidebarClass} aria-label="Main navigation">
        <div className={styles.logo}>
          <div className={styles.logoIcon} aria-hidden="true">
            <FiActivity size={20} color="#fff" />
          </div>
          {(!collapsed || isMobile) && (
            <motion.div
              className={styles.logoText}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
            >
              <span className={styles.logoTitle}>{APP_NAME}</span>
              <span className={styles.logoSubtitle}>Enterprise AMS</span>
            </motion.div>
          )}
        </div>

        <nav className={styles.nav}>
          <div className={styles.navSection}>
            {(!collapsed || isMobile) && (
              <span className={styles.navSectionLabel}>Main Menu</span>
            )}
            {NAV_ITEMS.map((item) => {
              const Icon = getNavIcon(item.icon);
              return (
                <NavLink
                  key={item.id}
                  to={item.path}
                  className={({ isActive }) =>
                    `${styles.navItem} ${isActive ? styles.active : ''}`
                  }
                  onClick={isMobile ? onMobileClose : undefined}
                  title={collapsed && !isMobile ? item.label : undefined}
                >
                  <span className={styles.navIcon} aria-hidden="true">
                    <Icon size={18} />
                  </span>
                  {(!collapsed || isMobile) && (
                    <span className={styles.navLabel}>{item.label}</span>
                  )}
                  {item.badge && (!collapsed || isMobile) && (
                    <span className={styles.badge} aria-label={`${item.badge} notifications`}>
                      {item.badge}
                    </span>
                  )}
                </NavLink>
              );
            })}
          </div>
        </nav>

        {!isMobile && (
          <div className={styles.footer}>
            <button
              type="button"
              className={styles.collapseBtn}
              onClick={onToggleCollapse}
              aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              {collapsed ? <FiChevronRight size={18} /> : <FiChevronLeft size={18} />}
            </button>
          </div>
        )}
      </aside>
    </>
  );
}

export default Sidebar;
