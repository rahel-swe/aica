import { getProfileStatus } from '@/services/profile-service';
import { useQuery } from '@tanstack/react-query';

export const profileKeys = {
  all: ['profile'],
  me: () => [...profileKeys.all, 'me'],
};

export const useProfileStatusQuery = () => {
  return useQuery({
    queryKey: profileKeys.me(),
    queryFn: getProfileStatus,
  });
};
