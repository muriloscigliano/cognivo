// @vitest-environment node
/**
 * Issue: cg-popover's (and cg-dropdown's) trigger box only fit its content,
 * so a full-width trigger (a sidebar's account switcher) needed an explicit
 * width. `block` makes the element a block and stretches the slotted trigger
 * to the full width.
 */
import { describe, it, expect, afterAll } from 'vitest';
import { browserAvailable, openPage, closeBrowser, settleStyles } from './harness.js';

const CASES = [
  { tag: 'cg-popover', inner: '<button id="t">Workspace</button><div slot="content">Menu</div>' },
  { tag: 'cg-dropdown', inner: '<button slot="trigger" id="t">Workspace</button>' },
];

describe.skipIf(!browserAvailable)('block trigger (real browser)', { timeout: 30_000 }, () => {
  afterAll(closeBrowser);

  for (const c of CASES) {
    it(`${c.tag} block: the trigger spans the container`, async () => {
      const page = await openPage([c.tag], `<div style="width:230px"><${c.tag} block>${c.inner}</${c.tag}></div>`);
      await settleStyles(page);
      const width = await page.evaluate(() => document.getElementById('t')!.getBoundingClientRect().width);
      expect(width).toBe(230);
      await page.close();
    });

    it(`${c.tag} without block: the trigger fits its content`, async () => {
      const page = await openPage([c.tag], `<div style="width:230px"><${c.tag}>${c.inner}</${c.tag}></div>`);
      await settleStyles(page);
      const width = await page.evaluate(() => document.getElementById('t')!.getBoundingClientRect().width);
      expect(width).toBeLessThan(230);
      await page.close();
    });
  }
});
