import AppDesktopTabs from '@/components/app-desktop-tabs';
import AppHeader from '@/components/app-header';
import AppMobileTabs from '@/components/app-mobile-tabs';
import SpinnerBars from '@/components/shadcn-space/spinner/spinner-06';
import ErrorPage from '@/pages/error-page';
import { useProfileStatusQuery } from '@/queries/profile-query';
import { Navigate, Outlet } from 'react-router-dom';

export default function AppLayout() {
  const {
    isPending,
    data: userProfileStatusResponse,
    error,
  } = useProfileStatusQuery();

  if (isPending)
    return (
      <div className="grid place-items-center min-h-dvh">
        <SpinnerBars />
      </div>
    );

  if (error) return <ErrorPage />;

  const { assessments, user } = userProfileStatusResponse.data;

  if (!user) return <Navigate to="/auth/sign-in" replace />;

  if (!assessments.pathwayCompleted)
    return <Navigate to="/pathway-assessment/welcome" replace />;

  return (
    <div className="min-h-screen flex flex-row gap-4">
      <AppDesktopTabs />
      <div className="flex min-w-0 max-h-full flex-col flex-1 gap-4">
        <AppHeader />
        <div className="flex-1 grow grid place-items-center h-full">
          <Outlet />
        </div>
        <AppMobileTabs />
      </div>
    </div>
  );
}
