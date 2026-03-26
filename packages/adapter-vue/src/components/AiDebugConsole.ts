import { createVueWrapper } from '../create-wrapper.js';
export const AiDebugConsole = createVueWrapper('ai-debug-console', {
  entries: { type: [String, Array, Object, Number, Boolean] },
  open: { type: [String, Array, Object, Number, Boolean] },
  maxEntries: { type: [String, Array, Object, Number, Boolean] },
}, {});
