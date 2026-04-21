import { css } from 'lit';

/**
 * Standard color/opacity transition for :host elements.
 * Maps to --cg-transition-duration-fast + --cg-transition-easing-default.
 */
export const hostTransition = css`
  transition: color var(--cg-transition-duration-fast) var(--cg-transition-easing-default);
`;

/**
 * Multi-property transition for interactive elements (buttons, cards, list items).
 * Covers transform, background, border, and box-shadow.
 */
export const interactiveTransition = css`
  transition:
    transform var(--cg-transition-duration-slow) var(--cg-transition-easing-default),
    background-color var(--cg-transition-duration-fast) var(--cg-transition-easing-default),
    border-color var(--cg-transition-duration-fast) var(--cg-transition-easing-default),
    box-shadow var(--cg-transition-duration-fast) var(--cg-transition-easing-default);
`;

/**
 * Press scale feedback for :active state.
 */
export const pressScale = css`
  transform: scale(var(--cg-interaction-press-scale));
`;

/** Reduced motion media query — disables transitions and animations for a11y. */
export const reducedMotion = css`
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      transition-duration: 0.01ms !important;
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
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

/** Shimmer sweep for loading skeletons and AI text effects. */
export const shimmerKeyframes = css`
  @keyframes shimmer {
    from { background-position: 200% 0; }
    to { background-position: -200% 0; }
  }
`;

/** Opacity pulse for thinking indicators. */
export const pulseKeyframes = css`
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.4; }
  }
`;

/** Scale + fade entrance for modals and dropdowns. */
export const scaleInKeyframes = css`
  @keyframes scaleIn {
    from { opacity: 0; transform: scale(0.95); }
    to { opacity: 1; transform: scale(1); }
  }
`;

/** Scale + fade exit for modals and dropdowns. */
export const scaleOutKeyframes = css`
  @keyframes scaleOut {
    from { opacity: 1; transform: scale(1); }
    to { opacity: 0; transform: scale(0.95); }
  }
`;

/** Fade out. */
export const fadeOutKeyframes = css`
  @keyframes fadeOut {
    from { opacity: 1; }
    to { opacity: 0; }
  }
`;

/** Slide in from left for drawers. */
export const slideInLeftKeyframes = css`
  @keyframes slideInLeft {
    from { transform: translateX(-100%); }
    to { transform: translateX(0); }
  }
`;

/** Slide in from right for drawers. */
export const slideInRightKeyframes = css`
  @keyframes slideInRight {
    from { transform: translateX(100%); }
    to { transform: translateX(0); }
  }
`;

/** Hover lift for interactive cards and surfaces. */
export const hoverLift = css`
  transform: translateY(var(--cg-interaction-hover-lift));
`;

/** Card hover pattern: lift + enhanced shadow on hover, settle on active. */
export const cardHoverLift = css`
  transition:
    transform var(--cg-transition-duration-default) var(--cg-transition-easing-default),
    box-shadow var(--cg-transition-duration-default) var(--cg-transition-easing-default);

  &:hover {
    transform: translateY(var(--cg-interaction-hover-lift));
    box-shadow: var(--cg-elevation-2);
  }

  &:active {
    transform: translateY(0);
  }
`;
