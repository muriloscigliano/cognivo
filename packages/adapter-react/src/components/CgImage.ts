import { createWrapper } from '../create-wrapper.js';

export interface CgImageProps {
  /** Image source URL. */
  src?: string;
  /** Alt text for accessibility. */
  alt?: string;
  /** Aspect ratio (e.g. '16/9', '1/1', '4/3'). */
  ratio?: string;
  /** Object-fit strategy. */
  fit?: 'cover' | 'contain' | 'fill' | 'none';
  /** Whether to lazy-load the image. */
  lazy?: boolean;
  className?: string;
}

export const CgImage = createWrapper<CgImageProps>(
  'cg-image',
  ['src', 'alt', 'ratio', 'fit', 'lazy'],
  {}
);
