import { createWrapper } from '../create-wrapper.js';
export const AiLabelingBoard = /* @__PURE__ */ createWrapper('ai-labeling-board', ['items', 'labels', 'allowCustomLabels', 'mode'],
  {
    onLabelAssign: 'ai-label-assign',
    onLabelRemove: 'ai-label-remove',
    onLabelCreate: 'ai-label-create',
  }
);
