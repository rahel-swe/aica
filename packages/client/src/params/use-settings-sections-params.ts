import { parseAsString, useQueryState } from 'nuqs';

export const useSettingsSectionParam = () =>
  useQueryState('section', parseAsString.withDefault(''));
