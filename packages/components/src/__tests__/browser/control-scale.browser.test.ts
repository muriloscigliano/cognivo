// @vitest-environment node
/**
 * Dashboard design audit, 2026-11-17 (P1-1, P1-2, P1-9, P1-11, P1-12, P3-3):
 * the editors used a second, bigger, rounder control scale — 48 px buttons at
 * radius 16, 48 px fields with floating labels next to 37 px ones with labels
 * above — the status menu was as narrow as its trigger so every option
 * wrapped, a destructive action had no quiet form, the browser's own
 * validation bubble appeared on submit, and native buttons inside components
 * fell back to the browser's 13.33 px font.
 *
 * Now, read in real Chromium: one scale (36 px default, sm 32 / lg 40,
 * radius 8), the field label above the field by default, menus at least
 * 200 px wide with options on one line, a ghost-danger button, invalid fields
 * styled in place (no native bubble, the first one focused), and every native
 * control inside a component inherits the component's font.
 */
import { resolve } from 'node:path';
import { describe, it, expect, afterAll } from 'vitest';
import type { Page } from '@playwright/test';
import { browserAvailable, openPage, closeBrowser, settleStyles, axeViolations } from './harness.js';

const TOKENS_CSS = resolve(__dirname, '..', '..', '..', '..', 'tokens', 'dist', 'index.css');

async function open(tags: string[], body: string): Promise<Page> {
  const page = await openPage(tags, body);
  // Reduced motion before the tokens load, so the colour change they cause is not a running transition.
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.addStyleTag({ path: TOKENS_CSS });
  await page.addStyleTag({ content: 'body { font-family: Georgia, serif; font-size: 15px }' });
  await settleStyles(page);
  return page;
}

const box = (page: Page, host: string, inner: string) =>
  page.evaluate(([host, inner]) => {
    const el = document.querySelector(host)!.shadowRoot!.querySelector(inner)!;
    const r = el.getBoundingClientRect();
    const s = getComputedStyle(el);
    return { top: r.top, bottom: r.bottom, height: r.height, width: r.width, left: r.left, radius: s.borderTopLeftRadius, bg: s.backgroundColor, color: s.color, border: s.borderTopColor, fontSize: s.fontSize };
  }, [host, inner] as const);

const token = (page: Page, prop: string, name: string) =>
  page.evaluate(([prop, name]) => {
    const p = document.createElement('div');
    (p.style as unknown as Record<string, string>)[prop] = `var(${name})`;
    document.body.append(p);
    const v = (getComputedStyle(p) as unknown as Record<string, string>)[prop]!;
    p.remove();
    return v;
  }, [prop, name] as const);

describe.skipIf(!browserAvailable)('one control scale (real browser)', { timeout: 60_000 }, () => {
  afterAll(closeBrowser);

  it('cg-button: 36 px by default, sm 32 / lg 40, radius 8 at every size', async () => {
    const page = await open(['cg-button'], `
      <cg-button id="md">Save</cg-button><cg-button id="sm" size="sm">Edit</cg-button><cg-button id="lg" size="lg">Continue</cg-button>`);
    for (const [id, h] of [['#md', 36], ['#sm', 32], ['#lg', 40]] as const) {
      const b = await box(page, id, '.btn');
      expect(b.height, id).toBe(h);
      expect(b.radius, id).toBe('8px');
    }
    await page.close();
  });

  it('every field-like control is 36 px tall by default (border included)', async () => {
    const FIELDS: Record<string, string> = {
      'cg-autocomplete': '.input-wrap', 'cg-combobox': '.wrapper', 'cg-date-picker': '.trigger', 'cg-phone-input': '.wrapper',
      'cg-number-input': '.wrapper', 'cg-password-input': 'input', 'cg-time-picker': '.trigger', 'cg-color-picker': '.trigger',
      'cg-date-time-picker': '.trigger', 'cg-date-range-picker': '.trigger', 'cg-split-button': '.primary',
    };
    const tags = Object.keys(FIELDS);
    const page = await open(tags, tags.map((t) => `<${t} label="Field"></${t}>`).join(''));
    const heights = await page.evaluate((fields) => Object.fromEntries(Object.entries(fields).map(([t, sel]) =>
      [t, document.querySelector(t)!.shadowRoot!.querySelector(sel)!.getBoundingClientRect().height])), FIELDS);
    expect(heights).toEqual(Object.fromEntries(tags.map((t) => [t, 36])));
    await page.close();
  });

  it('ghost-danger: variant="tertiary" type="danger" is red text on no fill (hover adds only the neutral overlay)', async () => {
    const page = await open(['cg-button'], '<cg-button id="g" variant="tertiary" type="danger">Delete contact…</cg-button>');
    const b = await box(page, '#g', '.btn');
    expect(b.bg).toBe('rgba(0, 0, 0, 0)');
    expect(b.color).toBe(await token(page, 'color', '--cg-color-status-error-text-default'));
    expect(b.border).toBe('rgba(0, 0, 0, 0)');
    await page.close();
  });

  it('cg-input: 36 px field, radius 8, the label above it (12 px, 6 px gap) and it names the field', async () => {
    const page = await open(['cg-input'], '<cg-input id="f" label="Name" placeholder="Comeback"></cg-input>');
    const wrap = await box(page, '#f', '.wrapper');
    const label = await box(page, '#f', '.label');
    expect(wrap.height).toBe(36);
    expect(wrap.radius).toBe('8px');
    expect(label.fontSize).toBe('12px');
    expect(Math.round(wrap.top - label.bottom)).toBe(6);
    expect(await page.evaluate(() => !!document.getElementById('f')!.shadowRoot!.querySelector('.floating-label'))).toBe(false);
    await expect(page.getByRole('textbox', { name: 'Name' }).count()).resolves.toBe(1);
    // The placeholder is visible (no floating label stands in for it).
    const ph = await page.evaluate(() => getComputedStyle(document.getElementById('f')!.shadowRoot!.querySelector('input')!, '::placeholder').color);
    expect(ph).not.toBe('rgba(0, 0, 0, 0)');
    // A click on the label focuses the field.
    await page.evaluate(() => (document.getElementById('f')!.shadowRoot!.querySelector('.label') as HTMLElement).click());
    expect(await page.evaluate(() => document.getElementById('f')!.shadowRoot!.activeElement?.tagName)).toBe('INPUT');
    expect(await axeViolations(page)).toEqual([]);
    await page.close();
  });

  it('cg-input label-position="floating" keeps the floating label inside the field', async () => {
    const page = await open(['cg-input'], '<cg-input id="f" label="Name" label-position="floating"></cg-input>');
    expect(await page.evaluate(() => {
      const root = document.getElementById('f')!.shadowRoot!;
      return { floating: !!root.querySelector('.floating-label'), top: !!root.querySelector('.label') };
    })).toEqual({ floating: true, top: false });
    // At 36 px (and lg 40 px) the floated label and the text both fit inside the field.
    for (const size of ['md', 'lg']) {
      await page.evaluate((size) => { const f = document.getElementById('f') as HTMLElement & { value: string; size: string }; f.value = 'Quinn'; f.size = size; }, size);
      await settleStyles(page);
      const fit = await page.evaluate(() => {
        const root = document.getElementById('f')!.shadowRoot!;
        const wrap = root.querySelector('.wrapper')!.getBoundingClientRect();
        const label = root.querySelector('.floating-label')!.getBoundingClientRect();
        const input = root.querySelector('input')!;
        const r = input.getBoundingClientRect();
        const text = r.bottom - parseFloat(getComputedStyle(input).paddingBottom);
        return { label: label.top >= wrap.top && label.bottom <= wrap.bottom, text: text <= wrap.bottom - 1, scroll: input.scrollHeight <= input.clientHeight };
      });
      expect(fit, size).toEqual({ label: true, text: true, scroll: true });
    }
    await page.close();
  });

  it('cg-button loading: the label hides but keeps its width; the spinner takes the variant text colour', async () => {
    const page = await open(['cg-button'], '<cg-button id="p">Save changes</cg-button><cg-button id="s" variant="secondary">Save changes</cg-button>');
    const before = await box(page, '#p', '.btn');
    await page.evaluate(() => { for (const b of document.querySelectorAll('cg-button')) b.setAttribute('loading', ''); });
    await settleStyles(page);
    const after = await box(page, '#p', '.btn');
    expect(after.width).toBe(before.width);
    const r = await page.evaluate(() => Array.from(document.querySelectorAll('cg-button'), (b) => ({
      slot: getComputedStyle(b.shadowRoot!.querySelector('slot:not([name])')!).visibility,
      spinner: getComputedStyle(b.shadowRoot!.querySelector('.spinner')!).borderTopColor,
    })));
    expect(r[0]).toEqual({ slot: 'hidden', spinner: await token(page, 'color', '--cg-color-action-primary-text-default') });
    expect(r[1]).toEqual({ slot: 'hidden', spinner: await token(page, 'color', '--cg-color-action-secondary-text-default') });
    // The label text itself is not painted.
    const textVisible = await page.evaluate(() => {
      return getComputedStyle(document.getElementById('p')!.shadowRoot!.querySelector('slot:not([name])')!).visibility !== 'hidden';
    });
    expect(textVisible).toBe(false);
    await page.close();
  });

  it('cg-textarea: the label sits above the field by default and names it; a toolbar slot sits above the text inside the border', async () => {
    const page = await open(['cg-textarea'], '<cg-textarea id="t" label="Body"><div slot="toolbar" id="tb">B I</div></cg-textarea>');
    const label = await box(page, '#t', '.label');
    const area = await box(page, '#t', 'textarea');
    expect(label.bottom).toBeLessThanOrEqual(area.top);
    expect(label.fontSize).toBe('12px');
    expect(area.radius).toBe('0px'); // the frame (.frame) carries the border and radius around toolbar + text
    const frame = await box(page, '#t', '.frame');
    expect(frame.radius).toBe('8px');
    const tb = await page.evaluate(() => document.getElementById('tb')!.getBoundingClientRect().toJSON());
    expect(tb.top).toBeGreaterThanOrEqual(frame.top);
    expect(tb.bottom).toBeLessThanOrEqual(area.top + 1);
    await expect(page.getByRole('textbox', { name: 'Body' }).count()).resolves.toBe(1);
    await page.close();
  });

  it('cg-select: 36 px trigger, radius 8; its menu is at least 200 px wide and options never wrap', async () => {
    const page = await open(['cg-select'], '<div style="width:120px"><cg-select id="s" label="Status"></cg-select></div>');
    await page.evaluate(() => {
      (document.getElementById('s') as HTMLElement & { options: unknown }).options = [
        { value: 'any', label: 'Any status' }, { value: 'w', label: 'Waiting for confirmation' }, { value: 'b', label: 'E-mail bounces' }];
    });
    await settleStyles(page);
    const trig = await box(page, '#s', '.trigger');
    expect(trig.height).toBe(36);
    expect(trig.radius).toBe('8px');
    await page.locator('#s .trigger').click();
    await settleStyles(page);
    const menu = await box(page, '#s', '.dropdown');
    expect(menu.width).toBeGreaterThanOrEqual(200);
    const lines = await page.evaluate(() => Array.from(document.getElementById('s')!.shadowRoot!.querySelectorAll('.option span'), (s) => {
      const r = document.createRange(); r.selectNodeContents(s); return r.getClientRects().length;
    }));
    expect(lines).toEqual([1, 1, 1]);
    await page.close();
  });

  it('cg-dropdown: the menu is at least 200 px wide, items stay on one line, and a danger item is red text', async () => {
    const page = await open(['cg-dropdown', 'cg-button'], `
      <cg-dropdown id="d"><cg-button slot="trigger" size="sm">⋯</cg-button></cg-dropdown>`);
    await page.evaluate(() => {
      (document.getElementById('d') as HTMLElement & { items: unknown }).items = [
        { id: 'copy', label: 'Copy e-mail address of this contact' },
        { id: 'delete', label: 'Delete contact…', danger: true }];
    });
    await settleStyles(page);
    await page.locator('#d cg-button').click();
    await settleStyles(page);
    const r = await page.evaluate(() => {
      const root = document.getElementById('d')!.shadowRoot!;
      const items = Array.from(root.querySelectorAll<HTMLElement>('[role="menuitem"]'));
      const lines = items.map((s) => { const r = document.createRange(); r.selectNodeContents(s); return Math.max(...Array.from(r.getClientRects(), (c) => Math.round(c.top))) === Math.min(...Array.from(r.getClientRects(), (c) => Math.round(c.top))); });
      return { width: root.querySelector<HTMLElement>('[role="menu"]')!.getBoundingClientRect().width, lines, danger: getComputedStyle(items[1]!).color, normal: getComputedStyle(items[0]!).color };
    });
    expect(r.width).toBeGreaterThanOrEqual(200);
    expect(r.lines).toEqual([true, true]);
    expect(r.danger).toBe(await token(page, 'color', '--cg-color-status-error-text-default'));
    expect(r.normal).not.toBe(r.danger);
    await page.close();
  });

  it('native controls inside components inherit the component font (no 13.33 px browser default)', async () => {
    const page = await open(['cg-button', 'cg-checkbox', 'cg-input', 'cg-pagination', 'cg-segmented-control', 'cg-sidebar', 'cg-modal', 'cg-drawer', 'cg-toaster', 'cg-tabs', 'cg-switch'], `
      <cg-button>Save</cg-button><cg-checkbox label="Agree"></cg-checkbox><cg-input label="E-mail" clearable value="a"></cg-input>
      <cg-pagination total="5" current="2"></cg-pagination><cg-segmented-control label="P"></cg-segmented-control>
      <cg-sidebar></cg-sidebar><cg-modal open heading="Delete?">x</cg-modal><cg-drawer></cg-drawer><cg-toaster></cg-toaster><cg-switch label="On"></cg-switch>`);
    await page.evaluate(() => { (document.querySelector('cg-segmented-control') as HTMLElement & { options: unknown }).options = [{ value: 'a', label: 'A' }, { value: 'b', label: 'B' }]; });
    await settleStyles(page);
    const off = await page.evaluate(() => {
      const bad: string[] = [];
      const walk = (root: ParentNode, host: string) => {
        for (const el of Array.from(root.querySelectorAll('*'))) {
          if (el.shadowRoot) walk(el.shadowRoot, el.tagName.toLowerCase());
          if (/^(BUTTON|INPUT|SELECT|TEXTAREA)$/.test(el.tagName) && root !== document) {
            const s = getComputedStyle(el);
            if (!s.fontFamily.includes('Inter') && !s.fontFamily.includes('Georgia') && !s.fontFamily.includes('system-ui') && !s.fontFamily.includes('sans-serif')) bad.push(`${host} ${el.tagName} family ${s.fontFamily}`);
            if (s.fontSize === '13.3333px') bad.push(`${host} ${el.tagName} 13.33px`);
          }
        }
      };
      walk(document, '');
      return bad;
    });
    expect(off).toEqual([]);
    await page.close();
  });

  it('an invalid field is styled in place on submit: no native bubble (invalid is cancelled), the message under the field, the first invalid field focused; fixing it clears the error', async () => {
    const page = await open(['cg-input', 'cg-select', 'cg-textarea', 'cg-button'], `
      <form id="form">
        <cg-input id="a" name="a" label="Name" required></cg-input>
        <cg-input id="b" name="b" label="E-mail" type="email" required></cg-input>
        <cg-select id="c" name="c" label="Status" required></cg-select>
        <cg-textarea id="d" name="d" label="Body" required></cg-textarea>
        <cg-button id="go" type="submit">Save</cg-button>
      </form>`);
    await page.evaluate(() => {
      (document.getElementById('c') as HTMLElement & { options: unknown }).options = [{ value: 'x', label: 'X' }];
      (window as unknown as { log: string[] }).log = [];
      for (const id of ['a', 'b', 'c', 'd']) document.getElementById(id)!.addEventListener('invalid', (e) => (window as unknown as { log: string[] }).log.push(`${id}:${e.defaultPrevented}`));
      document.getElementById('form')!.addEventListener('submit', (e) => { e.preventDefault(); (window as unknown as { log: string[] }).log.push('submit'); });
    });
    await page.locator('#go').click();
    await settleStyles(page);
    expect(await page.evaluate(() => (window as unknown as { log: string[] }).log)).toEqual(['a:true', 'b:true', 'c:true', 'd:true']);
    const state = await page.evaluate(() => ['a', 'b', 'c', 'd'].map((id) => {
      const host = document.getElementById(id)!;
      const msg = host.shadowRoot!.querySelector('.helper')?.textContent?.trim() ?? '';
      return { id, msg: msg.length > 0, matches: msg === (host as unknown as { validationMessage: string }).validationMessage, invalid: host.hasAttribute('data-invalid') };
    }));
    for (const s of state) expect(s, s.id).toEqual({ id: s.id, msg: true, matches: true, invalid: true });
    expect(await page.evaluate(() => document.activeElement?.id)).toBe('a');
    // The error border (#a has focus, so it shows the focused error border).
    expect((await box(page, '#b', '.wrapper')).border).toBe(await token(page, 'borderTopColor', '--cg-color-input-border-error'));
    expect((await box(page, '#a', '.wrapper')).border).toBe(await token(page, 'borderTopColor', '--cg-color-status-error-text-default'));
    await expect(page.getByRole('textbox', { name: 'Name' }).getAttribute('aria-invalid')).resolves.toBe('true');
    await expect(page.getByRole('textbox', { name: 'Name' }).getAttribute('aria-describedby')).resolves.toBe('helper');
    // Typing a value clears that field's error.
    await page.keyboard.type('Quinn');
    await settleStyles(page);
    expect(await page.evaluate(() => [document.getElementById('a')!.hasAttribute('data-invalid'), document.getElementById('a')!.shadowRoot!.querySelector('.helper')?.textContent ?? ''])).toEqual([false, '']);
    expect(await axeViolations(page)).toEqual([]);
    await page.close();
  });
});
