import { createVueWrapper } from '../create-wrapper.js';
const T = { type: [String, Array, Object, Number, Boolean] };
export const CgNavigationMenu = createVueWrapper('cg-navigation-menu', { items: T, openDelay: T, closeDelay: T }, {});
