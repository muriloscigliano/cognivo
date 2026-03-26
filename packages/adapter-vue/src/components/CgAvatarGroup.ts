import { createVueWrapper } from '../create-wrapper.js';
export const CgAvatarGroup = createVueWrapper('cg-avatar-group', {
  avatars: { type: [String, Array, Object, Number, Boolean] },
  maxVisible: { type: [String, Array, Object, Number, Boolean] },
  size: { type: [String, Array, Object, Number, Boolean] },
}, {});
