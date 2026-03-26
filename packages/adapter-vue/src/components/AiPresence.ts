import { createVueWrapper } from '../create-wrapper.js';
export const AiPresence = createVueWrapper('ai-presence', {
  users: { type: [String, Array, Object, Number, Boolean] },
  maxVisible: { type: [String, Array, Object, Number, Boolean] },
}, {});
