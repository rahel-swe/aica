import { AdvisorMobileDrawer } from './advisor-mobile-drawer';
import CloseAdvisor from './close-advisor';
import StartNewConversation from './start-new-conversation';

export function AdvisorChatHeader() {
  return (
    <header className="flex items-center justify-between bg-background px-4 pt-3  shrink-0 z-10 h-min w-full">
      <AdvisorMobileDrawer />

      <div className="flex items-center gap-x-2">
        <StartNewConversation title="New chat" />
        <CloseAdvisor title="Close chat" />
      </div>
    </header>
  );
}
