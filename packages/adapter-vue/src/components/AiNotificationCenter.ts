import { createVueWrapper } from '../create-wrapper.js';
export const AiNotificationCenter = createVueWrapper('ai-notification-center', {
  notifications: { type: [String, Array, Object, Number, Boolean] },
  maxVisible: { type: [String, Array, Object, Number, Boolean] },
}, {});
