import { createVueWrapper } from '../create-wrapper.js';
export const AiMemoryPanel = createVueWrapper('ai-memory-panel', {
  shortTerm: { type: [String, Array, Object, Number, Boolean] },
  longTerm: { type: [String, Array, Object, Number, Boolean] },
  searchable: { type: [String, Array, Object, Number, Boolean] },
}, {});
