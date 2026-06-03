import PathwayListCard from '@/components/cards/pathway-list-card';
import SpinnerBars from '@/components/shadcn-space/spinner/spinner-06';
import { ScrollArea } from '@/components/ui/scroll-area';
import { usePathwaysQuery } from '@/queries/pathway-query';

export default function ExplorePage() {
  const { data, isPending, isError } = usePathwaysQuery();

  if (isPending) return <SpinnerBars />;

  if (isError) {
    return (
      <div className="flex items-center justify-center py-20">
        Failed to load pathways.
      </div>
    );
  }

  const pathways = data?.data;

  return (
    <div className="flex flex-colc flex-1 md:min-h-0 md:h-full gap-6 pt-18 pb-20 md:pt-0 md:pb-0">
      <ScrollArea className="p-4 md:p-0 md:pe-4">
        <div className="space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight">
            Browse aligned pathways
          </h1>
          <p className="max-w-3xl text-muted-foreground">
            Use explore to review faculties and careers before entering
            recommendation mode.
          </p>
        </div>
        {pathways.length === 0 ? (
          <div className="flex items-center justify-center py-20 text-muted-foreground">
            No pathways found.
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {pathways.map((pathway) => (
              <PathwayListCard key={pathway.slug} pathway={pathway} />
            ))}
          </div>
        )}
      </ScrollArea>
    </div>
  );
}
