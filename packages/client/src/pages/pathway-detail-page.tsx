import { useParams, useNavigate } from 'react-router-dom';

import PathwayDetailsCard from '@/components/cards/pathway-details-card';
import SpinnerBars from '@/components/shadcn-space/spinner/spinner-06';

import {
  usePathwayDetailQuery,
  usePathwaysQuery,
} from '@/queries/pathway-query';

export default function PathwayDetailPage() {
  const { pathwayId } = useParams();
  const navigate = useNavigate();

  const { data, isPending } = usePathwayDetailQuery(pathwayId ?? '');
  const { data: listData } = usePathwaysQuery();

  return (
    <div className="mx-auto flex max-w-7xl gap-6 p-6 min-h-screen">
      {/* SIDEBAR (NEVER BLOCKED BY DETAIL LOADING) */}
      {isPending ? (
        <p>Pathway sidebar loading...</p>
      ) : (
        <aside className="hidden md:flex w-80 flex-col">
          <div className="sticky top-20 flex h-[calc(100vh-10rem)] flex-col rounded-xl border bg-card">
            {/* Header */}
            <div className="border-b p-4">
              <h2 className="text-sm font-semibold text-muted-foreground">
                All Pathways
              </h2>
            </div>

            {/* LIST */}
            <div className="flex-1 overflow-y-auto p-2 space-y-2">
              {listData?.data?.map((item) => (
                <div
                  key={item._id}
                  onClick={() => navigate(`/app/pathways/${item._id}`)}
                  className={`
                  cursor-pointer rounded-lg px-3 py-2 text-sm transition
                  hover:bg-muted
                  ${item._id === pathwayId ? 'bg-muted font-medium' : ''}
                `}
                >
                  {item.title}
                </div>
              ))}
            </div>
          </div>
        </aside>
      )}

      {/* DETAILS AREA */}
      <main className="flex-1">
        {/* ONLY DETAILS LOADING */}
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
