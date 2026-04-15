import { createVueWrapper } from '../create-wrapper.js';

const T = { type: [String, Array, Object, Number, Boolean] };

export const CgCalendar = createVueWrapper('cg-calendar', {
  value: T, rangeEnd: T, mode: T, min: T, max: T, weekStartsOn: T, name: T,
}, {});
