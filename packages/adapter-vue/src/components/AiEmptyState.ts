import { createVueWrapper } from '../create-wrapper.js';
export const AiEmptyState = createVueWrapper('ai-empty-state', {
  icon: { type: [String, Array, Object, Number, Boolean] },
  title: { type: [String, Array, Object, Number, Boolean] },
  description: { type: [String, Array, Object, Number, Boolean] },
  actionLabel: { type: [String, Array, Object, Number, Boolean] },
  variant: { type: [String, Array, Object, Number, Boolean] },
}, {});
