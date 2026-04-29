import { definePack } from '@cognivo/lens-core';

/**
 * @cognivo/lens-pack-core — the foundational rule pack.
 *
 * Lazy rule loaders so each rule ships in its own chunk; only enabled rules
 * pay any bundle cost. Rules grouped by area in source order.
 */
export default definePack({
  id: '@cognivo/lens-pack-core',
  version: '0.1.0',
  title: 'Cognivo Lens \u2014 Core Pack',
  description:
    'Foundational accessibility, focus, and system-health rules. Enabled by default.',
  intents: [],
  rules: [
    // a11y
    () => import('./rules/a11y/img-without-alt.js'),
    () => import('./rules/a11y/button-without-name.js'),
    () => import('./rules/a11y/link-without-name.js'),
    () => import('./rules/a11y/landmark-without-name.js'),
    () => import('./rules/a11y/input-without-label.js'),
    () => import('./rules/a11y/dialog-without-name.js'),
    () => import('./rules/a11y/heading-skipped-level.js'),
    () => import('./rules/a11y/positive-tabindex.js'),
    () => import('./rules/a11y/aria-hidden-focusable.js'),
    () => import('./rules/a11y/duplicate-id.js'),
    // focus
    () => import('./rules/focus/disabled-with-tabindex.js'),
    // system-health
    () => import('./rules/system-health/transition-all.js'),
    () => import('./rules/system-health/closed-shadow-root-unauditable.js'),
    () => import('./rules/system-health/cg-component-no-manifest.js'),
  ],
});
