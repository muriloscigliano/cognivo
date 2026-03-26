import { createVueWrapper } from '../create-wrapper.js';
export const AiReasoningTree = createVueWrapper('ai-reasoning-tree', {
  nodes: { type: [String, Array, Object, Number, Boolean] },
  highlightPath: { type: [String, Array, Object, Number, Boolean] },
}, {});
