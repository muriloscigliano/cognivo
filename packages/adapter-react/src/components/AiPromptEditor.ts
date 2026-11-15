import { createWrapper } from '../create-wrapper.js';

export const AiPromptEditor = createWrapper(
  'ai-prompt-editor',
  ['versions', 'editable'],
  {
    onPromptSave: 'ai-prompt-save',
    onPromptActivate: 'ai-prompt-activate',
  }
);
