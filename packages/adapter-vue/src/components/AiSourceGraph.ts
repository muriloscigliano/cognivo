import { createVueWrapper } from '../create-wrapper.js';
export const AiSourceGraph = createVueWrapper('ai-source-graph', {
  sources: { type: [String, Array, Object, Number, Boolean] },
  responseId: { type: [String, Array, Object, Number, Boolean] },
}, {});
