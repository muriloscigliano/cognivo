import { css } from 'lit';

// ─────────────────────────────────────────────────────────
// Premium Visual Effects — shared across all components
// Inspired by HeroUI, Shadcn, Radix, Aceternity patterns
// ─────────────────────────────────────────────────────────

/**
 * Top-edge light simulation on dark surfaces.
 * Creates a 1px white highlight at the top of the element,
 * simulating overhead lighting hitting a raised surface.
 * (Apple/macOS pattern used in premium dark UIs)
 */
export const insetHighlight = css`
  box-shadow: inset 0 1px 0 0 var(--cg-overlay-white-light);
`;

/**
 * Subtle top-to-bottom gradient on surfaces for depth.
 * The 3% lightness difference creates a physical-object feel
 * without being visually distracting.
 */
export const surfaceGradient = css`
  background-image: linear-gradient(
    to bottom,
    var(--cg-overlay-white-subtle) 0%,
    transparent 100%
  );
`;

/**
 * Micro-scale on hover for interactive elements.
 * The 1.02 scale is subtle enough to feel natural but
 * noticeable enough to communicate interactivity.
 */
export const hoverScale = css`
  transition: transform var(--cg-transition-duration-default) var(--cg-transition-easing-default);
  &:hover:not(:disabled):not([disabled]):not(.disabled) {
    transform: scale(1.02);
  }
  &:active:not(:disabled):not([disabled]):not(.disabled) {
    transform: scale(var(--cg-interaction-press-scale));
  }
`;

/**
 * Color-matched hover background using the accent hue
 * at very low opacity. This feels intentional rather than
 * a generic gray overlay. (Radix/Shadcn pattern)
 */
export const colorMatchedHover = css`
  &:hover:not(:disabled):not([disabled]):not(.disabled) {
    background-color: var(--cg-overlay-accent-subtle);
  }
`;

/**
 * Focus ring that transitions in smoothly rather than
 * appearing instantly. The ring spreads from 0px to full
 * size over 150ms with deceleration easing.
 */
export const focusRingAnimated = css`
  box-shadow: 0 0 0 0px transparent, 0 0 0 0px transparent;
  transition: box-shadow var(--cg-transition-duration-default) var(--cg-transition-easing-ease-out);
  &:focus-visible {
    box-shadow:
      0 0 0 2px var(--cg-color-surface-base-background),
      0 0 0 4px var(--cg-focus-ring-color);
    outline: none;
  }
`;

/**
 * CSS-only ripple effect on click.
 * Uses ::after pseudo-element with radial gradient that
 * expands from center on :active. Requires parent to have
 * position: relative and overflow: hidden.
 */
export const rippleEffect = css`
  position: relative;
  overflow: hidden;
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(
      circle at 50% 50%,
      var(--cg-overlay-white-strong) 0%,
      transparent 70%
    );
    opacity: 0;
    transform: scale(0);
    transition: transform 400ms ease-out, opacity 400ms ease-out;
    pointer-events: none;
    border-radius: inherit;
  }
  &:active:not(:disabled)::after {
    opacity: 1;
    transform: scale(2.5);
    transition: 0s;
  }
`;

/** Dot/indicator pulse animation for badges and status indicators. */
export const dotPulseKeyframes = css`
  @keyframes dotPulse {
    0%, 100% { transform: scale(1); opacity: 1; }
    50% { transform: scale(1.4); opacity: 0.7; }
  }
`;

/** Value change pulse for numbers and metrics. */
export const valueChangePulseKeyframes = css`
  @keyframes valueChangePulse {
    0% { transform: scale(1); }
    40% { transform: scale(1.05); }
    100% { transform: scale(1); }
  }
`;

/** Entrance animation with stagger support via --stagger-index custom property. */
export const entranceStagger = css`
  @keyframes staggerFadeIn {
    from {
      opacity: 0;
      transform: translateY(8px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

/** Exit animation for removed elements (badges, chips, list items). */
export const exitFadeScaleKeyframes = css`
  @keyframes exitFadeScale {
    from { opacity: 1; transform: scale(1); }
    to { opacity: 0; transform: scale(0.85); }
  }
`;

// ─────────────────────────────────────────────────────────
// Advanced Effects — cutting-edge CSS techniques
// ─────────────────────────────────────────────────────────

/**
 * Dark glassmorphism card — frosted glass with layered shadows.
 * The saturate(1.1) adds vibrancy behind the blur.
 * Use sparingly: max 2-3 glass elements per viewport.
 */
export const glassCard = css`
  background: var(--cg-overlay-white-subtle);
  backdrop-filter: blur(12px) saturate(1.1);
  -webkit-backdrop-filter: blur(12px) saturate(1.1);
  border: 1px solid var(--cg-overlay-white-medium);
  box-shadow:
    0 8px 32px var(--cg-overlay-dark-strong),
    inset 0 1px 0 var(--cg-overlay-white-light);
`;

/**
 * Noise texture overlay for premium dark surfaces.
 * Inline SVG avoids external file dependencies in Shadow DOM.
 * The mix-blend-mode: overlay enhances surfaces without washing out.
 */
export const noiseOverlay = css`
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    opacity: 0.02;
    pointer-events: none;
    z-index: 1;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
    mix-blend-mode: overlay;
  }
`;

/**
 * Liquid fill hover — gradient sweeps up from bottom on hover.
 * More dramatic than colorMatchedHover, for hero/featured elements.
 */
export const liquidFillHover = css`
  position: relative;
  overflow: hidden;
  z-index: 0;
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      180deg,
      var(--cg-color-accent-text) 0%,
      var(--cg-overlay-accent-subtle) 100%
    );
    opacity: 0.06;
    transform: translateY(102%);
    transition: transform var(--cg-transition-duration-slow) var(--cg-transition-easing-default);
    z-index: -1;
    border-radius: inherit;
  }
  &:hover::before {
    transform: translateY(0);
  }
`;

/**
 * AI processing glow ring — rotating conic gradient border.
 * Register --cg-border-angle via CSS.registerProperty() in connectedCallback.
 */
export const aiGlowRing = css`
  @keyframes cgBorderSpin {
    to { --cg-border-angle: 360deg; }
  }
`;

/**
 * Scroll-driven reveal animation.
 * Elements fade+slide in as they enter the viewport.
 * Progressive enhancement — works in Chrome 115+, Firefox 110+, Safari 18+.
 */
export const scrollReveal = css`
  @keyframes cgScrollReveal {
    from {
      opacity: 0;
      transform: translateY(20px) scale(0.98);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }
`;
