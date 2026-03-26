import { createVueWrapper } from '../create-wrapper.js';
export const AiFileUpload = createVueWrapper('ai-file-upload', {
  accept: { type: [String, Array, Object, Number, Boolean] },
  maxSize: { type: [String, Array, Object, Number, Boolean] },
  multiple: { type: [String, Array, Object, Number, Boolean] },
  label: { type: [String, Array, Object, Number, Boolean] },
}, {});
