import { css } from 'lit';

/** Subtle resting shadow for cards and inputs. */
export const elevation1 = css`box-shadow: var(--cg-elevation-1, 0 1px 3px rgba(0, 0, 0, 0.3), 0 1px 2px rgba(0, 0, 0, 0.2));`;

/** Raised shadow for hover states and tooltips. */
export const elevation2 = css`box-shadow: var(--cg-elevation-2, 0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -2px rgba(0, 0, 0, 0.2));`;

/** Floating shadow for dropdowns and popovers. */
export const elevation3 = css`box-shadow: var(--cg-elevation-3, 0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 10px 15px -3px rgba(0, 0, 0, 0.4));`;

/** Overlay shadow for modals. */
export const elevation4 = css`box-shadow: var(--cg-elevation-4, 0 20px 25px -5px rgba(0, 0, 0, 0.4), 0 8px 10px -6px rgba(0, 0, 0, 0.3));`;

/** Top-level shadow for drawers and command palette. */
export const elevation5 = css`box-shadow: var(--cg-elevation-5, 0 25px 50px -12px rgba(0, 0, 0, 0.5));`;
