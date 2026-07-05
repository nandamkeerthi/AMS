/**
 * Design tokens and application-wide constants.
 * Single source of truth for colors, spacing, and navigation config.
 */

export const COLORS = {
  primary: '#2563EB',
  primaryDark: '#1D4ED8',
  primaryLight: '#3B82F6',
  slate800: '#1E293B',
  slate900: '#0F172A',
  background: '#F8FAFC',
  surface: '#FFFFFF',
  success: '#10B981',
  error: '#EF4444',
  warning: '#F59E0B',
  textPrimary: '#0F172A',
  textSecondary: '#64748B',
  textMuted: '#94A3B8',
  border: '#E2E8F0',
  borderLight: '#F1F5F9',
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const BREAKPOINTS = {
  mobile: 480,
  tablet: 768,
  desktop: 1024,
  wide: 1280,
};

export const SIDEBAR_WIDTH = {
  expanded: 260,
  collapsed: 72,
};

export const APP_NAME = 'AMS Workbench';
export const APP_TAGLINE = 'AI-Powered Application Maintenance & Support';

export const NAV_ITEMS = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    path: '/',
    icon: 'dashboard',
  },
  {
    id: 'incidents',
    label: 'Incidents',
    path: '/incidents',
    icon: 'incidents',
    badge: 12,
  },
  {
    id: 'tickets',
    label: 'Service Requests',
    path: '/tickets',
    icon: 'tickets',
  },
  {
    id: 'knowledge',
    label: 'Knowledge Base',
    path: '/knowledge',
    icon: 'knowledge',
  },
  {
    id: 'ai-assistant',
    label: 'AI Assistant',
    path: '/ai-assistant',
    icon: 'ai',
  },
  {
    id: 'analytics',
    label: 'Analytics',
    path: '/analytics',
    icon: 'analytics',
  },
  {
    id: 'settings',
    label: 'Settings',
    path: '/settings',
    icon: 'settings',
  },
];

export const STATUS_VARIANTS = {
  open: { label: 'Open', color: 'info' },
  in_progress: { label: 'In Progress', color: 'warning' },
  resolved: { label: 'Resolved', color: 'success' },
  closed: { label: 'Closed', color: 'default' },
  critical: { label: 'Critical', color: 'error' },
  high: { label: 'High', color: 'warning' },
  medium: { label: 'Medium', color: 'info' },
  low: { label: 'Low', color: 'default' },
};

export const PRIORITY_VARIANTS = {
  critical: { label: 'Critical', color: 'error' },
  high: { label: 'High', color: 'warning' },
  medium: { label: 'Medium', color: 'info' },
  low: { label: 'Low', color: 'default' },
};
