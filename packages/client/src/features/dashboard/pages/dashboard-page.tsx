import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ShellPage, StatusList } from '@/shared/pages/page-primitives';

export default function DashboardPage() {
  return (
    <ShellPage
      eyebrow="Overview"
      title="Your AICA dashboard"
      description="Track profile readiness, review current recommendations, and move directly into the next action without digging through disconnected screens."
    >
      <div className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="grid gap-4 md:grid-cols-2">
          {[
            [
              'Profile completion',
              '82%',
              'Your inputs are almost ready for a stronger recommendation run.',
            ],
            [
              'Top pathway',
              'Product Design',
              'High fit across creativity, collaboration, and portfolio-based growth.',
            ],
            [
              'Roadmap progress',
              '4 steps',
              'You already completed exploration and comparison milestones.',
            ],
            [
              'Advisor activity',
              '2 updates',
              'The advisor has new questions to sharpen your shortlist.',
            ],
          ].map(([title, value, description]) => (
            <Card key={title} className="rounded-2xl">
              <CardHeader className="pb-2">
                <CardDescription>{title}</CardDescription>
                <CardTitle className="text-2xl">{value}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle>Suggested next actions</CardTitle>
            <CardDescription>
              Keep the workflow moving from profile setup to decision quality.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <StatusList
              items={[
                'Complete onboarding preferences for better matching accuracy.',
                'Review the top three recommended pathways and save the strongest two.',
                'Use the advisor page to compare your shortlist before generating a roadmap.',
              ]}
            />
          </CardContent>
        </Card>
      </div>
    </ShellPage>
  );
}
