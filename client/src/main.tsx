import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@/index.css';
import { ThemeProvider } from './lib/theme-provider.js';
import { RouterProvider } from 'react-router-dom';
import router from './router';

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Root element not found');

createRoot(rootElement).render(
  <StrictMode>
    <ThemeProvider defaultTheme="system">
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>
);
