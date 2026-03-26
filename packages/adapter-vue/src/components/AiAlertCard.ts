import { createVueWrapper } from '../create-wrapper.js';
export const AiAlertCard = createVueWrapper('ai-alert-card', {
  title: { type: [String, Array, Object, Number, Boolean] },
  message: { type: [String, Array, Object, Number, Boolean] },
  urgency: { type: [String, Array, Object, Number, Boolean] },
  deadline: { type: [String, Array, Object, Number, Boolean] },
  actionLabel: { type: [String, Array, Object, Number, Boolean] },
  dismissible: { type: [String, Array, Object, Number, Boolean] },
}, {});
