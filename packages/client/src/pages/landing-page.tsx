import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { HeroCard, SectionGrid } from '@/pages/page-primitives';
import ModeToggle from '@/components/toggle-mode';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div>
            <p className="text-sm font-semibold tracking-[0.18em] text-primary">
              AICA
            </p>
            <p className="text-sm text-muted-foreground">AI Career Alignment</p>
          </div>
          <div className="flex gap-2">
            <Button asChild variant="ghost">
              <Link to="/auth/sign-in">Sign in</Link>
            </Button>
            <Button asChild>
              <Link to="/auth/sign-up">Get started</Link>
            </Button>
          </div>
        </div>
        <ModeToggle /> 
      </header>

      <main className="mx-auto flex w-full max-w-7xl flex-col gap-12 px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <HeroCard />
        <SectionGrid
          title="What AICA actually does"
          description="The platform is designed around alignment, not guesswork. It keeps the logic clear, the recommendations explainable, and the next steps practical."
          items={[
            {
              title: 'Profile users clearly',
              description:
                'Capture interests, strengths, work preferences, goals, and prior experience in a structured way.',
            },
            {
              title: 'Match pathways reliably',
              description:
                'Compare user profiles with pathway attributes and rank the best-fit options without overcomplicating the system.',
            },
            {
              title: 'Explain recommendations',
              description:
                'Use AI to turn structured matches into readable guidance, comparisons, and roadmaps.',
            },
          ]}
        />
        <SectionGrid
          title="Built for the AICA plan"
          description="The product supports students, graduates, and career changers with the exact flows defined in the proposal."
          items={[
            {
              title: 'Explore faculties and careers',
              description:
                'Browse pathways, review fit reasons, and inspect skills, expectations, and future opportunities.',
            },
            {
              title: 'Compare options side by side',
              description:
                'Move from uncertainty to decision with direct comparisons across effort, skill match, and outcomes.',
            },
            {
              title: 'Follow a roadmap',
              description:
                'Turn a chosen direction into short-term actions, learning milestones, and practical experience goals.',
            },
          ]}
        />
      </main>
    </div>
  );
}
