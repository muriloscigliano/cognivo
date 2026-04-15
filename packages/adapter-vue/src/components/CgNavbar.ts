import { createVueWrapper } from '../create-wrapper.js';

const T = { type: [String, Array, Object, Number, Boolean] };

export const CgNavbar = createVueWrapper('cg-navbar', {
  sticky: T, bordered: T, elevated: T, responsive: T, variant: T, navStyle: T, mobileOpen: T,
}, {});
