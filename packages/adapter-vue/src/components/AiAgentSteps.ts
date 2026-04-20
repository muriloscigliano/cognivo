import { createVueWrapper } from '../create-wrapper.js';
export const AiAgentSteps = createVueWrapper('ai-agent-steps', {
  steps: { type: Array, default: () => [] },
  contained: { type: Boolean, default: false },
}, {});
