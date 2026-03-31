import { css } from 'lit';

// Multi-layer shadow system — 3 layers per level:
// Layer 1: Tight edge definition
// Layer 2: Shape shadow
// Layer 3: Ambient/inset highlight

/** Subtle resting shadow for cards and inputs. */
export const elevation1 = css`box-shadow:
  var(--cg-elevation-1,
    0 1px 2px rgba(0, 0, 0, 0.3),
    0 1px 3px rgba(0, 0, 0, 0.15)),
  inset 0 1px 0 0 rgba(255, 255, 255, 0.05);`;

/** Raised shadow for hover states and tooltips. */
export const elevation2 = css`box-shadow:
  var(--cg-elevation-2,
    0 1px 2px rgba(0, 0, 0, 0.2),
    0 4px 6px -1px rgba(0, 0, 0, 0.3)),
  inset 0 1px 0 0 rgba(255, 255, 255, 0.05);`;

/** Floating shadow for dropdowns and popovers. */
export const elevation3 = css`box-shadow:
  var(--cg-elevation-3,
    0 2px 4px rgba(0, 0, 0, 0.2),
    0 10px 15px -3px rgba(0, 0, 0, 0.4)),
  inset 0 1px 0 0 rgba(255, 255, 255, 0.05);`;

/** Overlay shadow for modals. */
export const elevation4 = css`box-shadow:
  var(--cg-elevation-4,
    0 4px 8px rgba(0, 0, 0, 0.2),
    0 20px 25px -5px rgba(0, 0, 0, 0.4)),
  inset 0 1px 0 0 rgba(255, 255, 255, 0.05);`;

/** Top-level shadow for drawers and command palette. */
export const elevation5 = css`box-shadow:
  var(--cg-elevation-5,
    0 8px 16px rgba(0, 0, 0, 0.3),
    0 25px 50px -12px rgba(0, 0, 0, 0.5)),
  inset 0 1px 0 0 rgba(255, 255, 255, 0.05);`;
