import { createVueWrapper } from '../create-wrapper.js';
export const AiCopyButton = createVueWrapper('ai-copy-button', {
  value: { type: [String, Array, Object, Number, Boolean] },
  label: { type: [String, Array, Object, Number, Boolean] },
  variant: { type: [String, Array, Object, Number, Boolean] },
  timeout: { type: [String, Array, Object, Number, Boolean] },
}, {});
