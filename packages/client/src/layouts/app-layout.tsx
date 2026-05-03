import AppHeader from '@/components/app-header';
import AppTabs from '@/components/app-tabs';
import { usePathwayAssessment } from '@/hooks/use-pathway-assessment';
import { Navigate, Outlet } from 'react-router-dom';

export default function AppLayout() {
  const { userData, isPending, isPathwayAssessmentCompleted } =
    usePathwayAssessment();

  if (isPending) return <p>App loading...</p>;

  if (!userData?.user) return <Navigate to="/auth" replace />;

  if (!isPathwayAssessmentCompleted)
    return <Navigate to="/pathway-assessment/welcome" replace />;

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto flex min-h-screen w-full max-w-400 gap-0">
        <div className="flex min-h-screen min-w-0 flex-1 flex-col">
          <AppHeader />
          <div className="flex-1 px-4 pb-24 pt-6 sm:px-6 lg:px-8 lg:pb-8">
            <Outlet />
          </div>
        </div>
      </div>
      <AppTabs />
    </div>
  );
}
