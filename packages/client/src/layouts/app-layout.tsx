import AppDesktopTabs from '@/components/app-desktop-tabs';
import AppHeader from '@/components/app-header';
import AppTabs from '@/components/app-tabs';
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
    <div className="min-h-screen flex flex-row">
      <AppDesktopTabs />
      <div className="flex min-w-0  flex-col flex-1">
        <AppHeader />
        <div className="flex-1 grow grid place-items-center px-4 pb-6 pt-6 md:pb-8 md:px-6">
          <Outlet />
        </div>
        <AppTabs />
      </div>
    </div>
  );
}
