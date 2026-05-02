import {
  ONBOARDING_STEPS,
  onboardingDefaultValues,
} from '@/constants/onboarding-steps';
import { onboardingFormSchema } from '@contracts/shared/schemas/onboarding-schema';
import type { OnboardingFormValues } from '@contracts/shared/types/onboarding-types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Outlet, useNavigate, useParams } from 'react-router-dom';

import { useOnboardingStatusQuery } from '@/queries/onboarding-query';

import { useOnboardingCreateQuery } from '@/queries/onboarding-query';

export type OnboardingOutletContext = {
  currentIndex: number;
  totalSteps: number;
  isSubmitting: boolean;
  submitAssisment: () => void;
};

const OnboardingLayout = () => {
  const navigate = useNavigate();
  const { stepId } = useParams();

  const { data, isLoading, isError } = useOnboardingStatusQuery();

  const { mutateAsync, isPending: isOnboardingCreating } =
    useOnboardingCreateQuery();

  const currentIndex = useMemo(
    () => ONBOARDING_STEPS.findIndex((step) => step.id === stepId),
    [stepId]
  );

  const form = useForm<OnboardingFormValues>({
    resolver: zodResolver(onboardingFormSchema),
    defaultValues: onboardingDefaultValues as OnboardingFormValues,
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
    if (currentIndex === -1) navigate('/onboarding/welcome', { replace: true });
  }, [currentIndex, navigate]);

  if (isLoading) return <p>Onboarding loading...</p>;

  if (isError)
    return (
      <p className="text-destructive">Failed fetching onboarding status</p>
    );

  if (data?.data?.completed) {
    navigate('/app/dashboard', { replace: true });
    return null;
  }

  return (
    <FormProvider {...form}>
      <div className="relative min-h-screen bg-background flex flex-col items-center justify-center overflow-hidden">
        <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col gap-6 text-center px-6 py-8">
          <Outlet
            context={{
              currentIndex,
              totalSteps: ONBOARDING_STEPS.length,
              isSubmitting: isOnboardingCreating,
              submitAssisment,
            }}
          />
        </div>
      </div>
    </FormProvider>
  );
};

export default OnboardingLayout;
