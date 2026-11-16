import { css } from 'lit';
import { pureStyle } from './pure-style.js';

// Each style is a /* @__PURE__ */ pureStyle() call (see pure-style.ts):
// bundlers cannot drop an unused tagged template (css`…` might have side effects), but they do drop
// an unused pure call — so a component pays only for the styles it imports.

/** AI glow effect using ai-effect tokens. */
export const aiGlow = /* @__PURE__ */ pureStyle(() => css`
  box-shadow: 0 0 var(--cg-ai-effect-glow-blur) var(--cg-ai-effect-glow-spread) var(--cg-ai-effect-glow-color);
`);

/** AI gradient background (lime-yellow brand). */
export const aiGradient = /* @__PURE__ */ pureStyle(() => css`
  background: linear-gradient(135deg, var(--cg-ai-effect-gradient-from), var(--cg-ai-effect-gradient-to));
`);

/** AI shimmer text effect — gradient that sweeps across text. */
export const aiShimmerText = /* @__PURE__ */ pureStyle(() => css`
  background: linear-gradient(
    90deg,
    var(--cg-color-surface-base-text) 25%,
    var(--cg-color-accent-text) 50%,
    var(--cg-color-surface-base-text) 75%
  );
  background-size: 200% 100%;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: shimmer var(--cg-ai-effect-shimmer-duration) linear infinite;
`);

/** AI shimmer loading skeleton effect. */
export const aiShimmerSkeleton = /* @__PURE__ */ pureStyle(() => css`
  background: linear-gradient(
    90deg,
    var(--cg-color-surface-container-background) 25%,
    var(--cg-color-surface-container-border) 50%,
    var(--cg-color-surface-container-background) 75%
  );
  background-size: 200% 100%;
  animation: shimmer var(--cg-ai-effect-shimmer-duration) linear infinite;
`);

/** AI backdrop blur. */
export const aiBackdropBlur = /* @__PURE__ */ pureStyle(() => css`
  backdrop-filter: blur(var(--cg-ai-effect-backdropBlur));
  -webkit-backdrop-filter: blur(var(--cg-ai-effect-backdropBlur));
`);
