import { createVueWrapper } from '../create-wrapper.js';

export const AiToast = createVueWrapper(
  'ai-toast',
  {
    position: { type: [String, Array, Object, Number, Boolean] },
  },
  {}
);
