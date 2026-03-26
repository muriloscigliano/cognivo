import { createVueWrapper } from '../create-wrapper.js';
export const AiPermissionGate = createVueWrapper('ai-permission-gate', {
  permissions: { type: [String, Array, Object, Number, Boolean] },
  currentRole: { type: [String, Array, Object, Number, Boolean] },
}, {});
