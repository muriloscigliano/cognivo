import { createWrapper } from '../create-wrapper.js';
export const CgAlertDialog = /* @__PURE__ */ createWrapper('cg-alert-dialog', ['open', 'title', 'description', 'confirmLabel', 'cancelLabel', 'destructive', 'loading', 'closable'],
  {
    onAlertOpen: 'cg-alert-open',
    onAlertClose: 'cg-alert-close',
    onAlertConfirm: 'cg-alert-confirm',
    onAlertCancel: 'cg-alert-cancel',
  }
);
