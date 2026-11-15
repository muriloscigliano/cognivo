import { createWrapper } from '../create-wrapper.js';
export const AiDataPreview = createWrapper('ai-data-preview', ['data', 'format', 'maxRows', 'title'],
  {
    onDataConfirm: 'ai-data-confirm',
    onDataCancel: 'ai-data-cancel',
  }
);
