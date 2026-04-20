import { createBrowserRouter, Navigate } from 'react-router-dom';
import LandingPage from '@/pages/landing-page';
import SignInPage from '@/pages/auth/sign-in-page';
import SignUpPage from '@/pages/auth/sign-up-page';
import DashboardPage from '@/pages/dashboard-page';
import OnboardingPage from '@/pages/onboarding-page';
import ExplorePage from '@/pages/explore-page';
import RecommendationsPage from '@/pages/recommendations-page';
import PathwayDetailPage from '@/pages/pathway-detail-page';
import AdvisorPage from '@/pages/advisor-page';
import RoadmapPage from '@/pages/roadmap-page';
import ProfilePage from '@/pages/profile-page';
import SettingsPage from '@/pages/settings-page';
import ErrorPage from '@/pages/error-page';
import NotFoundPage from '@/pages/not-found-page';
import AppShell from '@/layouts/app-shell';
import AuthShell from '@/layouts/auth-shell';
import RootLayout from '@/layouts/root-layout';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        element: <AuthShell />,
        children: [
          { index: true, element: <LandingPage /> },
          { path: 'auth/sign-in', element: <SignInPage /> },
          { path: 'auth/sign-up', element: <SignUpPage /> },
        ],
      },
      {
        path: 'app',
        element: <AppShell />,
        children: [
          { index: true, element: <Navigate to="dashboard" replace /> },
          { path: 'dashboard', element: <DashboardPage /> },
          { path: 'onboarding', element: <OnboardingPage /> },
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
