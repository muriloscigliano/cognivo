import { createVueWrapper } from '../create-wrapper.js';
export const AiRichMessage = createVueWrapper('ai-rich-message', {
  role: { type: [String, Array, Object, Number, Boolean] },
  text: { type: [String, Array, Object, Number, Boolean] },
  cards: { type: [String, Array, Object, Number, Boolean] },
  avatar: { type: [String, Array, Object, Number, Boolean] },
  timestamp: { type: [String, Array, Object, Number, Boolean] },
  actions: { type: [String, Array, Object, Number, Boolean] },
}, {});
