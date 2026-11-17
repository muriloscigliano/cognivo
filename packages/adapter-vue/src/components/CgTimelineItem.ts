import { createVueWrapper } from '../create-wrapper.js';

const T = { type: [String, Array, Object, Number, Boolean] };

export const CgTimelineItem = createVueWrapper('cg-timeline-item', {
  label: T, variant: T,
}, {});
