import { createWrapper } from '../create-wrapper.js';
export const CgHoverCard = createWrapper('cg-hover-card', ['open', 'placement', 'offset', 'openDelay', 'closeDelay'],
  {
    onOpen: 'cg-hover-card-open',
    onClose: 'cg-hover-card-close',
  }
);
