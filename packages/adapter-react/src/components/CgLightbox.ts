import { createWrapper } from '../create-wrapper.js';
export const CgLightbox = /* @__PURE__ */ createWrapper('cg-lightbox', ['closable', 'images', 'index', 'open'],
  {
    onLightboxChange: 'cg-lightbox-change',
    onClose: 'cg-lightbox-close',
    onOpen: 'cg-lightbox-open',
  }
);
