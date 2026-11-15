import { createWrapper } from '../create-wrapper.js';
export const AiLabelingBoard = createWrapper('ai-labeling-board', ['items', 'labels', 'allowCustomLabels', 'mode'],
  {
    onLabelAssign: 'ai-label-assign',
    onLabelRemove: 'ai-label-remove',
    onLabelCreate: 'ai-label-create',
  }
);
