import { css } from 'lit';

/**
 * Base :host styles for inline-flex components (buttons, badges, chips).
 * Includes font-family, color transition, and box-sizing.
 */
export const hostBase = css`
  :host {
    display: inline-flex;
    font-family: var(--cg-font-family-primary);
    box-sizing: border-box;
    transition: color var(--cg-transition-duration-fast) var(--cg-transition-easing-default);
  }
`;

/**
 * Base :host styles for block-level components (cards, inputs, containers).
 */
export const hostBlock = css`
  :host {
    display: block;
    font-family: var(--cg-font-family-primary);
    box-sizing: border-box;
    transition: color var(--cg-transition-duration-fast) var(--cg-transition-easing-default);
  }
`;

/** Hide host when [hidden] attribute is present. */
export const hostHidden = css`
  :host([hidden]) { display: none; }
`;
