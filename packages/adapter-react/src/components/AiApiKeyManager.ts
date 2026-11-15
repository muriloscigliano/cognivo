import { createWrapper } from '../create-wrapper.js';
export const AiApiKeyManager = createWrapper('ai-api-key-manager', ['keys', 'maxKeys'],
  {
    onKeyCreate: 'ai-key-create',
    onKeyRevoke: 'ai-key-revoke',
    onKeyDelete: 'ai-key-delete',
  }
);
