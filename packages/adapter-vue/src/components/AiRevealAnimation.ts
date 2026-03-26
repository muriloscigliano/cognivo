import { createVueWrapper } from '../create-wrapper.js';
export const AiRevealAnimation = createVueWrapper('ai-reveal-animation', {
  type: { type: [String, Array, Object, Number, Boolean] },
  delay: { type: [String, Array, Object, Number, Boolean] },
  duration: { type: [String, Array, Object, Number, Boolean] },
  visible: { type: [String, Array, Object, Number, Boolean] },
}, {});
