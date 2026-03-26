import { createVueWrapper } from '../create-wrapper.js';
export const AiEvalScorecard = createVueWrapper('ai-eval-scorecard', {
  scores: { type: [String, Array, Object, Number, Boolean] },
  grade: { type: [String, Array, Object, Number, Boolean] },
  comparison: { type: [String, Array, Object, Number, Boolean] },
}, {});
