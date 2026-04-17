import { createBrowserRouter, Navigate } from 'react-router-dom';
import RootLayout from '@/app/layouts/root-layout';
import AuthShell from '@/app/layouts/auth-shell';
import AppShell from '@/app/layouts/app-shell';
import LandingPage from '@/features/marketing/pages/landing-page';
import SignInPage from '@/features/auth/pages/sign-in-page';
import SignUpPage from '@/features/auth/pages/sign-up-page';
import DashboardPage from '@/features/dashboard/pages/dashboard-page';
import OnboardingPage from '@/features/onboarding/pages/onboarding-page';
import ExplorePage from '@/features/pathways/pages/explore-page';
import RecommendationsPage from '@/features/recommendations/pages/recommendations-page';
import PathwayDetailPage from '@/features/pathways/pages/pathway-detail-page';
import AdvisorPage from '@/features/advisor/pages/advisor-page';
import RoadmapPage from '@/features/roadmap/pages/roadmap-page';
import ProfilePage from '@/features/profile/pages/profile-page';
import SettingsPage from '@/features/settings/pages/settings-page';
import ErrorPage from '@/shared/pages/error-page';
import NotFoundPage from '@/shared/pages/not-found-page';

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
