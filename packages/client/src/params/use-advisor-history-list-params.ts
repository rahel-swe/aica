import { parseAsString, useQueryStates } from 'nuqs';

export const useAdvisorHistoryListParams = () =>
  useQueryStates({
    historyId: parseAsString.withDefault(''),
  });
