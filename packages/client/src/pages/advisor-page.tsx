import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ShellPage, StatusList } from '@/pages/page-primitives';

export default function AdvisorPage() {
  return (
    <ShellPage
      eyebrow="Advisor"
      title="Guided AI conversations"
      description="The advisor experience should stay grounded in AICA context and pathway data. It is not a generic chatbot and should always support decision quality."
    >
      <div className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle>Conversation workspace</CardTitle>
            <CardDescription>
              Use this area for follow-up questions, clearer explanations, and
              side-by-side comparisons.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-2xl border border-dashed px-4 py-16 text-center text-sm text-muted-foreground">
              Advisor chat UI placeholder. Replace with the production chat
              surface once messaging is connected.
            </div>
          </CardContent>
        </Card>
        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle>Advisor rules</CardTitle>
          </CardHeader>
          <CardContent>
            <StatusList
              items={[
                'Use only supported pathway context.',
                'Prefer explanation over speculation.',
                'Offer comparison and roadmap actions directly from the chat.',
              ]}
            />
          </CardContent>
        </Card>
      </div>
    </ShellPage>
  );
}
