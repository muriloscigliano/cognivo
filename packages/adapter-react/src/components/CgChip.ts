import { createWrapper } from '../create-wrapper.js';
export const CgChip = /* @__PURE__ */ createWrapper('cg-chip', ['label', 'variant', 'removable', 'size', 'icon', 'disabled'],
  {
    onChipClick: 'cg-chip-click',
    onRemove: 'cg-chip-remove',
  }
);
