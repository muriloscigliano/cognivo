import { createVueWrapper } from '../create-wrapper.js';
export const AiApiKeyManager = createVueWrapper('ai-api-key-manager', {
  keys: { type: [String, Array, Object, Number, Boolean] },
  maxKeys: { type: [String, Array, Object, Number, Boolean] },
}, {});
