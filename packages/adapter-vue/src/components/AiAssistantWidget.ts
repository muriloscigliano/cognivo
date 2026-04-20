import { createVueWrapper } from '../create-wrapper.js';
export const AiAssistantWidget = createVueWrapper('ai-assistant-widget', {
  expanded: { type: Boolean, default: false },
  position: { type: String, default: 'bottom-right' },
  welcomeMessage: { type: String, default: 'How can I help you?' },
  title: { type: String, default: 'Assistant' },
  messages: { type: Array, default: () => [] },
}, {});
