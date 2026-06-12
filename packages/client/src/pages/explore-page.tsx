import { useEffect, useState } from 'react';

import PathwayListCard from '@/components/cards/pathway-list-card';
import SpinnerBars from '@/components/shadcn-space/spinner/spinner-06';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { Button } from '@/components/ui/button';

import { usePathwaysQuery } from '@/queries/pathway-query';
import { usePathwaysStore } from '@/stores/pathways-store';
import { useSavedStore } from '@/stores/saved-resource-store';
import { useNavigate } from 'react-router-dom';

export default function ExplorePage() {
  const { search, type, setSearch, setType } = usePathwaysStore();
  const navigate = useNavigate();

  const loadSaved = useSavedStore((s) => s.loadSaved);

  const [inputValue, setInputValue] = useState(search);

  useEffect(() => {
    loadSaved();
  }, [loadSaved]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(inputValue);
    }, 400);

    return () => clearTimeout(timer);
  }, [inputValue, setSearch]);

  const {
    data,
    isPending,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = usePathwaysQuery();

  if (isError) {
    return (
      <div className="flex items-center justify-center py-20">
        Failed to load pathways.
      </div>
    );
  }

  const pathways = data?.pages.flatMap((page) => page.data.items) ?? [];

  return (
    <div className="flex flex-col flex-1 md:min-h-0 md:h-full gap-6 pt-18 pb-20 md:pt-0 md:pb-0">
      <ScrollArea className="p-4 md:p-0 md:pe-4">
        {/* HEADER */}
        <div className="space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight">
            Browse aligned pathways
          </h1>

          <p className="max-w-3xl text-muted-foreground">
            Use explore to review faculties and careers before entering
            recommendation mode.
          </p>
        </div>

        {/* SEARCH + FILTER */}
        <div className="flex flex-wrap gap-3 items-center my-4">
          <Input
            placeholder="Search pathways..."
            className="max-w-xs"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />

          <Select value={type} onValueChange={setType}>
            <SelectTrigger className="w-45">
              <SelectValue placeholder="Type" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="career">Career</SelectItem>
              <SelectItem value="study">Study</SelectItem>
              <SelectItem value="hybrid">Hybrid</SelectItem>
            </SelectContent>
          </Select>

          <Button
            variant="outline"
            onClick={() => {
              setSearch('');
              setType('');
              setInputValue('');
            }}
          >
            Reset
          </Button>

          <Button onClick={() => navigate('/app/saved-pathways')}>
            View Saved Pathways
          </Button>
        </div>

        {/* ONLY PATHWAYS LOADING */}
        {isPending ? (
          <div className="flex justify-center py-20">
            <SpinnerBars />
          </div>
        ) : pathways.length === 0 ? (
          <div className="flex items-center justify-center py-20 text-muted-foreground">
            No pathways found.
          </div>
        ) : (
          <>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {pathways.map((pathway) => (
                <PathwayListCard key={pathway.slug} pathway={pathway} />
              ))}
            </div>

            {hasNextPage && (
              <div className="flex justify-center mt-6">
                <Button
                  onClick={() => fetchNextPage()}
                  disabled={isFetchingNextPage}
                >
                  {isFetchingNextPage ? 'Loading...' : 'Load More'}
                </Button>
              </div>
            )}
          </>
        )}
      </ScrollArea>
    </div>
  );
}
