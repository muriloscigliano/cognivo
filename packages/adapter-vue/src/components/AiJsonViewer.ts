import { createVueWrapper } from '../create-wrapper.js';
export const AiJsonViewer = createVueWrapper('ai-json-viewer', {
  data: { type: [String, Array, Object, Number, Boolean] },
  expanded: { type: [String, Array, Object, Number, Boolean] },
  maxDepth: { type: [String, Array, Object, Number, Boolean] },
}, {});
