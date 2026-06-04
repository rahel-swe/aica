import { Button } from '@/components/ui/button';
import { CheckCircle2, CircleDashed, Pencil, Play } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Badge } from '../ui/badge';

export function AssessmentStatusRow({
  title,
  description,
  completed,
  to,
}: {
  title: string;
  description: string;
  completed: boolean;
  to: string;
}) {
  const Icon = completed ? CheckCircle2 : CircleDashed;

  return (
    <div className="flex flex-col md:flex-row items-start justify-between gap-4">
      <div className="flex gap-3 items-center flex-1">
        <Icon className="size-6.5" />
        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-2">
            <p className="font-medium text-sm">{title}</p>
            <Badge variant={completed ? 'secondary' : 'outline'}>
              {completed ? 'Complete' : 'Needs update'}
            </Badge>
          </div>
          <p className="text-sm leading-6 text-muted-foreground">
            {description}
          </p>
        </div>
      </div>

      <Button asChild variant="outline" size="lg">
        <Link to={to}>
          {completed ? <Pencil /> : <Play />}
          {completed ? 'Edit' : 'Start'}
        </Link>
      </Button>
    </div>
  );
}
