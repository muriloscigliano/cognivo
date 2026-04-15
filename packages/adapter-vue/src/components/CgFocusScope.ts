import { createVueWrapper } from '../create-wrapper.js';
const T = { type: [String, Array, Object, Number, Boolean] };
export const CgFocusScope = createVueWrapper('cg-focus-scope', { active: T, loop: T, returnFocus: T }, {});
