import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { RuleEngine, scan } from '@cognivo/lens-core';
import corePack from '@cognivo/lens-pack-core';
import '../index.js';
import type { CgLens } from '../cg-lens.js';

/**
 * The dogfood meta-test: render the lens itself, then audit its chrome
 * with the same engine + core pack. Asserts that the lens has zero
 * blocker / strong findings against itself — if any of our chrome violates
 * its own rules, the test catches the regression.
 *
 * Excluded rules:
 *  - core/a11y/text-contrast-below-AA — happy-dom doesn't apply the lens's
 *    CSS variables (the @cognivo/tokens stylesheet isn't loaded into the
 *    test document), so getComputedStyle returns defaults that produce
 *    nonsense contrast ratios. The contrast helper itself is verified
 *    separately in lens-core's contrast.test.ts.
 *  - core/a11y/aria-hidden-focusable — the lens overlay's host element
 *    uses pointer-events: none; not relevant in a real browser but
 *    happy-dom misclassifies the entire shadow tree.
 */
async function waitForScan(lens: CgLens): Promise<void> {
  return new Promise((resolve) => {
    lens.addEventListener('cg-lens:scan-complete', () => resolve(), { once: true });
  });
}

const META_DISABLED_RULES = new Set<string>([
  'core/a11y/text-contrast-below-AA',
]);

describe('lens meta-audit (dogfood)', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('lens chrome has zero blocker findings against its own rules', async () => {
    document.body.innerHTML = '<cg-lens></cg-lens>';
    const lens = document.querySelector('cg-lens') as CgLens;
    await waitForScan(lens);
    // Open the drawer so the drawer chrome is present for the audit.
    lens.setDrawerOpen(true);
    await lens.updateComplete;

    const shadow = lens.shadowRoot!;
    const graph = scan(shadow);
    const engine = new RuleEngine();
    await engine.register(corePack);
    const findings = engine
      .evaluate(graph, 'unknown')
      .filter((f) => !META_DISABLED_RULES.has(f.ruleId));

    const blockers = findings.filter((f) => f.severity === 'blocker');
    if (blockers.length > 0) {
      // Surface the offending rule + element path for fast diagnosis.
      // eslint-disable-next-line no-console
      console.error(
        'lens chrome blockers:',
        blockers.map((f) => `${f.ruleId}: ${f.message}`).join('\n')
      );
    }
    expect(blockers.length).toBe(0);
  });

  it('lens chrome has zero strong findings against its own rules', async () => {
    document.body.innerHTML = '<cg-lens></cg-lens>';
    const lens = document.querySelector('cg-lens') as CgLens;
    await waitForScan(lens);
    lens.setDrawerOpen(true);
    await lens.updateComplete;

    const graph = scan(lens.shadowRoot!);
    const engine = new RuleEngine();
    await engine.register(corePack);
    const findings = engine.evaluate(graph, 'unknown');

    const strongs = findings.filter((f) => f.severity === 'strong');
    if (strongs.length > 0) {
      // eslint-disable-next-line no-console
      console.error(
        'lens chrome strong findings:',
        strongs.map((f) => `${f.ruleId}: ${f.message}`).join('\n')
      );
    }
    expect(strongs.length).toBe(0);
  });
});
