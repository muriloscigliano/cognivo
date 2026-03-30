import { css } from 'lit';

/** AI glow effect using ai-effect tokens. */
export const aiGlow = css`
  box-shadow: 0 0 var(--cg-ai-effect-glow-blur, 8px) var(--cg-ai-effect-glow-spread, 2px) var(--cg-ai-effect-glow-color, rgba(223, 255, 97, 0.3));
`;

/** AI gradient background (lime-yellow brand). */
export const aiGradient = css`
  background: linear-gradient(135deg, var(--cg-ai-effect-gradient-from, var(--cg-brand-ai-accent, #dfff61)), var(--cg-ai-effect-gradient-to, var(--cg-brand-ai-highlight, #e2ff70)));
`;

/** AI shimmer text effect — gradient that sweeps across text. */
export const aiShimmerText = css`
  background: linear-gradient(
    90deg,
    var(--cg-color-surface-base-text, #fafafa) 25%,
    var(--cg-brand-ai-accent, #dfff61) 50%,
    var(--cg-color-surface-base-text, #fafafa) 75%
  );
  background-size: 200% 100%;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: shimmer var(--cg-ai-effect-shimmer-duration, 1500ms) linear infinite;
`;

/** AI shimmer loading skeleton effect. */
export const aiShimmerSkeleton = css`
  background: linear-gradient(
    90deg,
    var(--cg-gray-800, #27272a) 25%,
    var(--cg-gray-700, #3f3f46) 50%,
    var(--cg-gray-800, #27272a) 75%
  );
  background-size: 200% 100%;
  animation: shimmer var(--cg-ai-effect-shimmer-duration, 1500ms) linear infinite;
`;

/** AI backdrop blur. */
export const aiBackdropBlur = css`
  backdrop-filter: blur(var(--cg-ai-effect-backdropBlur, 8px));
  -webkit-backdrop-filter: blur(var(--cg-ai-effect-backdropBlur, 8px));
`;
