import { createWrapper } from '../create-wrapper.js';

export const AiAnnotation = createWrapper(
  'ai-annotation',
  ['content', 'annotations', 'labels', 'editable'],
  {
    onSelect: 'ai-annotation-select',
    onRemove: 'ai-annotation-remove',
    onAdd: 'ai-annotation-add',
  }
);
