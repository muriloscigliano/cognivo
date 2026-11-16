// @vitest-environment node
/**
 * cg-table semantics in a real accessibility tree (Chromium + Playwright's
 * role engine, the same one Testing Library's getByRole mirrors):
 * accessible name, column/row headers, aria-sort, sorting, slotted rich
 * cells and their keyboard order.
 */
import { describe, it, expect, afterAll } from 'vitest';
import type { Page } from '@playwright/test';
import { browserAvailable, openPage, closeBrowser, settle, axeViolations } from './harness.js';

const TAGS = ['cg-table', 'cg-checkbox', 'cg-icon'];

const COLUMNS = [
  { key: 'company', label: 'Company', sortable: true, rowHeader: true },
  { key: 'stage', label: 'Stage' },
  { key: 'amount', label: 'Amount', sortable: true, align: 'right' },
];
const ROWS = [
  ['Acme', 'Lead', 300],
  ['Globex', 'Won', 1200],
  ['Initech', 'Lost', 50],
];

/** Render a cg-table (properties set like the React adapter does) after `html`. */
async function table(html: string, props: Record<string, unknown> = {}): Promise<Page> {
  const page = await openPage(TAGS, html);
  await page.evaluate(({ columns, rows, props }) => {
    const t = document.querySelector('cg-table') as HTMLElement & Record<string, unknown>;
    Object.assign(t, { columns, rows }, props);
  }, { columns: COLUMNS, rows: ROWS, props });
  await settle(page);
  return page;
}

const order = (page: Page) =>
  page.getByRole('rowheader').evaluateAll((cells) => cells.map((c) => c.textContent!.trim()));

describe.skipIf(!browserAvailable)('cg-table semantics (real browser)', { timeout: 30_000 }, () => {
  afterAll(closeBrowser);

  describe('accessible name', () => {
    it('a visible caption names the table', async () => {
      const page = await table('<cg-table></cg-table>', { caption: 'Open deals' });
      await expect(page.getByRole('table', { name: 'Open deals' }).count()).resolves.toBe(1);
      await expect(page.getByText('Open deals').isVisible()).resolves.toBe(true);
      await page.close();
    });

    it('a visually hidden caption still names the table', async () => {
      const page = await table('<cg-table caption-hidden></cg-table>', { caption: 'Open deals' });
      await expect(page.getByRole('table', { name: 'Open deals' }).count()).resolves.toBe(1);
      const box = await page.evaluate(() => {
        const cap = document.querySelector('cg-table')!.shadowRoot!.querySelector('caption')!;
        const r = cap.getBoundingClientRect();
        return r.width * r.height;
      });
      expect(box).toBeLessThanOrEqual(1);
      await page.close();
    });

    it('label reaches the inner <table>', async () => {
      const page = await table('<cg-table></cg-table>', { label: 'Deals' });
      await expect(page.getByRole('table', { name: 'Deals' }).count()).resolves.toBe(1);
      await page.close();
    });

    it('labelledby resolves ids in the page (across the shadow boundary) and follows text changes', async () => {
      const page = await table('<h2 id="deals-h">Pipeline</h2><cg-table labelledby="deals-h"></cg-table>');
      await expect(page.getByRole('table', { name: 'Pipeline' }).count()).resolves.toBe(1);
      await page.evaluate(() => { document.getElementById('deals-h')!.textContent = 'Pipeline (Q3)'; });
      await settle(page);
      await expect(page.getByRole('table', { name: 'Pipeline (Q3)' }).count()).resolves.toBe(1);
      await page.close();
    });
    it('labelledby resolves a heading mounted after the table, and follows a replaced heading', async () => {
      const page = await table('<div id="slot"></div><cg-table labelledby="deals-h"></cg-table>');
      await page.evaluate(() => { document.getElementById('slot')!.innerHTML = '<h2 id="deals-h">Pipeline</h2>'; });
      await settle(page);
      await expect(page.getByRole('table', { name: 'Pipeline' }).count()).resolves.toBe(1);
      // Replaced by a new node with the same id (a framework re-render).
      await page.evaluate(() => {
        const h = document.createElement('h2');
        h.id = 'deals-h';
        h.textContent = 'Won deals';
        document.getElementById('deals-h')!.replaceWith(h);
      });
      await settle(page);
      await expect(page.getByRole('table', { name: 'Won deals' }).count()).resolves.toBe(1);
      // The new node's text changes are followed too.
      await page.evaluate(() => { document.getElementById('deals-h')!.textContent = 'Won deals (Q3)'; });
      await settle(page);
      await expect(page.getByRole('table', { name: 'Won deals (Q3)' }).count()).resolves.toBe(1);
      // An id appearing later on an existing node also counts.
      await page.evaluate(() => {
        document.getElementById('deals-h')!.removeAttribute('id');
        document.getElementById('slot')!.insertAdjacentHTML('beforeend', '<p>Lost deals</p>');
      });
      await settle(page);
      await page.evaluate(() => { document.querySelector('#slot p')!.id = 'deals-h'; });
      await settle(page);
      await expect(page.getByRole('table', { name: 'Lost deals' }).count()).resolves.toBe(1);
      await page.close();
    });

    it('labelledby wins over label (ARIA precedence)', async () => {
      const page = await table('<h2 id="deals-h">Pipeline</h2><cg-table labelledby="deals-h"></cg-table>', { label: 'Deals' });
      await expect(page.getByRole('table', { name: 'Pipeline' }).count()).resolves.toBe(1);
      await expect(page.getByRole('table', { name: 'Deals', exact: true }).count()).resolves.toBe(0);
      await page.close();
    });

    it('the name from labelledby leaves out hidden descendants of the referenced element', async () => {
      const page = await table(
        '<h2 id="deals-h">Pipeline<span hidden> (draft)</span><span aria-hidden="true"> *</span><span style="display:none"> x</span><span style="visibility:hidden"> y</span> Q3</h2><cg-table labelledby="deals-h"></cg-table>',
      );
      const name = await page.evaluate(() => document.querySelector('cg-table')!.shadowRoot!.querySelector('table')!.getAttribute('aria-label'));
      expect(name).toBe('Pipeline Q3');
      await expect(page.getByRole('table', { name: 'Pipeline Q3', exact: true }).count()).resolves.toBe(1);
      // Unhiding a descendant updates the name.
      await page.evaluate(() => { document.querySelector('#deals-h [hidden]')!.removeAttribute('hidden'); });
      await settle(page);
      await expect(page.getByRole('table', { name: 'Pipeline (draft) Q3', exact: true }).count()).resolves.toBe(1);
      await page.close();
    });
  });

  describe('headers', () => {
    it('column headers have scope=col, rowHeader cells are <th scope=row>, sortable headers are buttons', async () => {
      const page = await table('<cg-table></cg-table>', { label: 'Deals' });
      const scopes = await page.evaluate(() => {
        const root = document.querySelector('cg-table')!.shadowRoot!;
        return {
          col: [...root.querySelectorAll('thead th')].map((th) => th.getAttribute('scope')),
          row: [...root.querySelectorAll('tbody th')].map((th) => th.getAttribute('scope')),
        };
      });
      expect(scopes).toEqual({ col: ['col', 'col', 'col'], row: ['row', 'row', 'row'] });
      expect(await order(page)).toEqual(['Acme', 'Globex', 'Initech']);
      await expect(page.getByRole('columnheader', { name: 'Stage' }).count()).resolves.toBe(1);
      await expect(page.getByRole('button', { name: 'Company' }).count()).resolves.toBe(1);
      await expect(page.getByRole('button', { name: 'Stage' }).count()).resolves.toBe(0);
      // A cell is announced with its row header.
      const snap = await page.locator('cg-table').ariaSnapshot();
      expect(snap).toContain('rowheader "Globex"');
      expect(await axeViolations(page)).toEqual([]);
      await page.close();
    });

    it('sorting from the keyboard sets aria-sort on the header and reorders rows', async () => {
      const page = await table('<button id="before">x</button><cg-table></cg-table>', { label: 'Deals' });
      await page.focus('#before');
      await page.keyboard.press('Tab'); // Company sort button
      await page.keyboard.press('Tab'); // Amount sort button
      await page.keyboard.press('Enter');
      await settle(page);
      await expect(page.getByRole('columnheader', { name: 'Amount' }).getAttribute('aria-sort')).resolves.toBe('ascending');
      expect(await order(page)).toEqual(['Initech', 'Acme', 'Globex']);
      await page.keyboard.press('Space');
      await settle(page);
      await expect(page.getByRole('columnheader', { name: 'Amount' }).getAttribute('aria-sort')).resolves.toBe('descending');
      await expect(page.getByRole('columnheader', { name: 'Company' }).getAttribute('aria-sort')).resolves.toBe(null);
      expect(await order(page)).toEqual(['Globex', 'Acme', 'Initech']);
      await page.close();
    });

    it('controlled + manual-sort: shows the sort prop, asks for the next one, never reorders rows itself', async () => {
      const page = await table('<cg-table manual-sort></cg-table>', {
        label: 'Deals',
        sort: { key: 'company', direction: 'desc' },
      });
      await page.evaluate(() => {
        (window as unknown as { __req: unknown[] }).__req = [];
        document.querySelector('cg-table')!.addEventListener('cg-sort-change', (e) =>
          (window as unknown as { __req: unknown[] }).__req.push((e as CustomEvent).detail));
      });
      await expect(page.getByRole('columnheader', { name: 'Company' }).getAttribute('aria-sort')).resolves.toBe('descending');
      expect(await order(page)).toEqual(['Acme', 'Globex', 'Initech']); // as given: the server sorted
      await page.getByRole('button', { name: 'Company' }).click();
      await page.getByRole('button', { name: 'Amount' }).click();
      await settle(page);
      const req = await page.evaluate(() => (window as unknown as { __req: unknown[] }).__req);
      expect(req).toEqual([{ key: 'company', direction: 'asc' }, { key: 'amount', direction: 'asc' }]);
      // Still the controlled state, not the requested one.
      await expect(page.getByRole('columnheader', { name: 'Company' }).getAttribute('aria-sort')).resolves.toBe('descending');
      expect(await order(page)).toEqual(['Acme', 'Globex', 'Initech']);
      await page.close();
    });
  });

  describe('rich cells', () => {
    const LINKS = `
      <button id="before">x</button>
      <cg-table clickable>
        <a slot="cell-0-company" href="#acme">Acme Corp</a>
        <a slot="cell-1-company" href="#globex">Globex Inc</a>
        <a slot="cell-2-company" href="#initech">Initech LLC</a>
        <button slot="cell-1-stage" type="button">Mark won</button>
      </cg-table>`;
    const RICH = COLUMNS.map((c) => (c.key === 'company' || c.key === 'stage' ? { ...c, slotted: true } : c));

    it('slotted links render in their cells, keep their roles and are named row headers', async () => {
      const page = await table(LINKS, { label: 'Deals', columns: RICH });
      await expect(page.getByRole('rowheader', { name: 'Globex Inc' }).count()).resolves.toBe(1);
      await expect(page.getByRole('link', { name: 'Globex Inc' }).count()).resolves.toBe(1);
      // Unslotted cells of a slotted column show the row value.
      await expect(page.getByRole('cell', { name: 'Lead' }).count()).resolves.toBe(1);
      await expect(page.getByRole('cell', { name: 'Mark won' }).count()).resolves.toBe(1);
      expect(await axeViolations(page)).toEqual([]);
      await page.close();
    });

    it('Tab follows the displayed order, also after sorting', async () => {
      const page = await table(LINKS.replace('<cg-table clickable>', '<cg-table>'), { label: 'Deals', columns: RICH });
      const tabs = async (n: number) => {
        const seen: string[] = [];
        await page.focus('#before');
        for (let i = 0; i < n; i++) {
          await page.keyboard.press('Tab');
          seen.push(await page.evaluate(() => {
            let a: Element | null = document.activeElement;
            while (a?.shadowRoot?.activeElement) a = a.shadowRoot.activeElement;
            return (a?.textContent ?? '').trim();
          }));
        }
        return seen;
      };
      expect(await tabs(6)).toEqual(['Company', 'Amount', 'Acme Corp', 'Globex Inc', 'Mark won', 'Initech LLC']);
      await page.getByRole('button', { name: 'Amount' }).click(); // ascending: Initech 50, Acme 300, Globex 1200
      await settle(page);
      expect(await tabs(6)).toEqual(['Company', 'Amount', 'Initech LLC', 'Acme Corp', 'Globex Inc', 'Mark won']);
      await page.close();
    });

    it('a click or Enter on a link/button in a clickable row does not fire cg-row-click; on the row it does', async () => {
      const page = await table(LINKS, { label: 'Deals', columns: RICH });
      await page.evaluate(() => {
        (window as unknown as { __rows: number[] }).__rows = [];
        document.querySelector('cg-table')!.addEventListener('cg-row-click', (e) =>
          (window as unknown as { __rows: number[] }).__rows.push((e as CustomEvent<{ index: number }>).detail.index));
        document.querySelectorAll('a').forEach((a) => a.addEventListener('click', (e) => e.preventDefault()));
      });
      await page.getByRole('button', { name: 'Mark won' }).click();
      await page.getByRole('link', { name: 'Acme Corp' }).focus();
      await page.keyboard.press('Enter');
      await page.getByRole('cell', { name: '1200' }).click();
      const rows = await page.evaluate(() => (window as unknown as { __rows: number[] }).__rows);
      expect(rows).toEqual([1]);
      await page.close();
    });
  });
});
