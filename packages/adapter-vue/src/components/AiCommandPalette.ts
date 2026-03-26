import { createVueWrapper } from '../create-wrapper.js';
export const AiCommandPalette = createVueWrapper('ai-command-palette', {
  commands: { type: [String, Array, Object, Number, Boolean] },
  open: { type: [String, Array, Object, Number, Boolean] },
  placeholder: { type: [String, Array, Object, Number, Boolean] },
}, {});
