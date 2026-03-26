import { createVueWrapper } from '../create-wrapper.js';
export const AiToolCardResolver = createVueWrapper('ai-tool-card-resolver', {
  toolName: { type: [String, Array, Object, Number, Boolean] },
  toolData: { type: [String, Array, Object, Number, Boolean] },
  registry: { type: [String, Array, Object, Number, Boolean] },
  loading: { type: [String, Array, Object, Number, Boolean] },
}, {});
