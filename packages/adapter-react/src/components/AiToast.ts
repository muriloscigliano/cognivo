import { createWrapper } from '../create-wrapper.js';

export const AiToast = /* @__PURE__ */ createWrapper(
  'ai-toast',
  ['position'],
  {
    onDismiss: 'ai-toast-dismiss',
  }
);
