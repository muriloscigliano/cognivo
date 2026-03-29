import { css } from 'lit';

/**
 * Standard color/opacity transition for :host elements.
 * Maps to --cg-motion-duration-fast (80ms) + --cg-motion-easing-color.
 */
export const hostTransition = css`
  transition: color var(--cg-motion-duration-fast, 80ms) var(--cg-motion-easing-color, cubic-bezier(0, 0, 0.58, 1));
`;

/**
 * Multi-property transition for interactive elements (buttons, cards, list items).
 * Covers transform, background, border, and box-shadow.
 */
export const interactiveTransition = css`
  transition:
    transform var(--cg-motion-duration-slow, 250ms) var(--cg-motion-easing-default, cubic-bezier(0.4, 0, 0.2, 1)),
    background-color var(--cg-motion-duration-fast, 80ms) var(--cg-motion-easing-color, cubic-bezier(0, 0, 0.58, 1)),
    border-color var(--cg-motion-duration-fast, 80ms) var(--cg-motion-easing-color, cubic-bezier(0, 0, 0.58, 1)),
    box-shadow var(--cg-motion-duration-fast, 80ms) var(--cg-motion-easing-color, cubic-bezier(0, 0, 0.58, 1));
`;

/**
 * Press scale feedback for :active state.
 */
export const pressScale = css`
  transform: scale(var(--cg-interaction-press-scale, 0.97));
`;

/** Reduced motion media query — zeroes out transitions and animations. */
export const reducedMotion = css`
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      transition-duration: 0s !important;
      animation-duration: 0s !important;
    }
  }
`;

/** Spin keyframes for loading spinners. */
export const spinKeyframes = css`
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;

/** Fade-in keyframes. */
export const fadeInKeyframes = css`
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;

/** Slide + fade entrance animation. */
export const fadeSlideInKeyframes = css`
  @keyframes fadeSlideIn {
    from { opacity: 0; transform: translateY(4px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;
