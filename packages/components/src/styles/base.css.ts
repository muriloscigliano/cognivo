import { css } from 'lit';

/**
 * Base :host styles for inline-flex components (buttons, badges, chips).
 * Includes font-family, color transition, and box-sizing.
 */
export const hostBase = css`
  :host {
    display: inline-flex;
    font-family: var(--cg-font-family-primary, 'Inter Variable', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif);
    box-sizing: border-box;
    transition: color var(--cg-motion-duration-fast, 150ms) var(--cg-motion-easing-color, cubic-bezier(0, 0, 0.58, 1));
  }
`;

/**
 * Base :host styles for block-level components (cards, inputs, containers).
 */
export const hostBlock = css`
  :host {
    display: block;
    font-family: var(--cg-font-family-primary, 'Inter Variable', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif);
    box-sizing: border-box;
    transition: color var(--cg-motion-duration-fast, 150ms) var(--cg-motion-easing-color, cubic-bezier(0, 0, 0.58, 1));
  }
`;

/** Hide host when [hidden] attribute is present. */
export const hostHidden = css`
  :host([hidden]) { display: none; }
`;
