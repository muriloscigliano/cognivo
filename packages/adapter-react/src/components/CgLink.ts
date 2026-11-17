import { createWrapper } from '../create-wrapper.js';
export const CgLink = /* @__PURE__ */ createWrapper('cg-link', ['href', 'variant', 'external', 'disabled', 'size'],
  {
    onLinkClick: 'cg-link-click',
  }
);
