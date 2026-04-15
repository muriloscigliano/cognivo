import { createVueWrapper } from '../create-wrapper.js';
const T = { type: [String, Array, Object, Number, Boolean] };
export const CgPortal = createVueWrapper('cg-portal', { target: T, disabled: T }, {});
