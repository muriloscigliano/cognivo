import { createVueWrapper } from '../create-wrapper.js';

const T = { type: [String, Array, Object, Number, Boolean] };

export const CgToggleGroup = createVueWrapper('cg-toggle-group', {
  type: T, value: T, disabled: T, orientation: T, size: T, variant: T,
}, {});
