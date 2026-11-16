import { createWrapper } from '../create-wrapper.js';
export const CgNavbar = createWrapper('cg-navbar', ['sticky', 'bordered', 'elevated', 'responsive', 'variant', 'navStyle', 'mobileOpen'],
  {
    onToggle: 'cg-navbar-toggle',
    onNavbarSelect: 'cg-navbar-select',
  }
);
