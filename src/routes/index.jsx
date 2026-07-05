import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { AppLayout } from '@/components/layout';
import NotFound from '@/pages/NotFound';
import Placeholder from '@/pages/Placeholder';

const Dashboard = lazy(() => import('@/pages/Dashboard'));
const IncidentList = lazy(() => import('@/pages/Incidents'));
const CreateIncident = lazy(() => import('@/pages/Incidents/CreateIncident'));
const IncidentDetail = lazy(() => import('@/pages/Incidents/IncidentDetail'));
const LogUpload = lazy(() => import('@/pages/LogUpload'));
const LogViewer = lazy(() => import('@/pages/LogViewer'));
const AiAnalysis = lazy(() => import('@/pages/AiAnalysis'));
const RepeatIncidentDetection = lazy(() => import('@/pages/RepeatIncidentDetection'));
const KnowledgeSearch = lazy(() => import('@/pages/KnowledgeSearch'));
const KnowledgeArticle = lazy(() => import('@/pages/KnowledgeArticle'));
const CreateKnowledgeArticle = lazy(() => import('@/pages/CreateKnowledgeArticle'));
const AiAssistant = lazy(() => import('@/pages/AiAssistant'));
const Analytics = lazy(() => import('@/pages/Analytics'));
const Profile = lazy(() => import('@/pages/Profile'));
const Settings = lazy(() => import('@/pages/Settings'));

/**
 * Application route configuration.
 * Page components are lazy-loaded for code splitting.
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
        path: 'knowledge/new',
        element: <CreateKnowledgeArticle />,
      },
      {
        path: 'knowledge/:id',
        element: <KnowledgeArticle />,
      },
      {
        path: 'ai-assistant',
        element: <AiAssistant />,
      },
      {
        path: 'analytics',
        element: <Analytics />,
      },
      {
        path: 'profile',
        element: <Profile />,
      },
      {
        path: 'settings',
        element: <Settings />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]);

export default router;
