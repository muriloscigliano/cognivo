import { createVueWrapper } from '../create-wrapper.js';
export const AiKeyboardShortcuts = createVueWrapper('ai-keyboard-shortcuts', {
  shortcuts: { type: [String, Array, Object, Number, Boolean] },
  open: { type: [String, Array, Object, Number, Boolean] },
}, {});
