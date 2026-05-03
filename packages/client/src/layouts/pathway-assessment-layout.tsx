import {
  PATHWAY_ASSESSMENT_STEPS,
  pathwayAssessmentDefaultValues,
} from '@/constants/pathway-assessment-steps';
import { pathwayAssessmentFormSchema } from '@contracts/shared/schemas/pathway-assessment-schema';
import type { PathwayAssessmentFormValues } from '@contracts/shared/types/pathway-assessment-types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Outlet, useNavigate, useParams } from 'react-router-dom';

import { usePathwayAssessmentStatusQuery } from '@/queries/pathway-assessment-query';

import { usePathwayAssessmentCreateQuery } from '@/queries/pathway-assessment-query';

export type PathwayAssessmentOutletContext = {
  currentIndex: number;
  totalSteps: number;
  isSubmitting: boolean;
  submitAssisment: () => void;
};

const PathwayAssessmentLayout = () => {
  const navigate = useNavigate();
  const { stepId } = useParams();

  const { data, isLoading, isError } = usePathwayAssessmentStatusQuery();

  const { mutateAsync, isPending: isPathwayAssessmentCreating } =
    usePathwayAssessmentCreateQuery();

  const currentIndex = useMemo(
    () => PATHWAY_ASSESSMENT_STEPS.findIndex((step) => step.id === stepId),
    [stepId]
  );

  const form = useForm<PathwayAssessmentFormValues>({
    resolver: zodResolver(pathwayAssessmentFormSchema),
    defaultValues:
      pathwayAssessmentDefaultValues as PathwayAssessmentFormValues,
    mode: 'onChange',
    shouldUnregister: false,
  });

  const submitAssisment = form.handleSubmit(async (payload) => {
    await mutateAsync(payload, {
      onSuccess: (result) => {
        if (result?.success) navigate('/congrates');
      },
    });
  });

  useEffect(() => {
    if (currentIndex === -1)
      navigate('/pathway-assessment/welcome', { replace: true });
  }, [currentIndex, navigate]);

  if (isLoading) return <p>Onboarding loading...</p>;

  if (isError)
    return (
      <p className="text-destructive">Failed fetching onboarding status</p>
    );

  if (data?.data?.completed)
    return navigate('/app/dashboard', { replace: true });

  return (
    <FormProvider {...form}>
      <div className="relative min-h-screen bg-background flex flex-col items-center justify-center overflow-hidden">
        <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col gap-6 text-center px-6 py-8">
          <Outlet
            context={{
              currentIndex,
              totalSteps: PATHWAY_ASSESSMENT_STEPS.length,
              isSubmitting: isPathwayAssessmentCreating,
              submitAssisment,
            }}
          />
        </div>
      </div>
    </FormProvider>
  );
};

export default PathwayAssessmentLayout;
