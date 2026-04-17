import { Outlet } from 'react-router-dom';
import { TooltipProvider } from '@/components/ui/tooltip';

export default function RootLayout() {
  return (
    <TooltipProvider>
      <main className="min-h-screen bg-background text-foreground">
        <Outlet />
      </main>
    </TooltipProvider>
  );
}
