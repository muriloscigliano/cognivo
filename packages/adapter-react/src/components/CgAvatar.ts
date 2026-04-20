import { createWrapper } from '../create-wrapper.js';

export interface CgAvatarProps {
  /** Image source URL. */
  src?: string;
  /** Alt text for image. */
  alt?: string;
  /** User name for initials fallback. */
  name?: string;
  /** Avatar size. */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  /** Avatar shape. */
  shape?: 'circle' | 'square';
  /** Status indicator dot. */
  status?: 'online' | 'offline' | 'away' | 'busy';
  /** Custom fallback icon name. */
  fallbackIcon?: string;
  className?: string;
}

export const CgAvatar = createWrapper<CgAvatarProps>(
  'cg-avatar',
  ['src', 'alt', 'name', 'size', 'shape', 'status', 'fallbackIcon'],
  { fallbackIcon: 'fallback-icon' }
);
