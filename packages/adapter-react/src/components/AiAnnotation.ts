import { createWrapper } from '../create-wrapper.js';

export const AiAnnotation = createWrapper(
  'ai-annotation',
  ['content', 'annotations', 'labels', 'editable'],
  {}
);
