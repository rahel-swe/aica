/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  ONBOARDING_STEPS,
  onboardingDefaultValues,
} from '@/constants/onboarding-steps';
import {
  getOnboardingStatus,
  submitOnboardingProfile,
} from '@/services/assessment-service';
import { onboardingFormSchema } from '@contracts/shared/schemas/onboarding-schema';
import type { OnboardingFormValues } from '@contracts/shared/types/onboarding-types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useMemo, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Outlet, useNavigate, useParams } from 'react-router-dom';

export type OnboardingOutletContext = {
  currentIndex: number;
  totalSteps: number;
  isSubmitting: boolean;
  submitAssisment: () => Promise<void>;
};

const OnboardingLayout = () => {
  const [isOnboardSatus, setIsOnboardSatus] = useState(false);
  const [isOnboardLoading, setIsOnboardLoading] = useState(false);
  const [isOnboardError, setIsOnboardError] = useState(false);

  const navigate = useNavigate();
  const { stepId } = useParams();

  useEffect(() => {
    const setOnboardingStatus = async () => {
      try {
        setIsOnboardLoading(true);
        const { data } = await getOnboardingStatus();

        setIsOnboardSatus(data.completed);
        setIsOnboardLoading(false);
      } catch (error) {
        setIsOnboardError(true);
        setIsOnboardLoading(false);
      }
    };

    setOnboardingStatus();
  }, []);

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
    const result = await submitOnboardingProfile(payload);

    if (result.success) navigate('/congrates');
  });

  // If step id was out of the box then navigate to welcome
  useEffect(() => {
    if (currentIndex === -1) navigate('/onboarding/welcome', { replace: true });
  }, [currentIndex, navigate]);

  if (isOnboardLoading) return <p>Onboarding loading...</p>;

  if (isOnboardError)
    return (
      <p className="text-destructive">Failed fetching onboarding status</p>
    );

  if (isOnboardSatus) return navigate('/app/dashboard');

  return (
    <FormProvider {...form}>
      <div className="relative min-h-screen bg-background flex flex-col items-center justify-center overflow-hidden">
        {/* Foreground Content */}
        <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col gap-6 text-center px-6 py-8">
          <Outlet
            context={{
              currentIndex,
              totalSteps: ONBOARDING_STEPS.length,
              isSubmitting: form.formState.isSubmitting,
              submitAssisment,
            }}
          />
        </div>
      </div>
    </FormProvider>
  );
};

export default OnboardingLayout;
