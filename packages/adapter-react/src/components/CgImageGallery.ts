import { createWrapper } from '../create-wrapper.js';

export interface CgGalleryImage {
  src: string;
  alt?: string;
  caption?: string;
}

export interface CgImageGalleryProps {
  /** Array of images to display. */
  images?: CgGalleryImage[];
  /** Maximum number of visible thumbnails before showing overflow. */
  maxVisible?: number;
  /** Fired when a gallery image is clicked. */
  onGalleryClick?: (e: CustomEvent<{ index: number; src: string }>) => void;
  className?: string;
}

export const CgImageGallery = createWrapper<CgImageGalleryProps>(
  'cg-image-gallery',
  ['images', 'maxVisible'],
  { onGalleryClick: 'cg-gallery-click' }
);
