import { createVueWrapper } from '../create-wrapper.js';
export const AiDataLineage = createVueWrapper('ai-data-lineage', {
  rounded: { type: String, default: 'lg' },
  nodes: { type: Array, default: () => [] },
  edges: { type: Array, default: () => [] },
  highlightPath: { type: String, default: '' },
  direction: { type: String, default: 'horizontal' },
}, {});
