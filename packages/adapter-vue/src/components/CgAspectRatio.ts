import { createVueWrapper } from '../create-wrapper.js';

const T = { type: [String, Array, Object, Number, Boolean] };

export const CgAspectRatio = createVueWrapper('cg-aspect-ratio', {
  ratio: T,
}, {});
