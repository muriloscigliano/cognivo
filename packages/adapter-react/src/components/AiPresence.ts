import { createWrapper } from '../create-wrapper.js';
export const AiPresence = createWrapper('ai-presence', ['users', 'maxVisible'],
  {
    onUserClick: 'ai-presence-user-click',
  }
);
