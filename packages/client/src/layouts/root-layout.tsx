import { TooltipProvider } from '@/components/ui/tooltip';
import { useDocumentDirection } from '@/hooks/use-document-direction';
import { ThemeProvider } from '@/providers/theme-provider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { NuqsAdapter } from 'nuqs/adapters/react';
import { Outlet } from 'react-router-dom';

// Create once outside component
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
      refetchOnWindowFocus: true,
      staleTime: 1000 * 60 * 5,
    },
  },
});

export default function RootLayout() {
  useDocumentDirection();
  return (
    <NuqsAdapter>
      {/* <DirectionProvider> */}
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <main className="min-h-screen bg-background text-foreground">
              <Outlet />
            </main>
          </TooltipProvider>

          <ReactQueryDevtools initialIsOpen={false} position="top" />
        </QueryClientProvider>
      </ThemeProvider>
      {/* </DirectionProvider> */}
    </NuqsAdapter>
  );
}
