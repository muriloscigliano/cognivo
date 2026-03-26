import { createVueWrapper } from '../create-wrapper.js';

export const CgList = createVueWrapper(
  'cg-list',
  {
    items: { type: Array, default: () => [] },
    variant: { type: String, default: 'bullet' },
    dividers: { type: Boolean, default: true },
    hoverable: { type: Boolean, default: false },
    clickable: { type: Boolean, default: false },
    emptyText: { type: String, default: 'No items' },
  },
  {
    'list-click': 'cg-list-click',
    'list-action': 'cg-list-action',
  }
);
