import { css } from 'lit';

// Each style is wrapped in a /* @__PURE__ */ IIFE: bundlers cannot drop an
// unused tagged template (css`…` might have side effects), but they do drop
// an unused pure call — so a component pays only for the styles it imports.

/**
 * Base :host styles for inline-flex components (buttons, badges, chips).
 * Includes font-family, color transition, and box-sizing.
 */
export const hostBase = /* @__PURE__ */ (() => css`
  :host {
    display: inline-flex;
    font-family: var(--cg-font-family-primary);
    box-sizing: border-box;
    transition: color var(--cg-transition-duration-fast) var(--cg-transition-easing-default);
  }
`)();

/**
 * Base :host styles for block-level components (cards, inputs, containers).
 */
export const hostBlock = /* @__PURE__ */ (() => css`
  :host {
    display: block;
    font-family: var(--cg-font-family-primary);
    box-sizing: border-box;
    transition: color var(--cg-transition-duration-fast) var(--cg-transition-easing-default);
  }
`)();

/** Hide host when [hidden] attribute is present. */
export const hostHidden = /* @__PURE__ */ (() => css`
  :host([hidden]) { display: none; }
`)();
