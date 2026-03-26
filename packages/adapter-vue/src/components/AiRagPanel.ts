import { createVueWrapper } from '../create-wrapper.js';
export const AiRagPanel = createVueWrapper('ai-rag-panel', {
  documents: { type: [String, Array, Object, Number, Boolean] },
  query: { type: [String, Array, Object, Number, Boolean] },
  sortBy: { type: [String, Array, Object, Number, Boolean] },
}, {});
