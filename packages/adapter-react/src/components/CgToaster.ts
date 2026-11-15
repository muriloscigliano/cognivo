import { createWrapper } from '../create-wrapper.js';
export const CgToaster = createWrapper('cg-toaster', ['position', 'max', 'gap'],
  {
    onDismiss: 'cg-toaster-dismiss',
    onAction: 'cg-toaster-action',
  }
);
