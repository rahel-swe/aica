// --- Loaders / guards (pseudo implementation; We will add it later) ---
// import { requireAuthLoader, requireOnboardingNotCompletedLoader, requireOnboardingCompletedLoader } from './loaders';

import { authClient } from '@/lib/better-auth';
import { useNavigate } from 'react-router-dom';

export const requireAuthLoader = () => {
  const navigate = useNavigate();
  const { data, error, isPending } = authClient.useSession();

  if (isPending) {
    console.log('User session pending');
  }

  if (!isPending && !data?.session) {
    navigate('/auth/login');
  }

  if (error) {
    console.log(error);
  }
};
