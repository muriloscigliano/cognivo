import { css } from 'lit';

// Each style is wrapped in a /* @__PURE__ */ IIFE: bundlers cannot drop an
// unused tagged template (css`…` might have side effects), but they do drop
// an unused pure call — so a component pays only for the styles it imports.

/**
 * Dual-layer focus ring for standalone interactive elements (buttons, links, nav items).
 * Uses the focus-ring token set from tier 2 semantic tokens.
 */
export const focusRingDual = /* @__PURE__ */ (() => css`
  box-shadow:
    0 0 0 2px var(--cg-color-surface-base-background),
    0 0 0 4px var(--cg-focus-ring-color);
  outline: none;
`)();

/**
 * Single-layer focus ring for form fields (input, textarea, select).
 * Softer glow that works with existing borders.
 */
export const focusRingSingle = /* @__PURE__ */ (() => css`
  box-shadow: 0 0 0 3px var(--cg-overlay-accent-strong);
  outline: none;
`)();
