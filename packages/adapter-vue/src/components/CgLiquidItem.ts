import { createVueWrapper } from '../create-wrapper.js';
export const CgLiquidItem = createVueWrapper('cg-liquid-item', {
  effect: { type: [String, Array, Object, Number, Boolean] },
  x: { type: [String, Array, Object, Number, Boolean] },
  y: { type: [String, Array, Object, Number, Boolean] },
  scale: { type: [String, Array, Object, Number, Boolean] },
  transition: { type: [String, Array, Object, Number, Boolean] },
  radius: { type: [String, Array, Object, Number, Boolean] },
}, {});
