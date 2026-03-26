import { createVueWrapper } from '../create-wrapper.js';

export const AiFeedback = createVueWrapper(
  'ai-feedback',
  {
    mode: { type: [String, Array, Object, Number, Boolean] },
    tags: { type: [String, Array, Object, Number, Boolean] },
    messageId: { type: [String, Array, Object, Number, Boolean] },
    showComment: { type: [String, Array, Object, Number, Boolean] },
  },
  {}
);
