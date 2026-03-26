import { createVueWrapper } from '../create-wrapper.js';
export const AiBatchProgress = createVueWrapper('ai-batch-progress', {
  total: { type: [String, Array, Object, Number, Boolean] },
  completed: { type: [String, Array, Object, Number, Boolean] },
  failed: { type: [String, Array, Object, Number, Boolean] },
  title: { type: [String, Array, Object, Number, Boolean] },
  status: { type: [String, Array, Object, Number, Boolean] },
}, {});
