import { TooltipProvider } from '@/components/ui/tooltip';
import { useDocumentDirection } from '@/hooks/use-document-direction';
import { ThemeProvider } from '@/providers/theme-provider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { NuqsAdapter } from 'nuqs/adapters/react';
import { Outlet } from 'react-router-dom';
import { DirectionProvider } from '@/components/ui/direction';
import { getDirection } from '@/lib/get-direction';

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
      <DirectionProvider dir={getDirection().dir}>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <QueryClientProvider client={queryClient}>
            <TooltipProvider>
              <main className="min-h-screen bg-background text-foreground">
                <Outlet />
              </main>
            </TooltipProvider>

            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        </ThemeProvider>
      </DirectionProvider>
    </NuqsAdapter>
  );
}
