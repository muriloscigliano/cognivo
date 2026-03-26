import { createVueWrapper } from '../create-wrapper.js';
export const AiChangelog = createVueWrapper('ai-changelog', {
  entries: { type: [String, Array, Object, Number, Boolean] },
}, {});
