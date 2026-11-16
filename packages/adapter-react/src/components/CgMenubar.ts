import { createWrapper } from '../create-wrapper.js';
export const CgMenubar = createWrapper('cg-menubar', ['items'],
  {
    onMenubarSelect: 'cg-menubar-select',
  }
);
