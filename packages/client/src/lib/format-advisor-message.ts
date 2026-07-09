import type { AdvisorChatMessage } from '@contracts/shared/types/advisor-types';

export const formatAdvisorMessage = (message: AdvisorChatMessage) => {
  return message.actions.length
    ? `${message.content}\n\nActions:\n${message.actions.map((a) => `- ${a}`).join('\n')}`
    : message.content;
};
