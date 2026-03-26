import { createVueWrapper } from '../create-wrapper.js';

export const AiAnnotation = createVueWrapper(
  'ai-annotation',
  {
    content: { type: [String, Array, Object, Number, Boolean] },
    annotations: { type: [String, Array, Object, Number, Boolean] },
    labels: { type: [String, Array, Object, Number, Boolean] },
    editable: { type: [String, Array, Object, Number, Boolean] },
  },
  {}
);
