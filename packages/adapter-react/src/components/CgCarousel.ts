import { createWrapper } from '../create-wrapper.js';

export interface CgCarouselProps {
  /** Whether to show navigation dots. */
  showDots?: boolean;
  /** Whether to show previous/next arrows. */
  showArrows?: boolean;
  className?: string;
  /** Fired as `cg-slide-click`. */
  onSlideClick?: (e: CustomEvent) => void;
}

export const CgCarousel = /* @__PURE__ */ createWrapper<CgCarouselProps, 'cg-carousel'>(
  'cg-carousel',
  ['showDots', 'showArrows'],
  {
    onSlideClick: 'cg-slide-click',
  }
);
