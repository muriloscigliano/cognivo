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
  /** Fired as `cg-image-load`. */
  onImageLoad?: (e: CustomEvent) => void;
  /** Fired as `cg-image-error`. */
  onImageError?: (e: CustomEvent) => void;
}

export const CgImage = createWrapper<CgImageProps, 'cg-image'>(
  'cg-image',
  ['src', 'alt', 'ratio', 'fit', 'lazy'],
  {
    onImageLoad: 'cg-image-load',
    onImageError: 'cg-image-error',
  }
);
