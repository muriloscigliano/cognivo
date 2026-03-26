import { createVueWrapper } from '../create-wrapper.js';
export const AiFormGenerator = createVueWrapper('ai-form-generator', {
  schema: { type: [String, Array, Object, Number, Boolean] },
  values: { type: [String, Array, Object, Number, Boolean] },
  loading: { type: [String, Array, Object, Number, Boolean] },
}, {});
