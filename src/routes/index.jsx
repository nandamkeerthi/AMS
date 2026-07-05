import { createBrowserRouter } from 'react-router-dom';
import { AppLayout } from '@/components/layout';
import Dashboard from '@/pages/Dashboard';
import IncidentList from '@/pages/Incidents';
import Placeholder from '@/pages/Placeholder';
import NotFound from '@/pages/NotFound';

/**
 * Application route configuration.
 * Placeholder routes will be replaced with full page implementations.
 */
const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: 'incidents',
        element: <IncidentList />,
      },
      {
        path: 'tickets',
        element: (
          <Placeholder
            title="Service Requests"
            description="Handle service requests and change tickets"
            iconKey="tickets"
          />
        ),
      },
      {
        path: 'knowledge',
        element: (
          <Placeholder
            title="Knowledge Base"
            description="Browse articles, runbooks, and documentation"
            iconKey="knowledge"
          />
        ),
      },
      {
        path: 'ai-assistant',
        element: (
          <Placeholder
            title="AI Assistant"
            description="AI-powered troubleshooting and recommendations"
            iconKey="ai"
          />
        ),
      },
      {
        path: 'analytics',
        element: (
          <Placeholder
            title="Analytics"
            description="Performance metrics and reporting"
            iconKey="analytics"
          />
        ),
      },
      {
        path: 'settings',
        element: (
          <Placeholder
            title="Settings"
            description="Configure workspace preferences and integrations"
            iconKey="settings"
          />
        ),
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]);

export default router;
