import { createWrapper } from '../create-wrapper.js';
export const CgDrawer = /* @__PURE__ */ createWrapper('cg-drawer', ['open', 'side', 'size', 'title', 'closable', 'persistent'],
  {
    onOpen: 'cg-drawer-open',
    onClose: 'cg-drawer-close',
    onBack: 'cg-drawer-back',
  }
);
