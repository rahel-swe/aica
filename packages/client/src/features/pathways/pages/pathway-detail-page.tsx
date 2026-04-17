import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ShellPage, StatusList } from '@/shared/pages/page-primitives';

export default function PathwayDetailPage() {
  return (
    <ShellPage
      eyebrow="Pathway detail"
      title="Pathway detail view"
      description="This page should explain who the path fits, which strengths matter most, what learning route is realistic, and which related pathways are close alternatives."
    >
      <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle>What this path should show</CardTitle>
          </CardHeader>
          <CardContent>
            <StatusList
              items={[
                'Overview and short description',
                'Who this path fits best',
                'Key skills and expectations',
                'Learning route and practical preparation',
                'Career opportunities and related options',
              ]}
            />
          </CardContent>
        </Card>
        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle>Page actions</CardTitle>
            <CardDescription>
              Keep decision-making actions close to the content.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <StatusList
              items={[
                'Save pathway',
                'Compare with another option',
                'Ask advisor for explanation',
                'Generate roadmap',
              ]}
            />
          </CardContent>
        </Card>
      </div>
    </ShellPage>
  );
}
