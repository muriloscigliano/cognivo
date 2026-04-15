import { createVueWrapper } from '../create-wrapper.js';

const T = { type: [String, Array, Object, Number, Boolean] };

export const CgCommand = createVueWrapper('cg-command', {
  open: T, placeholder: T, commands: T, value: T, emptyText: T, loading: T,
}, {});
