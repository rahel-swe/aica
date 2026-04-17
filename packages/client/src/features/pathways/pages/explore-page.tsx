import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ShellPage } from '@/shared/pages/page-primitives';

const pathways = [
  [
    'Software Engineering',
    'Build systems, products, and engineering workflows with strong technical depth.',
  ],
  [
    'Product Design',
    'Combine creativity, research, and user-centered problem solving.',
  ],
  [
    'Business Analytics',
    'Turn data into decisions across operations, strategy, and planning.',
  ],
  [
    'Digital Marketing',
    'Align messaging, campaigns, and audience growth with measurable outcomes.',
  ],
];

export default function ExplorePage() {
  return (
    <ShellPage
      eyebrow="Explore"
      title="Browse aligned pathways"
      description="Use explore to review faculties and careers before entering recommendation mode. This page should act as the searchable knowledge base of the app."
    >
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {pathways.map(([title, description]) => (
          <Card key={title} className="rounded-2xl">
            <CardHeader>
              <CardTitle className="text-lg">{title}</CardTitle>
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
