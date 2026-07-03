import { createWrapper } from '../create-wrapper.js';
export const CgAppShell = createWrapper('cg-app-shell', ['headerHeight', 'sidebarCollapsed', 'sidebarPosition', 'sidebarWidth', 'stickyHeader'], { onToggle: 'cg-app-shell-toggle' });
