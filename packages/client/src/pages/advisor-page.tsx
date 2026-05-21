import { AdvisorInputBox } from '@/components/advisor/advisor-input-box';
import { AdvisorPromptGrid } from '@/components/advisor/advisor-prompt-grid';
import { AdvisorResponsePanel } from '@/components/advisor/advisor-response-panel';
import { useAdvisorMutation } from '@/queries/advisor-query';
import { useState } from 'react';

export default function AdvisorPage() {
  const [message, setMessage] = useState('');
  const {
    mutate: advisorMutate,
    isPending,
    data: advisorResponse,
    isSuccess: avisorMutateSuccess,
  } = useAdvisorMutation();

  const handleBuiltInPrompt = (prompt = message) => {
    const cleanPrompt = prompt.trim();

    if (cleanPrompt.length < 3 || isPending) return;
    setMessage(cleanPrompt);
  };

  return (
    <main className="h-full flex flex-col items-center justify-center">
      <section className="grid gap-4">
        <AdvisorResponsePanel
          response={advisorResponse?.data}
          isPending={isPending}
          onFollowUp={handleBuiltInPrompt}
        />
        <AdvisorInputBox
          value={message}
          isPending={isPending}
          onChange={setMessage}
          onSubmit={() => {
            advisorMutate({
              message,
            });
            if (avisorMutateSuccess) setMessage('');
          }}
        />
        <AdvisorPromptGrid onPromptSelect={handleBuiltInPrompt} />
      </section>
    </main>
  );
}
