import { getDirection } from '@/lib/get-direction';
import { useEffect } from 'react';

export function useDocumentDirection() {
  const { dir, locale } = getDirection();

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = dir;
  }, [locale, dir]);

  return { dir, locale };
}
