import { AdvisorHistoryList } from '@/components/advisor/advisor-history-list';
import { AdvisorInputBox } from '@/components/advisor/advisor-input-box';
import { AdvisorResponsePanel } from '@/components/advisor/advisor-response-panel';
import type { AdvisorPrompt } from '@/components/advisor/advisor-ui-data';
import {
  useAdvisorHistoryQuery,
  useAdvisorMutation,
} from '@/queries/advisor-query';
import type {
  AdvisorHistoryItem,
  AdvisorResponse,
} from '@contracts/shared/types/advisor-types';
import { useState } from 'react';

export default function AdvisorPage() {
  const [selectedHistory, setSelectedHistory] =
    useState<AdvisorHistoryItem | null>(null);
  const { data: history, isPending: isHistoryPending } =
    useAdvisorHistoryQuery();
  const { mutate, isPending, data } = useAdvisorMutation();

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
    <main className="flex flex-col gap-5 md:flex-row w-full">
      <section className="mx-auto flex flex-col items-center justify-center w-full gap-4">
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

      <AdvisorHistoryList
        items={history?.data}
        isPending={isHistoryPending}
        selectedId={selectedHistory?._id}
        onSelect={setSelectedHistory}
      />
    </main>
  );
}
