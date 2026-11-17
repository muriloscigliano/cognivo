import { createWrapper } from '../create-wrapper.js';
export const CgModal = /* @__PURE__ */ createWrapper('cg-modal', ['open', 'title', 'size', 'closable', 'persistent'],
  {
    onOpen: 'cg-modal-open',
    onClose: 'cg-modal-close',
  }
);
