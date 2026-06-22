import { TrendingUp } from 'lucide-react';

const DashboardInsightsCard = ({
  label,
  value,
  helper,
}: {
  label: string;
  value: string;
  helper: string;
}) => {
  return (
    <div key={label} className="rounded-2xl border bg-background p-4 grow">
      <p className="text-xs uppercase tracking-wide text-muted-foreground">
        {label}
      </p>
      <div className="mt-2 flex items-end justify-between gap-3">
        <p className="text-2xl font-semibold tracking-tight">{value}</p>
        <TrendingUp className="h-5 w-5 text-muted-foreground" />
      </div>
      <p className="mt-2 text-sm text-muted-foreground">{helper}</p>
    </div>
  );
};

export default DashboardInsightsCard;
