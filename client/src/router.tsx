import { createBrowserRouter, Navigate, RouteObject } from 'react-router-dom';
import App, { rootLoader } from './App';
import AuthLayout from './pages/auth/AuthLayout';
import RootLayout from './RootLayout';
import ErrorPage from './pages/ErrorPage';
import OnBoardingLayout from './pages/onboarding/OnBoardingLayout';
import { lazy } from 'react';

const Landing = lazy(() => import('@/pages/Landing'));
const SignupForm = lazy(() => import('@/pages/auth/SignupForm'));

// --- Loaders / guards (pseudo implementation; We will add it later) ---
// import { requireAuthLoader, requireOnboardingNotCompletedLoader, requireOnboardingCompletedLoader } from './loaders';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      // public landing page
      {
        index: true,
        element: <Landing />,
      },
      {
        path: 'auth',
        element: <AuthLayout />,
        children: [
          {
            path: 'login',
            element: <div>Login Form</div>,
          },
          {
            path: 'signup',
            element: <SignupForm />, // signup action should redirect to onboarding if needed
          },
        ],
      },

      // onboarding (authenticated users only) - NO nav/sidebar
      {
        path: 'onboarding',
        element: <OnBoardingLayout />,
        // loader: requireAuthLoader,
        children: [
          {
            index: true,
            element: <Navigate to="academics" replace />,
          },
          {
            path: 'academics',
            element: <div>Academics Form and tags</div>,
          },
          {
            path: 'interests-skills',
            element: <div>Interests & Skills interactive tag selector.</div>,
          },
          {
            path: 'lifestyle-preference',
            element: <div>Lifestyle & Preferences sliders, assessments.</div>,
          },
          {
            path: 'goals-aspirations',
            element: <div>Goals & Aspirations</div>,
          },
        ],
      },
      // processing result page — independent, only accessible after onboarding completed
      {
        path: 'processing',
        element: <div>Processing Page for Recommendation</div>,
        // it must have a loader // returns redirect to /onboarding if user not completed onboarding
      },

      // main app area (with nav + sidebar)
      {
        path: 'app',
        element: <App />,
        loader: rootLoader,
        // loader: requireAuthLoader, // protect entire app
        children: [
          { index: true, element: <Navigate to="dashboard" replace /> }, // example helper
          { path: 'dashboard', element: <div>Dashboard</div> },
          { path: 'chatbot', element: <div>Why chat bot</div> },
          { path: 'profile', element: <div>Profile</div> },
        ],
      },
    ],
  },

  {
    path: '*',
    element: <ErrorPage />,
    errorElement: <ErrorPage />,
  },
];

const router = createBrowserRouter(routes);

export default router;
