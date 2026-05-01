// Default export = the pack manifest, ready for engine.register(ethicsPack).
// Named exports = individual rules so callers can compose / override.
export { default } from './pack.js';

export { default as preselectedOptionalCheckbox } from './rules/dark-pattern/preselected-optional-checkbox.js';
export { default as asymmetricActionButtons } from './rules/dark-pattern/asymmetric-action-buttons.js';
export { default as scarcityClaim } from './rules/dark-pattern/scarcity-claim.js';
export { default as countdownWithoutAnchor } from './rules/dark-pattern/countdown-without-anchor.js';
export { default as sponsoredWithoutLabel } from './rules/transparency/sponsored-without-label.js';
