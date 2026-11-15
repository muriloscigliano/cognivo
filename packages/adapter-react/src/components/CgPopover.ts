import { createWrapper } from '../create-wrapper.js';
export const CgPopover = createWrapper('cg-popover', ['open', 'placement', 'offset', 'arrow', 'trigger', 'closable', 'size', 'rounded'],
  {
    onOpen: 'cg-popover-open',
    onClose: 'cg-popover-close',
  }
);
