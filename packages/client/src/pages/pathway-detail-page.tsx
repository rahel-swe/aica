import { useParams } from 'react-router-dom';

import PathwaySidebar from '@/components/pathway-details-sidebar';
import SpinnerBars from '@/components/shadcn-space/spinner/spinner-06';

import { usePathwayDetailQuery } from '@/queries/pathway-query';
import PathwayDetailPanel from '@/components/recommendations/pathway-detail-panel';
import { ScrollArea } from '@/components/ui/scroll-area';
import NavigationBackButton from '@/components/navigation-back-button';

import { m } from '../paraglide/messages';

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
          data?.data && (
            <div className="h-full min-h-0 flex-1">
              <ScrollArea className="md:h-full">
                <div className="flex flex-col gap-6 pb-8 md:pt-2">
                  <NavigationBackButton
                    title={m.common_back()}
                    className="w-min md:mt-4"
                  />
                  <PathwayDetailPanel detail={data.data} compact={false} />
                </div>
              </ScrollArea>
            </div>
          )
        )}
      </main>
    </div>
  );
}
