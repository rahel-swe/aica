import {
  createBrowserRouter,
  type RouteObject,
  Navigate,
} from "react-router-dom";

//Layouts
import AppLayout from "./layouts/app-layout";
import AuthLayout from "./layouts/auth-layout";
import RootLayout from "./layouts/root-layout";

//Pages

import LandingPage from "./pages/landing-page";
import ErrorPage from "./pages/error-page";
import InboxPage from "./pages/inbox-page";
import ProcessingPage from "./pages/processing-page";
import ProfilePage from "./pages/profile-page";
import DashboardPage from "./pages/dashboard-page";
import SettingsPage from "./pages/settings-page";
import HelpPage from "./pages/help-page";
import SignInPage from "./pages/sign-in-page";
import SignUpPage from "./pages/sign-up-page";
import ChatbotPage from "./pages/chatbot-page";
import RoadmapPage from "./pages/roadmap-page";
import NotFoundPage from "./pages/not-found-page";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        
        element: <AuthLayout />,
        errorElement: <ErrorPage />,
        children: [
          { index: true, element: <Navigate to="landing" replace /> },
          { path: "landing", element: <LandingPage /> },
          { path: "login", element: <SignInPage /> },
          { path: "signup", element: <SignUpPage /> },
    
        ],
      },
      {
        path: "app",
        element: <AppLayout />,
        errorElement: <ErrorPage />,
        children: [
          { path: "profile", element: <ProfilePage /> },

          { path: "dashboard", element: <DashboardPage /> },
          { path: "roadmap", element: <RoadmapPage /> },

          { path: "settings", element: <SettingsPage /> },
          { path: "help", element: <HelpPage /> },

          { path: "chatbot", element: <ChatbotPage /> },
          { path: "inbox", element: <InboxPage /> },
          { path: "processing", element: <ProcessingPage /> },
        ],
      },
      // catch-all 404 should be last
      { path: "*", element: <NotFoundPage /> },
    ],
  },
];

const router = createBrowserRouter(routes);

export default router;
