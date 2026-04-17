import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ShellPage } from '@/shared/pages/page-primitives';

const matches = [
  {
    title: 'Product Design',
    fit: 'Strong fit',
    reasons: [
      'High creativity alignment',
      'Collaborative work preference',
      'Portfolio-friendly growth',
    ],
  },
  {
    title: 'Software Engineering',
    fit: 'Good fit',
    reasons: [
      'Problem-solving strength',
      'Structured learning preference',
      'Clear technical career track',
    ],
  },
  {
    title: 'Business Analytics',
    fit: 'Promising fit',
    reasons: [
      'Decision-making focus',
      'Data curiosity',
      'Cross-functional career options',
    ],
  },
];

export default function RecommendationsPage() {
  return (
    <ShellPage
      eyebrow="Recommendations"
      title="Your best-fit options"
      description="Recommendations should be readable, explainable, and easy to compare. The UI needs to prioritize why an option fits, not just list a title."
    >
      <div className="grid gap-4 xl:grid-cols-3">
        {matches.map((match) => (
          <Card key={match.title} className="rounded-2xl">
            <CardHeader>
              <div className="flex items-center justify-between gap-4">
                <CardTitle>{match.title}</CardTitle>
                <Badge>{match.fit}</Badge>
              </div>
              <CardDescription>
                Fit reasons grounded in profile alignment and pathway
                attributes.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {match.reasons.map((reason) => (
                <div
                  key={reason}
                  className="rounded-xl bg-muted px-3 py-2 text-sm text-muted-foreground"
                >
                  {reason}
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </ShellPage>
  );
}
