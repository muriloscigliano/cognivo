import { createVueWrapper } from '../create-wrapper.js';
export const AiWorkflowBuilder = createVueWrapper('ai-workflow-builder', {
  steps: { type: [String, Array, Object, Number, Boolean] },
  title: { type: [String, Array, Object, Number, Boolean] },
}, {});
