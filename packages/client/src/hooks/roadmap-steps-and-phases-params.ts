import { parseAsString, useQueryStates } from 'nuqs';

export const useRoadmapStepsAndPhasesParams = () =>
  useQueryStates({
    phaseId: parseAsString.withDefault(''),
    stepId: parseAsString.withDefault(''),
  });
