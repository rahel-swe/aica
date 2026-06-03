import AppDesktopTabs from '@/components/app-desktop-tabs';
import AppHeader from '@/components/app-header';
import MobileMainTabs from '@/components/mobile-main-tabs';
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
    <div className="flex h-dvh gap-4">
      <AppDesktopTabs />

      <div className="flex min-h-0 flex-1 flex-col gap-4">
        <AppHeader className="shrink-0" />

        <div className="min-h-0 flex-1">
          <Outlet />
        </div>
        <MobileMainTabs />
      </div>
    </div>
  );
}
