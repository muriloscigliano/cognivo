// @vitest-environment node
/**
 * Interaction states (design direction, 2026-11-16: "hover and selection is
 * terrible"): quiet, neutral states from Cognivo state tokens, in both themes.
 * Hover is a small neutral fill (`--cg-color-state-hover`), pressed one step
 * more, selected rows a neutral fill, the current sidebar item / segmented
 * option a white (dark: panel) pill with a hairline, focus a neutral ring
 * (`--cg-color-focus-ring`), a focused field a near-black border with a soft
 * halo, `::selection` neutral grey, disabled 40% opacity. No lime or green in
 * any of them. Hover only where the device hovers; 150ms ease-out colour
 * transitions.
 */
import { describe, it, expect, afterAll } from 'vitest';
import { resolve } from 'node:path';
import type { Page } from '@playwright/test';
import { browserAvailable, openPage, closeBrowser, settleStyles } from './harness.js';

const TOKENS_CSS = resolve(__dirname, '..', '..', '..', '..', 'tokens', 'dist', 'index.css');
const TAGS = ['cg-button', 'cg-sidebar', 'cg-table', 'cg-checkbox', 'cg-input', 'cg-segmented-control', 'cg-select', 'cg-link'];
const BODY = `
  <div style="padding: 24px; display: grid; gap: 16px; justify-items: start">
    <cg-button id="primary">Save</cg-button>
    <cg-button id="secondary" variant="secondary">Filter</cg-button>
    <cg-button id="ghost" variant="tertiary">More</cg-button>
    <cg-button id="disabled" variant="secondary" disabled>Off</cg-button>
    <cg-sidebar style="width: 240px">
      <a href="#d" aria-current="page" id="current">Deals</a>
      <a href="#c" id="plain">Contacts</a>
    </cg-sidebar>
    <cg-table id="table" selectable clickable style="width: 400px"></cg-table>
    <cg-input id="input" label="Name"></cg-input>
    <cg-segmented-control id="seg"></cg-segmented-control>
    <cg-select id="select" label="Stage"></cg-select>
    <cg-link id="link" href="#x" variant="muted">View all</cg-link>
  </div>`;

async function open(theme: 'light' | 'dark', reduced = true): Promise<Page> {
  const page = await openPage(TAGS, BODY);
  if (reduced) await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.addStyleTag({ path: TOKENS_CSS });
  await page.evaluate((theme) => {
    if (theme === 'dark') document.documentElement.setAttribute('data-theme', 'dark');
    Object.assign(document.getElementById('table')!, {
      columns: [{ key: 'deal', label: 'Deal' }, { key: 'amount', label: 'Amount' }],
      rows: [['Acme', 1], ['Globex', 2], ['Initech', 3]],
    });
    Object.assign(document.getElementById('seg')!, { options: [{ value: 'list', label: 'List' }, { value: 'board', label: 'Board' }], value: 'list' });
    Object.assign(document.getElementById('select')!, { options: [{ value: 'a', label: 'Lead' }, { value: 'b', label: 'Won' }], value: 'a' });
  }, theme);
  await settleStyles(page);
  return page;
}

/** A token's computed colour (resolved through a probe element). */
const token = (page: Page, name: string) =>
  page.evaluate((name) => {
    const probe = document.createElement('div');
    probe.style.backgroundColor = `var(${name})`;
    document.body.append(probe);
    const v = getComputedStyle(probe).backgroundColor;
    probe.remove();
    return v;
  }, name);

/** Computed style of an element reached by a JS expression (shadow roots allowed). */
const style = (page: Page, js: string, props: string[], pseudo?: string) =>
  page.evaluate(({ js, props, pseudo }) => {
    const el = new Function(`return ${js}`)() as Element;
    const cs = getComputedStyle(el, pseudo);
    return Object.fromEntries(props.map((p) => [p, cs.getPropertyValue(p)]));
  }, { js, props, pseudo });

const BTN = (id: string) => `document.getElementById('${id}').shadowRoot.querySelector('.btn')`;
const SIDEBAR_ITEM = (id: string) => `document.getElementById('${id}')`;
const ROW_CELL = (i: number) => `document.getElementById('table').shadowRoot.querySelectorAll('tbody tr')[${i}].querySelector('td:last-child')`;

/** Neutral: a grey (channels within a small spread), at any alpha — never lime or green. */
function neutral(color: string): boolean {
  const [r, g, b] = color.match(/[\d.]+/g)!.map(Number);
  return Math.max(r!, g!, b!) - Math.min(r!, g!, b!) <= 12;
}

describe.skipIf(!browserAvailable)('interaction states (real browser)', { timeout: 30_000 }, () => {
  afterAll(closeBrowser);

  for (const theme of ['light', 'dark'] as const) {
    describe(theme, () => {
      it('the state tokens are neutral greys (no accent), and the focus ring is neutral', async () => {
        const page = await open(theme);
        for (const t of ['--cg-color-state-hover', '--cg-color-state-pressed', '--cg-color-state-selected', '--cg-color-state-text',
          '--cg-color-state-pill-background', '--cg-color-state-focus-border', '--cg-color-state-focus-halo',
          '--cg-color-selection-background', '--cg-color-focus-ring']) {
          const v = await token(page, t);
          expect(v, t).not.toBe('rgba(0, 0, 0, 0)');
          expect(neutral(v), `${t} = ${v}`).toBe(true);
        }
        await page.close();
      });

      it('sidebar: hover is a neutral fill with near-black text; the current item is a pill with a hairline and does not change on hover; focus is the neutral ring', async () => {
        const page = await open(theme);
        const [hover, text, pill, hairline, ring] = await Promise.all(['--cg-color-state-hover', '--cg-color-state-text', '--cg-color-state-pill-background', '--cg-color-state-pill-border', '--cg-color-focus-ring'].map((t) => token(page, t)));
        await page.locator('#plain').hover();
        await settleStyles(page);
        expect(await style(page, SIDEBAR_ITEM('plain'), ['background-color', 'color'])).toEqual({ 'background-color': hover, color: text });
        const current = await style(page, SIDEBAR_ITEM('current'), ['background-color', 'color', 'box-shadow']);
        expect(current['background-color']).toBe(pill);
        expect(current.color).toBe(text);
        expect(current['box-shadow']).toContain(hairline);
        await page.locator('#current').hover();
        await settleStyles(page);
        expect(await style(page, SIDEBAR_ITEM('current'), ['background-color', 'color', 'box-shadow'])).toEqual(current);
        await page.locator('#current').focus();
        await page.keyboard.press('Tab');
        await page.keyboard.press('Shift+Tab');
        await settleStyles(page);
        const focus = await style(page, SIDEBAR_ITEM('current'), ['outline-color', 'outline-style', 'outline-width', 'outline-offset']);
        expect(focus).toEqual({ 'outline-color': ring, 'outline-style': 'solid', 'outline-width': '2px', 'outline-offset': '2px' });
        await page.close();
      });

      it('table: a hovered row gets the neutral hover fill, a selected (checked) row the neutral selected fill', async () => {
        const page = await open(theme);
        const [hover, selected] = await Promise.all([token(page, '--cg-color-state-hover'), token(page, '--cg-color-state-selected')]);
        await page.locator('#table').locator('tbody tr').nth(1).locator('cg-checkbox').click();
        await page.mouse.move(0, 0);
        await settleStyles(page);
        expect((await style(page, ROW_CELL(1), ['background-color']))['background-color']).toBe(selected);
        await page.evaluate((js) => (new Function(`return ${js}`)() as Element).scrollIntoView(), ROW_CELL(2));
        await page.locator('#table').locator('tbody tr').nth(2).hover();
        await settleStyles(page);
        expect((await style(page, ROW_CELL(2), ['background-color']))['background-color']).toBe(hover);
        await page.close();
      });

      it('buttons: hover lays the neutral hover overlay on the resting colour (primary keeps its colour); disabled is 40% opacity with no hover', async () => {
        const page = await open(theme);
        const hover = await token(page, '--cg-color-state-hover');
        const resting = await style(page, BTN('primary'), ['background-color']);
        for (const id of ['primary', 'secondary', 'ghost']) {
          await page.locator(`#${id}`).hover();
          await settleStyles(page);
          const s = await style(page, BTN(id), ['background-image', 'background-color']);
          expect(s['background-image'], id).toContain(hover);
        }
        await page.locator('#primary').hover();
        await settleStyles(page);
        expect((await style(page, BTN('primary'), ['background-color']))['background-color']).toBe(resting['background-color']);
        const disabled = await style(page, BTN('disabled'), ['opacity', 'cursor', 'background-image']);
        expect(disabled).toEqual({ opacity: '0.4', cursor: 'not-allowed', 'background-image': 'none' });
        await page.close();
      });

      it('input and select: a focused field has a near-black border and a soft neutral halo', async () => {
        const page = await open(theme);
        const [border, halo] = await Promise.all([token(page, '--cg-color-state-focus-border'), token(page, '--cg-color-state-focus-halo')]);
        await page.locator('#input input').focus();
        await settleStyles(page);
        const input = await style(page, `document.getElementById('input').shadowRoot.querySelector('.wrapper')`, ['border-top-color', 'box-shadow']);
        expect(input['border-top-color']).toBe(border);
        expect(input['box-shadow']).toContain(halo);
        // Keyboard focus on the select trigger (focus-visible follows a key press).
        await page.keyboard.press('Shift');
        await page.locator('#select').locator('.trigger').focus();
        await settleStyles(page);
        const select = await style(page, `document.getElementById('select').shadowRoot.querySelector('.trigger')`, ['border-top-color', 'box-shadow']);
        expect(select['border-top-color']).toBe(border);
        expect(select['box-shadow']).toContain(halo);
        await page.close();
      });

      it('segmented control: the selected option is a pill with a hairline and near-black text', async () => {
        const page = await open(theme);
        const [pill, hairline, text] = await Promise.all(['--cg-color-state-pill-background', '--cg-color-state-pill-border', '--cg-color-state-text'].map((t) => token(page, t)));
        const indicator = await style(page, `document.getElementById('seg').shadowRoot.querySelector('.indicator')`, ['background-color', 'border-top-color']);
        expect(indicator).toEqual({ 'background-color': pill, 'border-top-color': hairline });
        const checked = await style(page, `document.getElementById('seg').shadowRoot.querySelector('[aria-checked="true"]')`, ['color']);
        expect(checked.color).toBe(text);
        await page.close();
      });

      it('select options: the selected option is near-black text, not accent', async () => {
        const page = await open(theme);
        const text = await token(page, '--cg-color-state-text');
        await page.locator('#select').locator('.trigger').click();
        await settleStyles(page);
        const selected = await style(page, `document.getElementById('select').shadowRoot.querySelector('.option.selected')`, ['color']);
        expect(selected.color).toBe(text);
        await page.close();
      });

      it('link: hover turns the text near-black', async () => {
        const page = await open(theme);
        const text = await token(page, '--cg-color-state-text');
        await page.locator('#link').hover();
        await settleStyles(page);
        expect((await style(page, `document.getElementById('link').shadowRoot.querySelector('a')`, ['color'])).color).toBe(text);
        await page.close();
      });

      it('::selection is neutral grey with near-black (dark: white) text, inside components too', async () => {
        const page = await open(theme);
        const [bg, text] = await Promise.all([token(page, '--cg-color-selection-background'), token(page, '--cg-color-selection-text')]);
        const sel = await style(page, BTN('secondary'), ['background-color', 'color'], '::selection');
        expect(sel).toEqual({ 'background-color': bg, color: text });
        await page.close();
      });
    });
  }

  it('state colour transitions are 150ms ease-out', async () => {
    const page = await open('light', false);
    for (const js of [BTN('secondary'), SIDEBAR_ITEM('plain'), `document.getElementById('table').shadowRoot.querySelector('tbody tr td')`]) {
      const t = await style(page, js, ['transition-duration', 'transition-timing-function', 'transition-property']);
      const props = t['transition-property']!.split(', ');
      const i = props.findIndex((p) => p === 'background-color');
      expect(i, `${js}: ${t['transition-property']}`).toBeGreaterThanOrEqual(0);
      expect(t['transition-duration']!.split(', ')[i]).toBe('0.15s');
      expect(t['transition-timing-function']!.split(', ')[i]).toBe('ease-out');
    }
    await page.close();
  });

  it('hover rules apply only on devices that hover (every :hover rule sits in @media (hover: hover))', async () => {
    const page = await open('light');
    const loose = await page.evaluate(() => {
      const out: string[] = [];
      const visit = (rules: CSSRuleList, inHover: boolean, tag: string) => {
        for (const r of Array.from(rules)) {
          if (r instanceof CSSMediaRule) visit(r.cssRules, inHover || /hover:\s*hover/.test(r.conditionText), tag);
          else if (r instanceof CSSStyleRule && r.selectorText.includes(':hover') && !inHover) out.push(`${tag}: ${r.selectorText}`);
        }
      };
      for (const tag of ['cg-button', 'cg-sidebar', 'cg-table', 'cg-segmented-control', 'cg-link']) {
        const root = document.querySelector(tag)!.shadowRoot!;
        for (const sheet of root.adoptedStyleSheets) visit(sheet.cssRules, false, tag);
      }
      return out;
    });
    expect(loose).toEqual([]);
    await page.close();
  });
});
