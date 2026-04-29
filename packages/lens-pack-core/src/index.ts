// Default export = the pack manifest, ready for engine.register(corePack).
// Named exports = individual rules so callers can compose, override, or test
// rules without loading the whole pack.
export { default } from './pack.js';

export { default as imgWithoutAlt } from './rules/a11y/img-without-alt.js';
export { default as buttonWithoutName } from './rules/a11y/button-without-name.js';
export { default as linkWithoutName } from './rules/a11y/link-without-name.js';
export { default as landmarkWithoutName } from './rules/a11y/landmark-without-name.js';
export { default as inputWithoutLabel } from './rules/a11y/input-without-label.js';
export { default as dialogWithoutName } from './rules/a11y/dialog-without-name.js';
export { default as headingSkippedLevel } from './rules/a11y/heading-skipped-level.js';
export { default as positiveTabindex } from './rules/a11y/positive-tabindex.js';
export { default as ariaHiddenFocusable } from './rules/a11y/aria-hidden-focusable.js';
export { default as duplicateId } from './rules/a11y/duplicate-id.js';
export { default as disabledWithTabindex } from './rules/focus/disabled-with-tabindex.js';
export { default as transitionAll } from './rules/system-health/transition-all.js';
export { default as closedShadowRootUnauditable } from './rules/system-health/closed-shadow-root-unauditable.js';
export { default as cgComponentNoManifest } from './rules/system-health/cg-component-no-manifest.js';
export { default as textContrastBelowAa } from './rules/a11y/text-contrast-below-aa.js';
export { default as tier1PaletteColor } from './rules/tokens/tier1-palette-color.js';
export { default as tier1BrandColor } from './rules/tokens/tier1-brand-color.js';
export { default as rawColorNoToken } from './rules/tokens/raw-color-no-token.js';
export { default as backgroundAsForeground } from './rules/tokens/background-as-foreground.js';
export { default as missingComponentTier3Token } from './rules/tokens/missing-component-tier3-token.js';
