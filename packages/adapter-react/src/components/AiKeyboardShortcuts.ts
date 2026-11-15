import { createWrapper } from '../create-wrapper.js';
export const AiKeyboardShortcuts = createWrapper('ai-keyboard-shortcuts', ['shortcuts', 'open'],
  {
    onShortcutsClose: 'ai-shortcuts-close',
  }
);
