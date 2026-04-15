import { createVueWrapper } from '../create-wrapper.js';

const T = { type: [String, Array, Object, Number, Boolean] };

export const CgSegmentedControl = createVueWrapper('cg-segmented-control', {
  options: T, value: T, name: T, disabled: T, size: T, full: T,
}, {});
