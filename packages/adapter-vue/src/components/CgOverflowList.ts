import { createVueWrapper } from '../create-wrapper.js';

const T = { type: [String, Array, Object, Number, Boolean] };

export const CgOverflowList = createVueWrapper('cg-overflow-list', {
  gap: T,
  minVisible: T,
  moreLabel: T,
}, { 'change': 'cg-overflow-change', 'select': 'cg-overflow-select' });
