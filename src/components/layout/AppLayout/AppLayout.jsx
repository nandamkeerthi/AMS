import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { BREAKPOINTS } from '@/utils/constants';
import { useMediaQuery } from '@/hooks';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import styles from './AppLayout.module.css';

/**
 * Main application shell with sidebar, header, and routed content area.
 */
function AppLayout() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isTabletOrBelow = useMediaQuery(BREAKPOINTS.desktop);

  const mainClass = [
    styles.main,
    sidebarCollapsed && !isTabletOrBelow ? styles.collapsed : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={styles.layout}>
      <Sidebar
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed((prev) => !prev)}
        mobileOpen={mobileMenuOpen}
        onMobileClose={() => setMobileMenuOpen(false)}
        isMobile={isTabletOrBelow}
      />

      <div className={mainClass}>
        <Header onMenuClick={() => setMobileMenuOpen(true)} />
        <main className={styles.content}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AppLayout;
