import { createWrapper } from '../create-wrapper.js';
export const CgThumbnail = createWrapper('cg-thumbnail', ['alt', 'disabled', 'rounded', 'selectable', 'selected', 'size', 'src'],
  {
    onThumbnailSelect: 'cg-thumbnail-select',
  }
);
