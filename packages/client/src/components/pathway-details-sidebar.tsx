import { usePathwaysQuery } from '@/queries/pathway-query';
import { useNavigate } from 'react-router-dom';
import { ScrollArea } from './ui/scroll-area';

export default function PathwaySidebar() {
  const navigate = useNavigate();
  const { data, isPending } = usePathwaysQuery();

  if (isPending) return <p>wait a minut all data is comming....</p>;

  return (
    <aside className="hidden md:flex w-80 flex-col">
      <div className="sticky top-20 flex flex-col rounded-4xl border bg-card h-[98%] min-h-0 pb-14 overflow-hidden">
        {/* Header */}
        <div className="border-b p-4">
          <h2 className="text-sm font-semibold text-muted-foreground">
            All Pathways
          </h2>
        </div>

        {/* LIST */}
        <ScrollArea className="h-full">
          <div className="flex-1 p-2 space-y-2 h-full">
            {data?.data.map((item) => (
              <div
                key={item._id}
                onClick={() => navigate(`/app/pathways/${item._id}`)}
                className={`
                cursor-pointer rounded-lg px-3 py-2 text-sm transition
                hover:bg-muted
              
              `}
              >
                {item.title}
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
    </aside>
  );
}
