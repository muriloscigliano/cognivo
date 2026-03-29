import { css } from 'lit';

/**
 * Dual-layer focus ring for standalone interactive elements (buttons, links, nav items).
 * Uses the focus-ring token set from tier 2 semantic tokens.
 */
export const focusRingDual = css`
  box-shadow:
    0 0 0 2px var(--cg-color-surface-base-background, #09090b),
    0 0 0 4px var(--cg-focus-ring-color, #dfff61);
  outline: none;
`;

/**
 * Single-layer focus ring for form fields (input, textarea, select).
 * Softer glow that works with existing borders.
 */
export const focusRingSingle = css`
  box-shadow: 0 0 0 3px var(--cg-overlay-accent-strong, rgba(223, 255, 97, 0.25));
  outline: none;
`;
