import { createVueWrapper } from '../create-wrapper.js';

const T = { type: [String, Array, Object, Number, Boolean] };

export const CgToggle = createVueWrapper('cg-toggle', {
  pressed: T, disabled: T, size: T, variant: T, rounded: T, value: T, name: T,
}, {});
