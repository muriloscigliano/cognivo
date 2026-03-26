import { createVueWrapper } from '../create-wrapper.js';
export const AiAvatar = createVueWrapper('ai-avatar', {
  src: { type: [String, Array, Object, Number, Boolean] },
  name: { type: [String, Array, Object, Number, Boolean] },
  size: { type: [String, Array, Object, Number, Boolean] },
  status: { type: [String, Array, Object, Number, Boolean] },
  type: { type: [String, Array, Object, Number, Boolean] },
}, {});
