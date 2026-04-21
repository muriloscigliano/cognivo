/**
 * @cognivo/components/bias — the 6 cognitive-bias wrapper primitives.
 *
 * Importing this barrel side-effect-registers every bias-* custom element and
 * re-exports their classes + types. These are behavioral-science primitives,
 * not foundation UI chrome and not AI-native patterns — they're their own
 * layer that composes cleanly with both.
 *
 * Each component exposes a `static biasId` linking to the canonical bias in
 * @cognivo/design-advisor so consumers (or LLMs) can reason about which
 * biases are in use on a page.
 *
 * Prefer per-component imports (`@cognivo/components/bias-anchoring`) when you can.
 */

export * from './components/bias-anchoring/bias-anchoring.js';
export * from './components/bias-scarcity/bias-scarcity.js';
export * from './components/bias-social-proof/bias-social-proof.js';
export * from './components/bias-authority/bias-authority.js';
export * from './components/bias-commitment/bias-commitment.js';
export * from './components/bias-reciprocity/bias-reciprocity.js';
