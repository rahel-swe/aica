import { AdvisorInputBox } from '@/components/advisor/advisor-input-box';
import { AdvisorPromptGrid } from '@/components/advisor/advisor-prompt-grid';
import { AdvisorResponsePanel } from '@/components/advisor/advisor-response-panel';
import { useAdvisorMutation } from '@/queries/advisor-query';
import { useState } from 'react';

export default function AdvisorPage() {
  const [message, setMessage] = useState('');

  const advisorMutation = useAdvisorMutation();
  const submitPrompt = (prompt = message) => {
    const cleanPrompt = prompt.trim();

    if (cleanPrompt.length < 3 || advisorMutation.isPending) return;
    setMessage(cleanPrompt);
    advisorMutation.mutate({ message: cleanPrompt });
  };

  return (
    <main className="h-full flex flex-col items-center justify-center">
      <section className="space-y-5">
        <AdvisorResponsePanel
          response={advisorMutation.data?.data}
          isPending={advisorMutation.isPending}
          onFollowUp={submitPrompt}
        />
        <AdvisorInputBox
          value={message}
          isPending={advisorMutation.isPending}
          onChange={setMessage}
          onSubmit={() => submitPrompt()}
        />
        <AdvisorPromptGrid onPromptSelect={submitPrompt} />
      </section>
    </main>
  );
}
