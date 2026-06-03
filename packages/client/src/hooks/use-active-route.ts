import { MAIN_TABS } from '@/constants/app-tabs';
import { useLocation } from 'react-router-dom';

export function useIsTabActive(exact = true, to?: string): boolean {
  const { pathname } = useLocation();

  if (exact) {
    const isTabAtive = MAIN_TABS.find((tab) => tab.to === pathname);

    return Boolean(isTabAtive);
  }

  return pathname === to || pathname.startsWith(to + '/');
}
