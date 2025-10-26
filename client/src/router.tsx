import { createBrowserRouter, Navigate, RouteObject } from 'react-router-dom';
import App from './App';
import AuthLayout from './pages/auth/AuthLayout';
import ErrorPage from './pages/ErrorPage';
import OnBoardingLayout from './pages/onboarding/OnBoardingLayout';
import { lazy } from 'react';
import LoginForm from './pages/auth/LoginForm';
import { requireAuthLoader } from '@/loaders/loaders';

const Landing = lazy(() => import('@/pages/LandingPage'));
const SignupForm = lazy(() => import('@/pages/auth/SignupForm'));

const routes: RouteObject[] = [
  {
    path: '/',
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
            index: true,
            element: <Navigate to="login" replace />,
          },
          {
            path: 'login',
            element: <LoginForm />,
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
        loader: requireAuthLoader,
        children: [
          { index: true, element: <Navigate to="dashboard" replace /> }, // example helper
          { path: 'dashboard', element: <h1>Dashboard</h1> },
          { path: 'chatbot', element: <h1>Why chat bot</h1> },
          { path: 'profile', element: <h1>Profile</h1> },
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
