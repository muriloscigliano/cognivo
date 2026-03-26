import { createVueWrapper } from '../create-wrapper.js';
export const AiFeatureFlag = createVueWrapper('ai-feature-flag', {
  flags: { type: [String, Array, Object, Number, Boolean] },
  environment: { type: [String, Array, Object, Number, Boolean] },
}, {});
