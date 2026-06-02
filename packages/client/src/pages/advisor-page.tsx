import AdvisorHeader from '@/components/advisor/advisor-header';
import { AdvisorHistoryList } from '@/components/advisor/advisor-history-list';
import { AdvisorInputBox } from '@/components/advisor/advisor-input-box';
import { AdvisorResponsePanel } from '@/components/advisor/advisor-response-panel';
import type { AdvisorPrompt } from '@/components/advisor/advisor-ui-data';
import { useAdvisorHistoryListParams } from '@/hooks/use-advisor-history-list-params';
import { useIsMobile } from '@/hooks/use-mobile';
import { useAdvisorMutation } from '@/queries/advisor-query';
import type {
  AdvisorHistoryItem,
  AdvisorResponse,
} from '@contracts/shared/types/advisor-types';
import { useEffect, useState } from 'react';

export default function AdvisorPage() {
  const [selectedHistory, setSelectedHistory] =
    useState<AdvisorHistoryItem | null>(null);
  const isMobile = useIsMobile(768);
  const [{ historyId }] = useAdvisorHistoryListParams();

  const { mutate, isPending, data } = useAdvisorMutation();

  useEffect(() => {
    if (!historyId) setSelectedHistory(null);
  }, [historyId]);

  const activeResponse: AdvisorResponse | undefined =
    selectedHistory?.response ?? data?.data;

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
    <main className="flex flex-col justify-center gap-5 md:flex-row h-full w-full max-h-[86dvh]">
      {!isMobile && <AdvisorHistoryList onSelect={setSelectedHistory} />}
      <section className="flex flex-col items-center justify-center flex-1 h-full">
        <div className="mb-4 -mt-1 sticky top-19 z-20 w-full px-6">
          <AdvisorHeader onSelect={setSelectedHistory} />
        </div>

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
        />

        <AdvisorInputBox
          isPending={isPending}
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
