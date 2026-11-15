import { createWrapper } from '../create-wrapper.js';
export const AiAssistantWidget = createWrapper('ai-assistant-widget', ['expanded', 'position', 'welcomeMessage', 'title', 'messages'],
  {
    onAssistantClose: 'ai-assistant-close',
    onAssistantSend: 'ai-assistant-send',
  }
);
