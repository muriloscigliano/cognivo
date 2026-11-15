import { createWrapper } from '../create-wrapper.js';
export const CgAlertDialog = createWrapper('cg-alert-dialog', ['open', 'title', 'description', 'confirmLabel', 'cancelLabel', 'destructive', 'loading', 'closable'],
  {
    onAlertOpen: 'cg-alert-open',
    onAlertClose: 'cg-alert-close',
    onAlertConfirm: 'cg-alert-confirm',
    onAlertCancel: 'cg-alert-cancel',
  }
);
