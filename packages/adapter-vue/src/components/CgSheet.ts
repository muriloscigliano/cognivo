import { createVueWrapper } from '../create-wrapper.js';
const T = { type: [String, Array, Object, Number, Boolean] };
export const CgSheet = createVueWrapper('cg-sheet', { open: T, side: T, snapPoints: T, activeSnap: T, dismissible: T }, {});
