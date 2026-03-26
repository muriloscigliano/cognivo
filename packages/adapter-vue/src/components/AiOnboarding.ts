import { createVueWrapper } from '../create-wrapper.js';
export const AiOnboarding = createVueWrapper('ai-onboarding', {
  steps: { type: [String, Array, Object, Number, Boolean] },
  active: { type: [String, Array, Object, Number, Boolean] },
  dismissible: { type: [String, Array, Object, Number, Boolean] },
}, {});
