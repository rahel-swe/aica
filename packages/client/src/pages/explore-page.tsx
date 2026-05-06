import PathwayListCard from '@/components/cards/pathway-list-card';

import SpinnerBars from '@/components/shadcn-space/spinner/spinner-06';

import { ShellPage } from '@/pages/page-primitives';

import { usePathwaysQuery } from '@/queries/pathway-query';

export default function ExplorePage() {
  const { data, isPending, isError } = usePathwaysQuery();

  if (isPending) {
    return <SpinnerBars />;
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center py-20">
        Failed to load pathways.
      </div>
    );
  }

  const pathways = data?.data;

  return (
    <ShellPage
      eyebrow="Explore"
      title="Browse aligned pathways"
      description="Use explore to review faculties and careers before entering recommendation mode."
    >
      {pathways.length === 0 ? (
        <div className="flex items-center justify-center py-20 text-muted-foreground">
          No pathways found.
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {pathways.map((pathway) => (
            <PathwayListCard key={pathway.slug} pathway={pathway} />
          ))}
        </div>
      )}
    </ShellPage>
  );
}
