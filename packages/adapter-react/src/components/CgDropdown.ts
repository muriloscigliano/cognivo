import { createWrapper } from '../create-wrapper.js';
export const CgDropdown = createWrapper('cg-dropdown', ['open', 'position', 'items'],
  {
    onOpen: 'cg-dropdown-open',
    onClose: 'cg-dropdown-close',
    onSelect: 'cg-dropdown-select',
  }
);
