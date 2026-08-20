import { createVueWrapper } from '../create-wrapper.js';
export const AiThinkingOrb = createVueWrapper('ai-thinking-orb', {
  state: { type: [String, Array, Object, Number, Boolean] },
  size: { type: [String, Array, Object, Number, Boolean] },
  speed: { type: [String, Array, Object, Number, Boolean] },
  paused: { type: [String, Array, Object, Number, Boolean] },
  label: { type: [String, Array, Object, Number, Boolean] },
}, {});
