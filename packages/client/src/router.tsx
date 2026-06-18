import { createBrowserRouter, Navigate } from 'react-router-dom';
import SignInPage from '@/pages/auth/sign-in-page';
import SignUpPage from '@/pages/auth/sign-up-page';
import DashboardPage from '@/pages/dashboard-page';
import ExplorePage from '@/pages/explore-page';
import PathwayDetailPage from '@/pages/pathway-detail-page';
import AdvisorPage from '@/pages/advisor-page';
import RoadmapPage from '@/pages/roadmap-page';
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
import RouterProtector from './router-protector.tsx';
import ChangePasswordPage from './pages/auth/change-password-page.tsx';
import ChangePasswordSucceedPage from './pages/auth/change-password-succeed-page.tsx';
import LandingPage from './pages/LandingPage.tsx';
import SavedPathwaysPage from './pages/saved-pathways-page.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        index: true,
        element: <LandingPage />,
      },
      {
        element: <AuthLayout />,
        path: 'auth',
        children: [
          { path: 'sign-in', index: true, element: <SignInPage /> },
          { path: 'sign-up', element: <SignUpPage /> },
          {
            path: 'change-password',
            element: (
              <RouterProtector>
                <ChangePasswordPage />
              </RouterProtector>
            ),
          },
          {
            path: 'change-password-succeed',
            element: <ChangePasswordSucceedPage />,
          },
        ],
      },
      {
        path: 'pathway-assessment',
        element: (
          <RouterProtector>
            <PathwayAssessmentLayout />
          </RouterProtector>
        ),
        children: [
          {
            index: true,
            element: <Navigate to="welcome" replace />,
          },
          {
            path: ':stepId',
            element: (
              <RouterProtector>
                <PathwayAssessmentStepsPage />
              </RouterProtector>
            ),
          },
        ],
      },
      {
        path: 'pathway-recommendations',
        element: (
          <RouterProtector>
            <PathwayRecommendedPathwaysLayout />
          </RouterProtector>
        ),
      },
      {
        path: 'pathway-congratulations',
        element: (
          <RouterProtector>
            <PathwayCongratulations />
          </RouterProtector>
        ),
      },
      {
        path: 'roadmap-setup-assessment',
        element: (
          <RouterProtector>
            <RoadmapSetupLayout />
          </RouterProtector>
        ),
        children: [
          {
            index: true,
            element: <Navigate to="current-stage" replace />,
          },
          {
            path: ':stepId',
            element: (
              <RouterProtector>
                <RoadmapSetupAssesmentStepsPage />
              </RouterProtector>
            ),
          },
        ],
      },
      {
        path: 'app',
        element: (
          <RouterProtector>
            <AppLayout />
          </RouterProtector>
        ),
        children: [
          { index: true, element: <Navigate to="dashboard" replace /> },
          {
            path: 'dashboard',
            element: (
              <RouterProtector>
                <DashboardPage />
              </RouterProtector>
            ),
          },
          {
            path: 'explore',
            element: (
              <RouterProtector>
                <ExplorePage />
              </RouterProtector>
            ),
          },
          {
            path: 'pathways/:pathwaySlug',
            element: (
              <RouterProtector>
                <PathwayDetailPage />
              </RouterProtector>
            ),
          },
          {
            path: 'advisor',
            element: (
              <RouterProtector>
                <AdvisorPage />
              </RouterProtector>
            ),
          },
          {
            path: 'roadmap',
            element: (
              <RouterProtector>
                <RoadmapPage />
              </RouterProtector>
            ),
          },
          {
            path: 'settings',
            element: (
              <RouterProtector>
                <SettingsPage />
              </RouterProtector>
            ),
          },
          {
            path: '/app/saved-pathways',
            element: <SavedPathwaysPage />,
          },
        ],
      },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]);

export default router;
