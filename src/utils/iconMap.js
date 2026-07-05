import {
  FiGrid,
  FiAlertCircle,
  FiFileText,
  FiBookOpen,
  FiCpu,
  FiBarChart2,
  FiSettings,
  FiClock,
  FiShield,
} from 'react-icons/fi';

/** Maps nav item icon keys to React Icon components */
const NAV_ICON_MAP = {
  dashboard: FiGrid,
  incidents: FiAlertCircle,
  tickets: FiFileText,
  knowledge: FiBookOpen,
  ai: FiCpu,
  analytics: FiBarChart2,
  settings: FiSettings,
  sla: FiShield,
  time: FiClock,
};

export function getNavIcon(iconKey) {
  return NAV_ICON_MAP[iconKey] || FiGrid;
}

export function getStatIcon(iconKey) {
  return NAV_ICON_MAP[iconKey] || FiGrid;
}
