import { createWrapper } from '../create-wrapper.js';
export const CgLightbox = createWrapper('cg-lightbox', ['closable', 'images', 'index', 'open'], { onChange: 'cg-lightbox-change', onClose: 'cg-lightbox-close', onOpen: 'cg-lightbox-open' });
