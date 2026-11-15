import { createWrapper } from '../create-wrapper.js';
export const AiCommandPalette = createWrapper('ai-command-palette', ['commands', 'open', 'placeholder'],
  {
    onCommandSelect: 'ai-command-select',
    onCommandClose: 'ai-command-close',
  }
);
