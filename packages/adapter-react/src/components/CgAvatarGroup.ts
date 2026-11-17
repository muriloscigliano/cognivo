import { createWrapper } from '../create-wrapper.js';
export const CgAvatarGroup = /* @__PURE__ */ createWrapper('cg-avatar-group', ['avatars', 'maxVisible', 'size'],
  {
    onAvatarGroupClick: 'cg-avatar-group-click',
    onOverflowClick: 'cg-avatar-group-overflow-click',
  }
);
