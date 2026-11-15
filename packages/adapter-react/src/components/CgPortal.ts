import { createWrapper } from '../create-wrapper.js';
export const CgPortal = createWrapper('cg-portal', ['target', 'disabled'],
  {
    onMount: 'cg-portal-mount',
    onUnmount: 'cg-portal-unmount',
  }
);
