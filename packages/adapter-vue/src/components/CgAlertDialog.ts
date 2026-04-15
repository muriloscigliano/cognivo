import { createVueWrapper } from '../create-wrapper.js';

const T = { type: [String, Array, Object, Number, Boolean] };

export const CgAlertDialog = createVueWrapper('cg-alert-dialog', {
  open: T, title: T, description: T, confirmLabel: T, cancelLabel: T, destructive: T, loading: T, closable: T,
}, {});
