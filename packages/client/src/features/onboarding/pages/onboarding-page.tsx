import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ShellPage, StatusList } from '@/shared/pages/page-primitives';

export default function OnboardingPage() {
  return (
    <ShellPage
      eyebrow="Onboarding"
      title="Collect structured guidance inputs"
      description="AICA should ask only for information that improves alignment: interests, strengths, goals, learning preferences, and relevant experience."
    >
      <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle>Assessment flow</CardTitle>
            <CardDescription>
              Use a multi-step form instead of a long single-page questionnaire.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <StatusList
              items={[
                'Interests and preferred fields',
                'Strengths and soft skills',
                'Learning preferences and work style',
                'Career goals and motivations',
                'Prior education or relevant experience',
              ]}
            />
          </CardContent>
        </Card>
        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle>Data quality rules</CardTitle>
            <CardDescription>
              Keep the onboarding practical and consistent with the AICA plan.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <StatusList
              items={[
                'Do not rely on exam-score-based filtering.',
                'Capture optional free text only where it helps explanation quality.',
                'Save partial progress so users can return later.',
              ]}
            />
          </CardContent>
        </Card>
      </div>
    </ShellPage>
  );
}
