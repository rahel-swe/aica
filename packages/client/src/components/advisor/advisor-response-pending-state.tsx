import { Loader2 } from 'lucide-react';
import { Card, CardHeader } from '../ui/card';

const AdvisorResponsePendingState = () => {
  return (
    <Card className="rounded-2xl  bg-card shadow-sm">
      <CardHeader>
        <div className="flex items-center gap-2.5 text-sm font-medium text-foreground">
          <Loader2 className="size-4 animate-spin text-muted-foreground" />
          Reading your AICA context…
        </div>
        <p className="text-xs leading-5 text-muted-foreground">
          Response is shaped around your pathway, roadmap, and recommendations.
        </p>
      </CardHeader>
    </Card>
  );
};

export default AdvisorResponsePendingState;
