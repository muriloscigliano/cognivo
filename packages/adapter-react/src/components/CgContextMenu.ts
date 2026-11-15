import { createWrapper } from '../create-wrapper.js';
export const CgContextMenu = createWrapper('cg-context-menu', ['open', 'items', 'disabled'],
  {
    onOpen: 'cg-context-menu-open',
    onClose: 'cg-context-menu-close',
    onSelect: 'cg-context-menu-select',
  }
);
