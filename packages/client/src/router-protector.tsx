/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import ErrorState from './components/error-state';
import SpinnerBars from './components/shadcn-space/spinner/spinner-06';
import { useProfileStatusQuery } from './queries/profile-query';

const RouterProtector = ({ children }: { children: ReactNode }) => {
  const { isPending, error, isError, refetch } = useProfileStatusQuery();

  if (isPending)
    return (
      <div className="grid place-items-center min-h-dvh">
        <SpinnerBars />
      </div>
    );

  if (isError) {
    const status = (error as any)?.response?.status;

    if (status === 401) return <Navigate to="/auth/sign-in" replace />;

    return <ErrorState onRetry={refetch} />;
  }

  return <>{children}</>;
};

export default RouterProtector;
