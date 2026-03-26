import { createVueWrapper } from '../create-wrapper.js';
export const AiEmbeddingViz = createVueWrapper('ai-embedding-viz', {
  points: { type: [String, Array, Object, Number, Boolean] },
  title: { type: [String, Array, Object, Number, Boolean] },
  showLabels: { type: [String, Array, Object, Number, Boolean] },
}, {});
