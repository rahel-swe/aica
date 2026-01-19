// import { requireAuthLoader, requireOnboardingNotCompletedLoader, requireOnboardingCompletedLoader } from './loaders';

import { authClient } from '@/lib/better-auth';
import { redirect } from 'react-router-dom';

export async function requireAuthLoader() {
  const { data: session } = await authClient.getSession();

  if (!session) {
    // not logged in -> redirect to login (keeps original intent optional)
    return redirect(
      `/auth/login?next=${encodeURIComponent(window.location.pathname)}`
    );
  }

  // return session (available to the route via useLoaderData)
  return session;
}
