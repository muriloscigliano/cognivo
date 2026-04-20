import { createVueWrapper } from '../create-wrapper.js';

export interface CgAvatarProps {
  src?: string;
  alt?: string;
  name?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  shape?: 'circle' | 'square';
  status?: 'online' | 'offline' | 'away' | 'busy' | null;
  fallbackIcon?: string;
}

export const CgAvatar = createVueWrapper(
  'cg-avatar',
  {
    src: { type: String, default: '' },
    alt: { type: String, default: '' },
    name: { type: String, default: '' },
    size: { type: String, default: 'md' },
    shape: { type: String, default: 'circle' },
    status: { type: String, default: null },
    fallbackIcon: { type: String, default: '' },
  },
  { fallbackIcon: 'fallback-icon' }
);
