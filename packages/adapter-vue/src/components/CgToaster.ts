import { createVueWrapper } from '../create-wrapper.js';
const T = { type: [String, Array, Object, Number, Boolean] };
export const CgToaster = createVueWrapper('cg-toaster', { position: T, max: T, gap: T }, {});
