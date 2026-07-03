import { createVueWrapper } from '../create-wrapper.js';

const T = { type: [String, Array, Object, Number, Boolean] };

export const CgAppShell = createVueWrapper('cg-app-shell', {
  headerHeight: T,
  sidebarCollapsed: T,
  sidebarPosition: T,
  sidebarWidth: T,
  stickyHeader: T,
}, { 'toggle': 'cg-app-shell-toggle' });
