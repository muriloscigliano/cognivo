import { createWrapper } from '../create-wrapper.js';
export const CgAvatarGroup = createWrapper('cg-avatar-group', ['avatars', 'maxVisible', 'size'],
  {
    onAvatarGroupClick: 'cg-avatar-group-click',
    onOverflowClick: 'cg-avatar-group-overflow-click',
  }
);
