import { css } from 'lit';

/**
 * Dual-layer focus ring for standalone interactive elements (buttons, links, nav items).
 * Uses the focus-ring token set from tier 2 semantic tokens.
 */
export const focusRingDual = css`
  box-shadow:
    0 0 0 2px var(--cg-color-surface-base-background),
    0 0 0 4px var(--cg-focus-ring-color);
  outline: none;
`;

/**
 * Single-layer focus ring for form fields (input, textarea, select).
 * Softer glow that works with existing borders.
 */
export const focusRingSingle = css`
  box-shadow: 0 0 0 3px var(--cg-overlay-accent-strong);
  outline: none;
`;
