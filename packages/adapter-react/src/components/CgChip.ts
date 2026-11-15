import { createWrapper } from '../create-wrapper.js';
export const CgChip = createWrapper('cg-chip', ['label', 'variant', 'removable', 'size', 'icon', 'disabled'],
  {
    onClick: 'cg-chip-click',
    onRemove: 'cg-chip-remove',
  }
);
