// @vitest-environment node
/**
 * cg-pagination mode="cursor": Previous/Next only, for cursor-based APIs
 * that know whether there is a previous/next page but not the page count.
 */
import { describe, it, expect, afterAll } from 'vitest';
import type { Page } from '@playwright/test';
import { browserAvailable, openPage, closeBrowser, settle, axeViolations } from './harness.js';

const TAGS = ['cg-pagination', 'cg-icon'];

const record = (page: Page) => page.evaluate(() => {
  (window as unknown as { __ev: unknown[] }).__ev = [];
  document.querySelector('cg-pagination')!.addEventListener('cg-page-change', (e) =>
    (window as unknown as { __ev: unknown[] }).__ev.push((e as CustomEvent).detail));
});
const events = (page: Page) => page.evaluate(() => (window as unknown as { __ev: unknown[] }).__ev);

describe.skipIf(!browserAvailable)('cg-pagination cursor mode (real browser)', { timeout: 30_000 }, () => {
  afterAll(closeBrowser);

  it('renders only Previous and Next (no page numbers), inside the Pagination landmark; axe clean', async () => {
    const page = await openPage(TAGS, '<cg-pagination mode="cursor" has-next></cg-pagination>');
    const nav = page.getByRole('navigation', { name: 'Pagination' });
    await expect(nav.getByRole('button').evaluateAll((b) => b.map((x) => x.textContent!.trim()))).resolves.toEqual(['Previous', 'Next']);
    await expect(nav.getByRole('button', { name: /^Page/ }).count()).resolves.toBe(0);
    expect(await axeViolations(page)).toEqual([]);
    await page.close();
  });

  it('has-previous / has-next gate the buttons (aria-disabled, no event) and the event says the direction', async () => {
    const page = await openPage(TAGS, '<cg-pagination mode="cursor" has-next></cg-pagination>');
    await record(page);
    const prev = page.getByRole('button', { name: 'Previous' });
    const next = page.getByRole('button', { name: 'Next' });
    await expect(prev.getAttribute('aria-disabled')).resolves.toBe('true');
    await expect(next.getAttribute('aria-disabled')).resolves.toBe('false');
    await prev.click({ force: true }); // aria-disabled: Playwright would wait for it to enable
    await next.click();
    expect(await events(page)).toEqual([{ direction: 'next' }]);

    await page.evaluate(() => {
      const p = document.querySelector('cg-pagination') as HTMLElement & { hasPrevious: boolean; hasNext: boolean };
      p.hasPrevious = true;
      p.hasNext = false;
    });
    await settle(page);
    await expect(next.getAttribute('aria-disabled')).resolves.toBe('true');
    // Keyboard: Enter on the focused button activates it.
    await prev.focus();
    await page.keyboard.press('Enter');
    await next.click({ force: true });
    expect(await events(page)).toEqual([{ direction: 'next' }, { direction: 'previous' }]);
    await page.close();
  });

  it('labels are translatable per element and page-wide', async () => {
    const page = await openPage(TAGS,
      `<cg-pagination mode="cursor" has-previous has-next messages='{"label":"Paginação","previousLabel":"Anterior","nextLabel":"Próxima"}'></cg-pagination>`,
      ['utils/messages.ts']);
    await expect(page.getByRole('navigation', { name: 'Paginação' }).getByRole('button').evaluateAll((b) => b.map((x) => x.textContent!.trim())))
      .resolves.toEqual(['Anterior', 'Próxima']);
    await page.evaluate(() => {
      (window as unknown as { __cg: { setMessages: (m: unknown) => void } }).__cg.setMessages({ 'cg-pagination': { nextLabel: 'Seguinte' } });
      const p = document.querySelector('cg-pagination')!;
      p.removeAttribute('messages');
    });
    await settle(page);
    await expect(page.getByRole('button', { name: 'Seguinte' }).count()).resolves.toBe(1);
    await page.close();
  });

  it('pages mode is unchanged: numbers render and the event carries the page', async () => {
    const page = await openPage(TAGS, '<cg-pagination total="5" current="2"></cg-pagination>');
    await record(page);
    await page.getByRole('button', { name: 'Page 4' }).click();
    await page.getByRole('button', { name: 'Next page' }).click();
    expect(await events(page)).toEqual([{ page: 4 }, { page: 3 }]);
    await page.close();
  });
});
