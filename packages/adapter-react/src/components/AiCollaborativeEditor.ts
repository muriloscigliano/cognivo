import { createWrapper } from '../create-wrapper.js';
export const AiCollaborativeEditor = createWrapper('ai-collaborative-editor', ['content', 'cursors', 'editable', 'placeholder'],
  {
    onEditorChange: 'ai-editor-change',
    onEditorCursorMove: 'ai-editor-cursor-move',
  }
);
