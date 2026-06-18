import { useParams } from 'react-router-dom';

import PathwayDetailsCard from '@/components/cards/pathway-details-card';
import PathwaySidebar from '@/components/pathway-details-sidebar';
import SpinnerBars from '@/components/shadcn-space/spinner/spinner-06';

import { usePathwayDetailQuery } from '@/queries/pathway-query';

export default function PathwayDetailPage() {
  const { pathwaySlug } = useParams();
  const { data, isPending } = usePathwayDetailQuery(pathwaySlug ?? '');

  return (
    <div className="mx-auto flex max-w-7xl gap-6 p-6 md:py-0 md:pe-2 h-full">
      <PathwaySidebar />

      <main className="flex-1">
        {isPending ? (
          <div className="flex items-center justify-center min-h-[60vh]">
            <SpinnerBars />
          </div>
        ) : (
          data?.data && <PathwayDetailsCard pathway={data.data} />
        )}
      </main>
    </div>
  );
}
