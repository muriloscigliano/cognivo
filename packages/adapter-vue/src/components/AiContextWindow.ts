import { createVueWrapper } from '../create-wrapper.js';
export const AiContextWindow = createVueWrapper('ai-context-window', {
  total: { type: [String, Array, Object, Number, Boolean] },
  segments: { type: [String, Array, Object, Number, Boolean] },
  cached: { type: [String, Array, Object, Number, Boolean] },
}, {});
