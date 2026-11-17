import { createWrapper } from '../create-wrapper.js';
export const AiPermissionGate = /* @__PURE__ */ createWrapper('ai-permission-gate', ['permissions', 'currentRole'],
  {
    onPermissionRequest: 'ai-permission-request',
  }
);
