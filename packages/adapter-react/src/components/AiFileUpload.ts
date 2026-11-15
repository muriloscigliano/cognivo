import { createWrapper } from '../create-wrapper.js';
export const AiFileUpload = createWrapper('ai-file-upload', ['accept', 'maxSize', 'multiple', 'label'],
  {
    onFileSelect: 'ai-file-select',
    onFileError: 'ai-file-error',
  }
);
