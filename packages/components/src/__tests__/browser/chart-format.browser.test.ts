// @vitest-environment node
/**
 * Independent review of the chart `format` / `locale` pass, 2026-11-18:
 * - an invalid `format` or `locale` (Intl throws) blanked the whole chart;
 * - BRL value labels on 12 bars ran into each other, and a horizontal bar's
 *   label of R$ 1.234.567,89 ran past the 400-wide viewBox;
 * - `locale` without `format` reached the data table only (marks and the
 *   chart's name kept the hard-coded "1.2K").
 *
 * Now, in real Chromium: an invalid `format` / `locale` falls back to the
 * default formatter with one console warning and the chart still draws;
 * mark labels switch to compact notation when the full value would collide
 * or overflow (and are thinned if compact still collides), while the
 * tooltip and the data table keep the full value; `locale` alone applies to
 * the marks and the chart's name as well as the table.
 */
import { resolve } from 'node:path';
import { describe, it, expect, afterAll } from 'vitest';
import type { Page } from '@playwright/test';
import { browserAvailable, openPage, closeBrowser, settleStyles } from './harness.js';

const TOKENS_CSS = resolve(__dirname, '..', '..', '..', '..', 'tokens', 'dist', 'index.css');

async function chart(attrs: string, data: unknown, props: Record<string, unknown> = {}): Promise<{ page: Page; warnings: string[] }> {
  const page = await openPage(['cg-chart'], `<div lang="pt-BR" style="width:600px"><cg-chart id="c" ${attrs}></cg-chart></div>`);
  const warnings: string[] = [];
  page.on('console', (m) => { if (m.type() === 'warning') warnings.push(m.text()); });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.addStyleTag({ path: TOKENS_CSS });
  await page.evaluate(({ data, props }) => {
    const c = document.getElementById('c') as HTMLElement & Record<string, unknown>;
    Object.assign(c, props);
    c.data = data;
  }, { data, props });
  await settleStyles(page);
  return { page, warnings };
}

const read = (page: Page) => page.evaluate(() => {
  const root = document.getElementById('c')!.shadowRoot!;
  const svgEl = root.querySelector('svg');
  return {
    drawn: !!svgEl && root.querySelectorAll('rect').length > 0,
    marks: Array.from(root.querySelectorAll('text.val'), (t) => {
      const b = (t as SVGTextElement).getBBox();
      return { text: t.textContent!.trim(), left: b.x, right: b.x + b.width };
    }),
    cells: Array.from(root.querySelectorAll('tbody td'), (c) => c.textContent!.trim()),
    label: svgEl?.getAttribute('aria-label') ?? '',
    viewW: svgEl ? svgEl.viewBox.baseVal.width : 0,
  };
});

const brl = (v: number) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(v);

describe.skipIf(!browserAvailable)('cg-chart format / locale (real browser)', { timeout: 60_000 }, () => {
  afterAll(closeBrowser);

  const data = [{ label: 'a', value: 1234.5 }, { label: 'b', value: 425.9 }];

  for (const [name, props] of [
    ['currency style without a currency', { format: { style: 'currency' } }],
    ["currency 'REAL'", { format: { style: 'currency', currency: 'REAL' } }],
    ["locale 'pt_BR'", { format: { style: 'currency', currency: 'BRL' }, locale: 'pt_BR' }],
  ] as const) {
    it(`an invalid ${name} never blanks the chart: default formatter and a warning`, async () => {
      const { page, warnings } = await chart('type="bar" title="Receita"', data, props);
      const r = await read(page);
      expect(r.drawn).toBe(true);
      expect(r.cells).toHaveLength(2);
      expect(r.cells.every((c) => c.length > 0)).toBe(true);
      expect(r.marks.map((m) => m.text).every((t) => t.length > 0)).toBe(true);
      expect(warnings.some((w) => w.includes('[cognivo]') && w.includes('cg-chart'))).toBe(true);
      await page.close();
    });
  }

  it('an invalid locale keeps a valid format (BRL in the page language)', async () => {
    const { page } = await chart('type="bar"', data, { format: { style: 'currency', currency: 'BRL' }, locale: 'pt_BR' });
    expect((await read(page)).cells).toEqual([brl(1234.5), brl(425.9)]);
    await page.close();
  });

  it('12 BRL bars: mark labels never overlap and stay inside the chart; tooltip and table keep the full value', async () => {
    const values = Array.from({ length: 12 }, (_, i) => 1000 + i * 1234.56);
    const { page } = await chart('type="bar" height="200"', values.map((v, i) => ({ label: `M${i + 1}`, value: v })), { format: { style: 'currency', currency: 'BRL' } });
    const r = await read(page);
    expect(r.marks.length).toBeGreaterThan(0);
    for (const m of r.marks) {
      expect(m.left).toBeGreaterThanOrEqual(0);
      expect(m.right).toBeLessThanOrEqual(r.viewW);
    }
    const sorted = [...r.marks].sort((a, b) => a.left - b.left);
    for (let i = 1; i < sorted.length; i++) expect(sorted[i]!.left).toBeGreaterThanOrEqual(sorted[i - 1]!.right);
    expect(r.cells).toEqual(values.map(brl));
    // The tooltip reads the full value.
    await page.evaluate(() => (document.getElementById('c')!.shadowRoot!.querySelector('svg') as SVGElement).focus());
    await page.keyboard.press('End');
    await settleStyles(page);
    expect(await page.evaluate(() => document.getElementById('c')!.shadowRoot!.querySelector('.tip-value')!.textContent!.trim())).toBe(brl(values[11]!));
    await page.close();
  });

  it('a horizontal bar of R$ 1.234.567,89: the label stays inside the 400-wide viewBox; tooltip and table read the full value', async () => {
    const { page } = await chart('type="horizontal-bar"', [{ label: 'Total', value: 1234567.89 }, { label: 'Parte', value: 234567.89 }], { format: { style: 'currency', currency: 'BRL' } });
    const r = await read(page);
    expect(r.viewW).toBe(400);
    for (const m of r.marks) expect(m.right).toBeLessThanOrEqual(400);
    expect(r.cells[0]).toBe(brl(1234567.89));
    const box = await page.evaluate(() => document.getElementById('c')!.shadowRoot!.querySelector('rect.hbar-anim')!.getBoundingClientRect().toJSON());
    await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
    await settleStyles(page);
    expect(await page.evaluate(() => document.getElementById('c')!.shadowRoot!.querySelector('.tip-value')!.textContent!.trim())).toBe(brl(1234567.89));
    await page.close();
  });

  it('locale without format: marks (compact) and the chart name are in the locale, like the table', async () => {
    const { page } = await chart('type="bar" title="Vendas" locale="de-DE"', [{ label: 'a', value: 1234.5 }, { label: 'b', value: 12 }]);
    const r = await read(page);
    const compact = new Intl.NumberFormat('de-DE', { notation: 'compact', maximumFractionDigits: 1 }).format(1234.5);
    expect(r.marks.map((m) => m.text)).toEqual([compact, '12']);
    expect(r.label).toContain('1.234,5');
    expect(r.cells).toEqual(['1.234,5', '12']);
    await page.close();
  });
});
