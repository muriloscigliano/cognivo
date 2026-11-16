// @vitest-environment node
/**
 * Empty header / footer regions take no space (real layout, real slotchange):
 * cg-sidebar's header and cg-table's footer, whether the slot is unused, holds
 * an empty wrapper (what a framework renders for an empty prop), or empties
 * later.
 */
import { describe, it, expect, afterAll } from 'vitest';
import { resolve } from 'node:path';
import type { Page } from '@playwright/test';
import { browserAvailable, openPage as open, closeBrowser, settle } from './harness.js';

const TOKENS_CSS = resolve(__dirname, '..', '..', '..', '..', 'tokens', 'dist', 'index.css');
/** A page with the real tokens (spacing, sizes), so empty regions would show. */
async function openPage(tags: string[], body: string): Promise<Page> {
  const page = await open(tags, body);
  await page.addStyleTag({ path: TOKENS_CSS });
  return page;
}

const heightOf = (page: Page, host: string, part: string) =>
  page.evaluate(({ host, part }) => {
    const el = document.querySelector(host)!.shadowRoot!.querySelector(part)!;
    return el.getBoundingClientRect().height;
  }, { host, part });

async function frames(page: Page): Promise<void> {
  await settle(page);
  await page.evaluate(() => new Promise((r) => requestAnimationFrame(() => setTimeout(r, 0))));
  await settle(page);
}

describe.skipIf(!browserAvailable)('empty slots collapse (real browser)', { timeout: 30_000 }, () => {
  afterAll(closeBrowser);

  describe('cg-sidebar header', () => {
    it('collapses when nothing is slotted', async () => {
      const page = await openPage(['cg-sidebar'], '<cg-sidebar><a href="#">Deals</a></cg-sidebar>');
      await frames(page);
      expect(await heightOf(page, 'cg-sidebar', '.header')).toBe(0);
      await page.close();
    });

    it('collapses when the slotted header is an empty wrapper, and when its content is removed later', async () => {
      const page = await openPage(['cg-sidebar'], '<cg-sidebar><div slot="header"> </div><a href="#">Deals</a></cg-sidebar>');
      await frames(page);
      expect(await heightOf(page, 'cg-sidebar', '.header')).toBe(0);
      await page.evaluate(() => { document.querySelector('[slot="header"]')!.textContent = 'Acme CRM'; });
      await frames(page);
      expect(await heightOf(page, 'cg-sidebar', '.header')).toBeGreaterThan(0);
      await page.evaluate(() => { document.querySelector('[slot="header"]')!.textContent = ''; });
      await frames(page);
      expect(await heightOf(page, 'cg-sidebar', '.header')).toBe(0);
      await page.close();
    });

    it('stays when it holds the collapse toggle', async () => {
      const page = await openPage(['cg-sidebar'], '<cg-sidebar collapsible><a href="#">Deals</a></cg-sidebar>');
      await frames(page);
      expect(await heightOf(page, 'cg-sidebar', '.header')).toBeGreaterThan(0);
      await page.close();
    });
  });

  describe('cg-table footer', () => {
    const TABLE = (footer = '') => `<cg-table>${footer}</cg-table>`;
    const withRows = async (page: Page) => {
      await page.evaluate(() => Object.assign(document.querySelector('cg-table')!, {
        columns: [{ key: 'a', label: 'A' }],
        rows: [['x']],
      }));
      await frames(page);
    };

    it('takes no space when nothing is slotted', async () => {
      const page = await openPage(['cg-table'], TABLE());
      await withRows(page);
      expect(await heightOf(page, 'cg-table', '.table-footer')).toBe(0);
      await page.close();
    });

    it('takes no space for an empty footer wrapper, and appears when it gets content', async () => {
      const page = await openPage(['cg-table'], TABLE('<div slot="footer"></div>'));
      await withRows(page);
      expect(await heightOf(page, 'cg-table', '.table-footer')).toBe(0);
      await page.evaluate(() => { document.querySelector('[slot="footer"]')!.textContent = '3 deals'; });
      await frames(page);
      expect(await heightOf(page, 'cg-table', '.table-footer')).toBeGreaterThan(0);
      await page.close();
    });
  });
});
