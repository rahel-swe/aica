import type { SupportedLocale } from '@contracts/shared/schemas/i18n';
import { getLocale } from '../paraglide/runtime';

export type Direction = 'rtl' | 'ltr';

export const getDirection = () => {
  const locale: SupportedLocale = getLocale();

  const dir: Direction = locale === 'ps' || locale === 'fa' ? 'rtl' : 'ltr';

  return {
    dir,
    locale,
  };
};
