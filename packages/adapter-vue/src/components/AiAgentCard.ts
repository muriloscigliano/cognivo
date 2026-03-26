import { createVueWrapper } from '../create-wrapper.js';
export const AiAgentCard = createVueWrapper('ai-agent-card', {
  name: { type: [String, Array, Object, Number, Boolean] },
  role: { type: [String, Array, Object, Number, Boolean] },
  status: { type: [String, Array, Object, Number, Boolean] },
  task: { type: [String, Array, Object, Number, Boolean] },
  handoffChain: { type: [String, Array, Object, Number, Boolean] },
  capabilities: { type: [String, Array, Object, Number, Boolean] },
  avatar: { type: [String, Array, Object, Number, Boolean] },
}, {});
