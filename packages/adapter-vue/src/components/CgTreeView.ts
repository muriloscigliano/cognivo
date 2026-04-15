import { createVueWrapper } from '../create-wrapper.js';
const T = { type: [String, Array, Object, Number, Boolean] };
export const CgTreeView = createVueWrapper('cg-tree-view', { items: T, multiple: T, selected: T }, {});
