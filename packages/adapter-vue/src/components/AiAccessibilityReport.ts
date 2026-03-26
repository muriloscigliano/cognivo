import { createVueWrapper } from '../create-wrapper.js';
export const AiAccessibilityReport = createVueWrapper('ai-accessibility-report', {
  issues: { type: [String, Array, Object, Number, Boolean] },
  score: { type: [String, Array, Object, Number, Boolean] },
  title: { type: [String, Array, Object, Number, Boolean] },
}, {});
