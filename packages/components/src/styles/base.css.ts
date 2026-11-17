import { css } from 'lit';
import { pureStyle } from './pure-style.js';

// Each style is a /* @__PURE__ */ pureStyle() call (see pure-style.ts):
// bundlers cannot drop an unused tagged template (css`…` might have side effects), but they do drop
// an unused pure call — so a component pays only for the styles it imports.

/**
 * Base :host styles for inline-flex components (buttons, badges, chips).
 * Includes font-family, color transition, and box-sizing, and the native
 * control reset: buttons and fields inside the shadow root inherit the
 * component's font instead of the browser's 13.33 px control font (zero
 * specificity, so any component rule wins).
 */
export const hostBase = /* @__PURE__ */ pureStyle(() => css`
  :host {
    display: inline-flex;
    font-family: var(--cg-font-family-primary);
    box-sizing: border-box;
    transition: color var(--cg-transition-duration-fast) var(--cg-transition-easing-default);
  }
  :where(button, input, select, textarea) { font: inherit; }
`);

/**
 * Base :host styles for block-level components (cards, inputs, containers).
 */
export const hostBlock = /* @__PURE__ */ pureStyle(() => css`
  :host {
    display: block;
    font-family: var(--cg-font-family-primary);
    box-sizing: border-box;
    transition: color var(--cg-transition-duration-fast) var(--cg-transition-easing-default);
  }
  :where(button, input, select, textarea) { font: inherit; }
`);

/** Native controls inherit the component's font (for components without hostBase / hostBlock). */
export const nativeFont = /* @__PURE__ */ pureStyle(() => css`
  :where(button, input, select, textarea) { font: inherit; }
`);

/** Hide host when [hidden] attribute is present. */
export const hostHidden = /* @__PURE__ */ pureStyle(() => css`
  :host([hidden]) { display: none; }
`);
