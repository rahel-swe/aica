import { createBrowserRouter, Navigate } from 'react-router-dom';
import LandingPage from '@/pages/landing-page';
import SignInPage from '@/pages/auth/sign-in-page';
import SignUpPage from '@/pages/auth/sign-up-page';
import DashboardPage from '@/pages/dashboard-page';
import ExplorePage from '@/pages/explore-page';
import RecommendationsPage from '@/pages/recommendations-page';
import PathwayDetailPage from '@/pages/pathway-detail-page';
import AdvisorPage from '@/pages/advisor-page';
import RoadmapPage from '@/pages/roadmap-page';
import ProfilePage from '@/pages/profile-page';
import SettingsPage from '@/pages/settings-page';
import ErrorPage from '@/pages/error-page';
import NotFoundPage from '@/pages/not-found-page';
import AppLayout from '@/layouts/app-layout';
import AuthLayout from '@/layouts/auth-layout';
import RootLayout from '@/layouts/root-layout';
import PathwayAssessmentLayout from './layouts/pathway-assessment-layout';
import PathwayAssessmentStepsPage from './pages/pathway-assessment-steps-page';
import PathwayRecommendedPathwaysLayout from './layouts/pathway-recommendations-layout.tsx';
import PathwayCongratulations from './layouts/pathway-congratulations';
import RoadmapSetupLayout from './layouts/roadmap-setup-assessment-layout';
import RoadmapSetupAssesmentStepsPage from './pages/roadmap-setup-assessment-steps-page.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        element: <AuthLayout />,
        children: [
          { index: true, element: <LandingPage /> },
          { path: 'auth/sign-in', element: <SignInPage /> },
          { path: 'auth/sign-up', element: <SignUpPage /> },
        ],
      },
      {
        path: 'pathway-assessment',
        element: <PathwayAssessmentLayout />,
        children: [
          {
            index: true,
            element: <Navigate to="welcome" replace />,
          },
          {
            path: ':stepId',
            element: <PathwayAssessmentStepsPage />,
          },
        ],
      },
      {
        path: 'pathway-recommendations',
        element: <PathwayRecommendedPathwaysLayout />,
      },
      {
        path: 'pathway-congratulations',
        element: <PathwayCongratulations />,
      },
      {
        path: 'roadmap-setup-assessment',
        element: <RoadmapSetupLayout />,
        children: [
          {
            index: true,
            element: <Navigate to="current-stage" replace />,
          },
          {
            path: ':stepId',
            element: <RoadmapSetupAssesmentStepsPage />,
          },
        ],
      },
      {
        path: 'app',
        element: <AppLayout />,
        children: [
          { index: true, element: <Navigate to="dashboard" replace /> },
          { path: 'dashboard', element: <DashboardPage /> },
          { path: 'explore', element: <ExplorePage /> },
          { path: 'recommendations', element: <RecommendationsPage /> },
          { path: 'pathways/:id', element: <PathwayDetailPage /> },
          { path: 'advisor', element: <AdvisorPage /> },
          { path: 'roadmap', element: <RoadmapPage /> },
          { path: 'profile', element: <ProfilePage /> },
          { path: 'settings', element: <SettingsPage /> },
        ],
      },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]);

export default router;
