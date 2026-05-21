import { useLocation } from 'react-router-dom';

/**
 * Returns true if the current pathname matches the given path.
 * By default uses prefix matching to handle nested routes (/app/advisor/chat).
 * Pass `exact: true` to require an exact match.
 */
export function useIsActive(to: string, exact = false): boolean {
  const { pathname } = useLocation();
  if (exact) return pathname === to;
  return pathname === to || pathname.startsWith(to + '/');
}
