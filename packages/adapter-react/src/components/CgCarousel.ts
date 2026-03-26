import { createWrapper } from '../create-wrapper.js';

export interface CgCarouselProps {
  /** Whether to show navigation dots. */
  showDots?: boolean;
  /** Whether to show previous/next arrows. */
  showArrows?: boolean;
  className?: string;
}

export const CgCarousel = createWrapper<CgCarouselProps>(
  'cg-carousel',
  ['showDots', 'showArrows'],
  {}
);
