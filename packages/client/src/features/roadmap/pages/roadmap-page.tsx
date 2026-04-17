import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ShellPage } from '@/shared/pages/page-primitives';

export default function RoadmapPage() {
  return (
    <ShellPage
      eyebrow="Roadmap"
      title="Turn direction into next steps"
      description="The roadmap should stay editable and practical, with short-term milestones, skill-building tasks, and real activities that help the user move forward."
    >
      <div className="grid gap-4 md:grid-cols-3">
        {[
          [
            'Short-term',
            'Clarify the chosen direction, gather learning sources, and complete the first focused practice task.',
          ],
          [
            'Mid-term',
            'Build the most relevant skills, complete a portfolio-quality project, and review progress checkpoints.',
          ],
          [
            'Long-term',
            'Prepare for internships, applications, advanced study, or career transition milestones.',
          ],
        ].map(([title, description]) => (
          <Card key={title} className="rounded-2xl">
            <CardHeader>
              <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="leading-6">
                {description}
              </CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </ShellPage>
  );
}
