/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import ErrorState from './components/error-state';
import SpinnerBars from './components/shadcn-space/spinner/spinner-06';
import { authClient } from './lib/auth-client';

const RouterProtector = ({ children }: { children: ReactNode }) => {
  const { isPending, error, refetch, data } = authClient.useSession();

  if (isPending)
    return (
      <div className="grid place-items-center min-h-dvh">
        <SpinnerBars />
      </div>
    );

  if (error) {
    const status = (error as any)?.response?.status;

    if (status === 401) return <Navigate to="/auth/sign-in" replace />;

    return <ErrorState onRetry={refetch} />;
  }

  if (data === null || data?.user === null)
    return <Navigate to="/auth/sign-in" replace />;

  return <>{children}</>;
};

export default RouterProtector;
