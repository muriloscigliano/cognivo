import { type PropType } from 'vue';
import { createVueWrapper } from '../create-wrapper.js';

export interface AiChatProps {
  aiClient?: unknown;
  dataset?: unknown[];
}

export const AiChat = createVueWrapper(
  'ai-chat',
  {
    aiClient: { type: Object as PropType<unknown>, default: undefined },
    dataset: { type: Array as PropType<unknown[]>, default: () => [] },
  },
  {
    'message-sent': 'ai-message-sent',
    'response-received': 'ai-response-received',
    'error': 'ai-error',
  }
);
