import { createVueWrapper } from '../create-wrapper.js';

const T = { type: [String, Array, Object, Number, Boolean] };

export const CgTimeline = createVueWrapper('cg-timeline', {
  label: T, reorderable: T,
}, { 'reorder': 'cg-reorder' });
