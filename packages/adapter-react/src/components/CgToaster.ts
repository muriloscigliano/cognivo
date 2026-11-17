import { createWrapper } from '../create-wrapper.js';
export const CgToaster = /* @__PURE__ */ createWrapper('cg-toaster', ['position', 'max', 'gap'],
  {
    onDismiss: 'cg-toaster-dismiss',
    onAction: 'cg-toaster-action',
  }
);
