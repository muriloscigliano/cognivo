import { definePack } from '@cognivo/lens-core';

/**
 * @cognivo/lens-pack-ethics — dark-pattern + transparency rules.
 *
 * Lazy rule loaders so each rule ships in its own chunk; only enabled rules
 * pay any bundle cost. Rules grouped by area in source order.
 */
export default definePack({
  id: '@cognivo/lens-pack-ethics',
  version: '0.1.0',
  title: 'Cognivo Lens — Ethics Pack',
  description:
    'Dark-pattern and transparency heuristics. v0.1 ships cheap pattern-matching rules; LLM-judgment rules ship in a later release.',
  intents: [],
  rules: [
    () => import('./rules/dark-pattern/preselected-optional-checkbox.js'),
    () => import('./rules/dark-pattern/asymmetric-action-buttons.js'),
    () => import('./rules/dark-pattern/scarcity-claim.js'),
    () => import('./rules/dark-pattern/countdown-without-anchor.js'),
    () => import('./rules/transparency/sponsored-without-label.js'),
  ],
});
