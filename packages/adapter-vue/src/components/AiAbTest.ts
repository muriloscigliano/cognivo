import { createVueWrapper } from '../create-wrapper.js';
export const AiAbTest = createVueWrapper('ai-ab-test', {
  variantA: { type: [String, Array, Object, Number, Boolean] },
  variantB: { type: [String, Array, Object, Number, Boolean] },
  labelA: { type: [String, Array, Object, Number, Boolean] },
  labelB: { type: [String, Array, Object, Number, Boolean] },
  title: { type: [String, Array, Object, Number, Boolean] },
}, {});
