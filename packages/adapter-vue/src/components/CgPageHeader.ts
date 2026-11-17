import { createVueWrapper } from '../create-wrapper.js';

const T = { type: [String, Array, Object, Number, Boolean] };

export const CgPageHeader = createVueWrapper('cg-page-header', {
  heading: T, description: T, backHref: T, backLabel: T, level: T,
}, {});
