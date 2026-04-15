import { createVueWrapper } from '../create-wrapper.js';
const T = { type: [String, Array, Object, Number, Boolean] };
export const CgResizable = createVueWrapper('cg-resizable', { direction: T, defaultSize: T, min: T, max: T }, {});
