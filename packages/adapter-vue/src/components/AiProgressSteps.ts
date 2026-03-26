import { createVueWrapper } from '../create-wrapper.js';
export const AiProgressSteps = createVueWrapper('ai-progress-steps', {
  phases: { type: [String, Array, Object, Number, Boolean] },
  compact: { type: [String, Array, Object, Number, Boolean] },
}, {});
