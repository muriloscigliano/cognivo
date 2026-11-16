// @vitest-environment node
/**
 * Issue: cg-sidebar drew its outer edge and the sub-items' guide line from
 * one token (`--cg-color-surface-sidebar-border`). On the canvas the edge must
 * go but the guide line must stay, and one token cannot do both. Now the edge
 * is `--cg-color-surface-sidebar-edge` and the guide is
 * `--cg-color-surface-sidebar-guide` (both default to the border colour).
 */
import { resolve } from 'node:path';
import { describe, it, expect, afterAll } from 'vitest';
import type { Page } from '@playwright/test';
import { browserAvailable, openPage, closeBrowser, settleStyles } from './harness.js';

const TOKENS_CSS = resolve(__dirname, '..', '..', '..', '..', 'tokens', 'dist', 'index.css');

async function sidebar(style = ''): Promise<Page> {
  const page = await openPage(['cg-sidebar'], `
    <cg-sidebar style="${style}">
      <a href="#e">E-mails</a>
      <a href="#t" data-sub>Templates</a>
    </cg-sidebar>`);
  await page.addStyleTag({ path: TOKENS_CSS });
  await settleStyles(page);
  return page;
}

const colours = (page: Page) =>
  page.evaluate(() => {
    const nav = document.querySelector('cg-sidebar')!.shadowRoot!.querySelector('.nav')!;
    return {
      edge: getComputedStyle(nav).borderRightColor,
      guide: getComputedStyle(document.querySelector('[data-sub]')!, '::before').backgroundColor,
    };
  });

describe.skipIf(!browserAvailable)('cg-sidebar edge and guide tokens (real browser)', { timeout: 30_000 }, () => {
  afterAll(closeBrowser);

  it('both default to the sidebar border colour', async () => {
    const page = await sidebar();
    const border = await page.evaluate(() => {
      const probe = document.createElement('div');
      probe.style.color = 'var(--cg-color-surface-sidebar-border)';
      document.body.append(probe);
      return getComputedStyle(probe).color;
    });
    expect(await colours(page)).toEqual({ edge: border, guide: border });
    await page.close();
  });

  it('the edge can go while the guide line stays', async () => {
    const page = await sidebar('--cg-color-surface-sidebar-edge: transparent');
    const c = await colours(page);
    expect(c.edge).toBe('rgba(0, 0, 0, 0)');
    expect(c.guide).not.toBe('rgba(0, 0, 0, 0)');
    await page.close();
  });

  it('the guide line has its own colour', async () => {
    const page = await sidebar('--cg-color-surface-sidebar-guide: rgb(1, 2, 3)');
    const c = await colours(page);
    expect(c.guide).toBe('rgb(1, 2, 3)');
    expect(c.edge).not.toBe('rgb(1, 2, 3)');
    await page.close();
  });
});
