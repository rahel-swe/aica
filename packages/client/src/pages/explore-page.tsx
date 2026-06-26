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
import { m } from '@/paraglide/messages';

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
        {m.explore_failed_to_load()}
      </div>
    );
  }

  const pathways = data?.pages.flatMap((page) => page.data.items) ?? [];

  return (
    <div className="flex flex-col flex-1 md:min-h-0 md:h-full gap-6 pt-18 pb-20 md:pt-0 md:pb-0">
      <ScrollArea className="p-4 md:p-0 md:pe-4">
        {/* SEARCH + FILTER */}
        <div className="flex flex-wrap gap-3 items-center my-4">
          <Input
            placeholder={m.explore_search_placeholder()}
            className="max-w-xs"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />

          <Select value={type} onValueChange={setType}>
            <SelectTrigger className="w-45">
              <SelectValue placeholder={m.explore_type_placeholder()} />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="career">{m.pathway_type_career()}</SelectItem>
              <SelectItem value="study">{m.pathway_type_study()}</SelectItem>
              <SelectItem value="hybrid">{m.pathway_type_hybrid()}</SelectItem>
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
            {m.explore_reset_cta()}
          </Button>

          <Button onClick={() => navigate('/app/saved-pathways')}>
            {m.explore_view_saved_pathways_cta()}
          </Button>
        </div>

        {/* ONLY PATHWAYS LOADING */}
        {isPending ? (
          <div className="flex justify-center py-20">
            <SpinnerBars />
          </div>
        ) : pathways.length === 0 ? (
          <div className="flex items-center justify-center py-20 text-muted-foreground">
            {m.explore_no_results()}
          </div>
        ) : (
          <>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {pathways.map((pathway) => (
                <PathwayListCard key={pathway.id} pathway={pathway} />
              ))}
            </div>

            {hasNextPage && (
              <div className="flex justify-center mt-6">
                <Button
                  onClick={() => fetchNextPage()}
                  disabled={isFetchingNextPage}
                >
                  {isFetchingNextPage
                    ? m.explore_loading_more()
                    : m.explore_load_more()}
                </Button>
              </div>
            )}
          </>
        )}
      </ScrollArea>
    </div>
  );
}
