import { createBrowserRouter, RouteObject } from 'react-router-dom';
import App, { rootLoader } from './App';
import Auth from './pages/auth/Auth';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <App />,
    loader: rootLoader,
  },
  {
    path: '/auth',
    element: <Auth />,
  },
];

const router = createBrowserRouter(routes);

export default router;
