import { createBrowserRouter } from 'react-router-dom';
import { AppLayout } from '@/components/layout';
import Dashboard from '@/pages/Dashboard';
import IncidentList from '@/pages/Incidents';
import CreateIncident from '@/pages/Incidents/CreateIncident';
import IncidentDetail from '@/pages/Incidents/IncidentDetail';
import LogUpload from '@/pages/LogUpload';
import LogViewer from '@/pages/LogViewer';
import AiAnalysis from '@/pages/AiAnalysis';
import RepeatIncidentDetection from '@/pages/RepeatIncidentDetection';
import KnowledgeSearch from '@/pages/KnowledgeSearch';
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
        path: 'incidents/new',
        element: <CreateIncident />,
      },
      {
        path: 'incidents/:id',
        element: <IncidentDetail />,
      },
      {
        path: 'incidents',
        element: <IncidentList />,
      },
      {
        path: 'logs/upload',
        element: <LogUpload />,
      },
      {
        path: 'logs/viewer',
        element: <LogViewer />,
      },
      {
        path: 'ai/analysis',
        element: <AiAnalysis />,
      },
      {
        path: 'incidents/repeat-detection',
        element: <RepeatIncidentDetection />,
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
        element: <KnowledgeSearch />,
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
