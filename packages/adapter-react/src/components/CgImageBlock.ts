import { createWrapper } from '../create-wrapper.js';

export interface CgImageBlockProps {
  /** Image source URL. */
  src?: string;
  /** Alt text for accessibility. */
  alt?: string;
  /** Optional caption below the image. */
  caption?: string;
  /** Source attribution text. */
  source?: string;
  /** Link URL for the source attribution. */
  sourceUrl?: string;
  /** Aspect ratio (e.g. '16/9', '1/1', '4/3'). */
  ratio?: string;
  /** Whether the image is clickable. */
  clickable?: boolean;
  /** Fired when a clickable image is clicked. */
  onImageClick?: (e: CustomEvent<{ src: string }>) => void;
  className?: string;
}

export const CgImageBlock = createWrapper<CgImageBlockProps>(
  'cg-image-block',
  ['src', 'alt', 'caption', 'source', 'sourceUrl', 'ratio', 'clickable'],
  { onImageClick: 'cg-image-click' }
);
