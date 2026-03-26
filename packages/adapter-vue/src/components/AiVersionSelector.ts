import { createVueWrapper } from '../create-wrapper.js';
export const AiVersionSelector = createVueWrapper('ai-version-selector', {
  versions: { type: [String, Array, Object, Number, Boolean] },
  selected: { type: [String, Array, Object, Number, Boolean] },
}, {});
