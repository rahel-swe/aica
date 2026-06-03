import AdvisorHeader from '@/components/advisor/advisor-header';
import { AdvisorHistoryList } from '@/components/advisor/advisor-history-list';
import { AdvisorInputBox } from '@/components/advisor/advisor-input-box';
import { AdvisorResponsePanel } from '@/components/advisor/advisor-response-panel';
import type { AdvisorPrompt } from '@/components/advisor/advisor-ui-data';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import { useAdvisorMutation } from '@/queries/advisor-query';
import { useAdvisorHistoryStore } from '@/stores/advisor-history-store';
import type { AdvisorResponse } from '@contracts/shared/types/advisor-types';
import { useEffect } from 'react';

export default function AdvisorPage() {
  const { setSelectedHistory, selectedHistory } = useAdvisorHistoryStore();
  const isMobile = useIsMobile(768);

  const { mutate, isPending, data } = useAdvisorMutation();

  const activeResponse: AdvisorResponse | undefined =
    selectedHistory?.response ?? data?.data;

  useEffect(() => {
    setSelectedHistory(null);
  }, []);

  const askAdvisor = (payload: {
    message: string;
    mode?: AdvisorPrompt['mode'];
    source?: AdvisorPrompt['source'];
  }) => {
    const cleanMessage = payload.message.trim();
    if (cleanMessage.length < 3 || isPending) return;

    setSelectedHistory(null);
    mutate({
      message: cleanMessage,
      mode: payload.mode,
      source: payload.source,
    });
  };

  return (
    <main className="flex flex-col gap-5 md:flex-row w-full min-h-0 h-full pt-28  md:pt-0 md:overflow-hidden">
      {!isMobile && <AdvisorHistoryList onSelect={setSelectedHistory} />}
      <section className="md:flex md:flex-col md:justify-center flex-1 rounded-2xl md:border-t md:border-s md:min-h-0">
        {isMobile && (
          <AdvisorHeader
            onSelect={setSelectedHistory}
            className="fixed top-19 md:static z-20 w-full px-6"
          />
        )}

        <AdvisorResponsePanel
          response={activeResponse}
          isPending={isPending}
          onFollowUp={(followUp) =>
            askAdvisor({
              message: followUp,
              mode: activeResponse?.mode,
              source: activeResponse?.source,
            })
          }
          className={cn(
            'flex flex-col self-center',
            !activeResponse && 'mt-[25%]'
          )}
        />

        <AdvisorInputBox
          isPending={isPending}
          className="bottom-18 mb-auto "
          onSubmit={(message) =>
            askAdvisor({
              message,
              mode: 'general',
              source: 'advisor',
            })
          }
        />
      </section>
    </main>
  );
}
