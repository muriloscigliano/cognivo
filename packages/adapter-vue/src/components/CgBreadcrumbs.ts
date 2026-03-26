import { createVueWrapper } from '../create-wrapper.js';
export const CgBreadcrumbs = createVueWrapper('cg-breadcrumbs', {
  items: { type: [String, Array, Object, Number, Boolean] },
  separator: { type: [String, Array, Object, Number, Boolean] },
}, {});
