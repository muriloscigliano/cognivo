import { css } from 'lit';
import { pureStyle } from './pure-style.js';

// Each style is a /* @__PURE__ */ pureStyle() call (see pure-style.ts):
// bundlers cannot drop an unused tagged template (css`…` might have side effects), but they do drop
// an unused pure call — so a component pays only for the styles it imports.

// ── Elevation utilities ──
// These box-shadow exports are no longer consumed by any component
// (shadows were removed in the design-token cleanup pass).
// Exports are kept to avoid breaking downstream imports, but values
// are emptied. Use border / border-color tokens instead for depth cues.

/** @deprecated No component uses box-shadow elevation. */
export const elevation1 = /* @__PURE__ */ pureStyle(() => css``);

/** @deprecated No component uses box-shadow elevation. */
export const elevation2 = /* @__PURE__ */ pureStyle(() => css``);

/** @deprecated No component uses box-shadow elevation. */
export const elevation3 = /* @__PURE__ */ pureStyle(() => css``);

/** @deprecated No component uses box-shadow elevation. */
export const elevation4 = /* @__PURE__ */ pureStyle(() => css``);

/** @deprecated No component uses box-shadow elevation. */
export const elevation5 = /* @__PURE__ */ pureStyle(() => css``);
