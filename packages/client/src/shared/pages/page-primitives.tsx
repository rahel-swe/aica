import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export function HeroCard() {
  return (
    <div className="relative overflow-hidden rounded-3xl border bg-card">
      <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-r from-primary/12 via-primary/5 to-transparent" />
      <div className="relative px-6 py-8 sm:px-8 sm:py-10">
        <Badge variant="secondary" className="mb-4">
          AI + Career + Alignment
        </Badge>
        <h1 className="max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl">
          Find the academic or career path that fits who you are and where you
          want to go.
        </h1>
        <p className="mt-4 max-w-2xl text-base text-muted-foreground sm:text-lg">
          AICA turns interests, strengths, goals, and experience into clear
          recommendations, structured comparisons, and next-step roadmaps.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button asChild size="lg">
            <Link to="/auth/sign-up">
              Start with AICA <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link to="/auth/sign-in">Sign in</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

export function SectionGrid({
  title,
  description,
  items,
}: {
  title: string;
  description: string;
  items: { title: string; description: string }[];
}) {
  return (
    <section className="space-y-5">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
        <p className="mt-2 max-w-2xl text-muted-foreground">{description}</p>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {items.map((item) => (
          <Card key={item.title} className="rounded-2xl">
            <CardHeader>
              <CardTitle className="text-base">{item.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-sm leading-6">
                {item.description}
              </CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

export function ShellPage({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <p className="text-sm font-medium text-primary">{eyebrow}</p>
        <h1 className="text-3xl font-semibold tracking-tight">{title}</h1>
        <p className="max-w-3xl text-muted-foreground">{description}</p>
      </div>
      <Separator />
      {children}
    </div>
  );
}

export function StatusList({ items }: { items: string[] }) {
  return (
    <div className="grid gap-3">
      {items.map((item) => (
        <div
          key={item}
          className="flex items-start gap-3 rounded-2xl border bg-card px-4 py-3"
        >
          <CheckCircle2 className="mt-0.5 h-4 w-4 text-primary" />
          <p className="text-sm text-card-foreground">{item}</p>
        </div>
      ))}
    </div>
  );
}
