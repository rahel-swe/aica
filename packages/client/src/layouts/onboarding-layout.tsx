import {
  ONBOARDING_STEPS,
  onboardingDefaultValues,
} from '@/constants/onboarding-steps';
import { submitOnboardingProfile } from '@/services/oboarding-service';
import { onboardingFormSchema } from '@contracts/shared/schemas/onboarding-schema';
import type {
  OnboardingFormValues,
  OnboardingSubmitRequest,
} from '@contracts/shared/types/onboarding-types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Outlet, useNavigate, useParams } from 'react-router-dom';

export type OnboardingOutletContext = {
  currentIndex: number;
  totalSteps: number;
  isSubmitting: boolean;
  submitProfile: () => Promise<void>;
};

const OnboardingLayout = () => {
  const navigate = useNavigate();
  const { stepId } = useParams();

  const currentIndex = useMemo(
    () => ONBOARDING_STEPS.findIndex((step) => step.id === stepId),
    [stepId]
  );

  const form = useForm<OnboardingFormValues>({
    resolver: zodResolver(onboardingFormSchema),
    defaultValues: onboardingDefaultValues,
    mode: 'onChange',
  });

  const submitProfile = async () => {
    const payload: OnboardingSubmitRequest = {
      responses: form.getValues(),
    };

    const result = await submitOnboardingProfile(payload);

    // navigate(result.data.nextRoute);
  };

  // If step id was out of the box then navigate to welcome
  useEffect(() => {
    if (currentIndex === -1) navigate('/onboarding/welcome', { replace: true });
  }, [currentIndex, navigate]);

  return (
    <FormProvider {...form}>
      <div className="min-h-screen bg-background px-4 py-6 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 text-center px-6 py-8">
          {/* <OnboardingProgress currentIndex={currentIndex} /> */}

          <Outlet
            context={
              {
                currentIndex,
                totalSteps: ONBOARDING_STEPS.length,
                isSubmitting: form.formState.isSubmitting,
                submitProfile,
              } satisfies OnboardingOutletContext
            }
          />
        </div>
      </div>
    </FormProvider>
  );
};

export default OnboardingLayout;
