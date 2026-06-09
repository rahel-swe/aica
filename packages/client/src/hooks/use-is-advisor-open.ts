import { useLocation } from 'react-router-dom';

export const useIsAdvisorOpen = () => {
  const { pathname } = useLocation();
  return !!pathname.match(/advisor/i);
};
