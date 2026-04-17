import { Outlet } from 'react-router-dom';
import { TooltipProvider } from '@/components/ui/tooltip';

const RootLayout = () => {
  return (
    <TooltipProvider>
      <main>
        <Outlet />
      </main>
    </TooltipProvider>
  );
};

export default RootLayout;
