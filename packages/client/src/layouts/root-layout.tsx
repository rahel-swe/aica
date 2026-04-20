import { Outlet } from 'react-router-dom';
import { TooltipProvider } from '@/components/ui/tooltip';
import { ThemeProvider } from '@/providers/theme-provider';

export default function RootLayout() {
  return (
     <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">

    <TooltipProvider>
     
      <main className="min-h-screen bg-background text-foreground">
        <Outlet />
      </main>
    </TooltipProvider>
     </ThemeProvider>
  );
}
