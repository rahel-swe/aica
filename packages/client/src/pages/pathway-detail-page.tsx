import { useParams } from 'react-router-dom';

import PathwayDetailsCard from '@/components/cards/pathway-details-card';
import PathwaySidebar from '@/components/pathway-details-sidebar';
import SpinnerBars from '@/components/shadcn-space/spinner/spinner-06';

import { usePathwayDetailQuery } from '@/queries/pathway-query';

export default function PathwayDetailPage() {
  const { pathwayId } = useParams();
  const { data, isPending } = usePathwayDetailQuery(pathwayId ?? '');

  return (
    <div className="mx-auto flex max-w-7xl gap-6 p-6 min-h-screen">
      {/* SIDEBAR */}
      <PathwaySidebar />

      {/* DETAILS AREA */}
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
