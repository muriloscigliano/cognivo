import { createVueWrapper } from '../create-wrapper.js';
export const AiDataPreview = createVueWrapper('ai-data-preview', {
  data: { type: [String, Array, Object, Number, Boolean] },
  format: { type: [String, Array, Object, Number, Boolean] },
  maxRows: { type: [String, Array, Object, Number, Boolean] },
  title: { type: [String, Array, Object, Number, Boolean] },
}, {});
