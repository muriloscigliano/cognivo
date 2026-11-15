import { createWrapper } from '../create-wrapper.js';
export const AiChangelog = createWrapper('ai-changelog', ['entries'],
  {
    onEntryClick: 'ai-changelog-entry-click',
    onRollback: 'ai-changelog-rollback',
  }
);
