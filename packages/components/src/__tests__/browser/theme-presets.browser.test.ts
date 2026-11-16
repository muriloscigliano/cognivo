// @vitest-environment node
/**
 * Theme presets (design direction, 2026-11-16): the primary fill is a theme
 * decision, and selection is neutral.
 *
 * - Default preset (`@cognivo/tokens`): unchanged look — the primary fill is
 *   the brand lime; selected days, the active tab, the current step and the
 *   current page keep their accent.
 * - Neutral preset (`@cognivo/tokens/themes/neutral.css`, loaded after the
 *   tokens): primary is near-black with white text (dark: white with
 *   near-black text), its hover / pressed one and two grey steps away; every
 *   selected / current state uses the state tokens (`state-selected`,
 *   `state-text`, `state-hover`).
 * - Both presets, both themes: no accent colour in any hover or focus state
 *   of any `cg-*` component.
 *
 * Every assertion reads computed styles in real Chromium.
 */
import { describe, it, expect, afterAll } from 'vitest';
import { readdirSync } from 'node:fs';
import { resolve } from 'node:path';
import type { Page } from '@playwright/test';
import { browserAvailable, openPage, closeBrowser, settleStyles } from './harness.js';

const TOKENS = resolve(__dirname, '..', '..', '..', '..', 'tokens', 'dist');
const TOKENS_CSS = resolve(TOKENS, 'index.css');
const NEUTRAL_CSS = resolve(TOKENS, 'themes', 'neutral.css');

type Preset = 'default' | 'neutral';
type Theme = 'light' | 'dark';

const TAGS = ['cg-button', 'cg-switch', 'cg-checkbox', 'cg-progress-bar', 'cg-slider', 'cg-calendar', 'cg-tabs', 'cg-steps',
  'cg-pagination', 'cg-time-picker', 'cg-toggle', 'cg-input'];
/** Dates in the month the calendar opens on (the current one); the selected day is never today. */
const now = new Date();
const ym = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
const SELECTED = `${ym}-${now.getDate() === 12 ? 13 : 12}`;
const BODY = `
  <div style="padding: 24px; display: grid; gap: 16px; justify-items: start">
    <cg-button id="primary">Save</cg-button>
    <cg-switch id="switch" label="On"></cg-switch>
    <cg-checkbox id="checkbox" label="Agree"></cg-checkbox>
    <cg-progress-bar id="progress" label="Setup" value="40"></cg-progress-bar>
    <cg-slider id="slider" label="Volume"></cg-slider>
    <cg-calendar id="single" value="${SELECTED}"></cg-calendar>
    <cg-calendar id="range" mode="range" value="${ym}-10" range-end="${ym}-14"></cg-calendar>
    <cg-tabs id="tabs"></cg-tabs>
    <cg-steps id="steps"></cg-steps>
    <cg-pagination id="pages" total="5" current="2"></cg-pagination>
    <cg-time-picker id="time" label="Time" value="09:30"></cg-time-picker>
    <cg-toggle id="toggle" variant="outline" pressed label="Bold"></cg-toggle>
    <cg-input id="input" label="Name"></cg-input>
  </div>`;

async function open(preset: Preset, theme: Theme): Promise<Page> {
  const page = await openPage(TAGS, BODY);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.addStyleTag({ path: TOKENS_CSS });
  if (preset === 'neutral') await page.addStyleTag({ path: NEUTRAL_CSS });
  await page.evaluate((theme) => {
    if (theme === 'dark') document.documentElement.setAttribute('data-theme', 'dark');
    Object.assign(document.getElementById('switch')!, { checked: true });
    Object.assign(document.getElementById('checkbox')!, { checked: true });
    Object.assign(document.getElementById('tabs')!, {
      tabs: [{ value: 'all', label: 'All', count: 4 }, { value: 'open', label: 'Open' }],
      value: 'all',
    });
    Object.assign(document.getElementById('steps')!, {
      clickable: true,
      items: [{ title: 'Domain', status: 'done' }, { title: 'Provider', status: 'active' }, { title: 'Form', status: 'pending' }],
    });
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

const tokens = (page: Page, names: string[]) => Promise.all(names.map((n) => token(page, n)));

/** Computed style of an element reached by a JS expression (shadow roots allowed). */
const style = (page: Page, js: string, props: string[]) =>
  page.evaluate(({ js, props }) => {
    const el = new Function(`return ${js}`)() as Element;
    const cs = getComputedStyle(el);
    return Object.fromEntries(props.map((p) => [p, cs.getPropertyValue(p)]));
  }, { js, props });

const IN = (id: string, sel: string) => `document.getElementById('${id}').shadowRoot.querySelector('${sel}')`;

/** Neutral: a grey (channels within a small spread), at any alpha — never lime or green. */
function neutral(color: string): boolean {
  const [r, g, b] = color.match(/[\d.]+/g)!.map(Number);
  return Math.max(r!, g!, b!) - Math.min(r!, g!, b!) <= 12;
}

describe.skipIf(!browserAvailable)('theme presets (real browser)', { timeout: 60_000 }, () => {
  afterAll(closeBrowser);

  for (const theme of ['light', 'dark'] as const) {
    describe(theme, () => {
      it('default preset: the primary fill is still the brand lime (existing users see no change)', async () => {
        const page = await open('default', theme);
        const [lime, bg, fg] = await tokens(page, ['--cg-brand-primary-500', '--cg-color-action-primary-background-default', '--cg-color-action-primary-text-default']);
        expect(bg).toBe(lime);
        expect(neutral(bg), bg).toBe(false);
        expect(await style(page, IN('primary', '.btn'), ['background-color', 'color'])).toEqual({ 'background-color': bg, color: fg });
        await page.close();
      });

      it('neutral preset: primary is near-black with white text (dark: white with near-black text); hover and pressed are grey steps', async () => {
        const page = await open('neutral', theme);
        const [bg, fg, hover, pressed] = await tokens(page, ['--cg-color-action-primary-background-default', '--cg-color-action-primary-text-default',
          '--cg-color-action-primary-background-hover', '--cg-color-action-primary-background-active']);
        const expected = theme === 'light'
          ? ['--cg-gray-950', '--cg-gray-white', '--cg-gray-800', '--cg-gray-700']
          : ['--cg-gray-white', '--cg-gray-950', '--cg-gray-200', '--cg-gray-300'];
        expect([bg, fg, hover, pressed]).toEqual(await tokens(page, expected));
        await page.close();
      });

      for (const preset of ['default', 'neutral'] as const) {
        describe(`${preset} preset`, () => {
          it('cg-button primary: resting = primary bg/fg, hover = primary bg-hover, pressed = primary pressed, no overlay on top', async () => {
            const page = await open(preset, theme);
            const [bg, fg, hover, pressed] = await tokens(page, ['--cg-color-action-primary-background-default', '--cg-color-action-primary-text-default',
              '--cg-color-action-primary-background-hover', '--cg-color-action-primary-background-active']);
            expect(await style(page, IN('primary', '.btn'), ['background-color', 'color'])).toEqual({ 'background-color': bg, color: fg });
            await page.locator('#primary').hover();
            await settleStyles(page);
            expect(await style(page, IN('primary', '.btn'), ['background-color', 'background-image'])).toEqual({ 'background-color': hover, 'background-image': 'none' });
            await page.mouse.down();
            await settleStyles(page);
            expect(await style(page, IN('primary', '.btn'), ['background-color', 'background-image'])).toEqual({ 'background-color': pressed, 'background-image': 'none' });
            await page.mouse.up();
            await page.close();
          });

          it('the other primary fills (switch on, checkbox checked, progress, slider) follow the primary token', async () => {
            const page = await open(preset, theme);
            const [bg] = await tokens(page, ['--cg-color-action-primary-background-default']);
            for (const js of [IN('switch', '.track.checked'), IN('checkbox', '.box.checked'), IN('progress', '.fill'), IN('slider', '.track-fill')]) {
              expect((await style(page, js, ['background-color']))['background-color'], js).toBe(bg);
            }
            await page.close();
          });

          it('selection tokens: accent in the default preset, the state tokens in the neutral preset', async () => {
            const page = await open(preset, theme);
            const actual = await tokens(page, ['--cg-color-selected-background', '--cg-color-selected-text', '--cg-color-selected-subtle',
              '--cg-color-current-indicator', '--cg-color-current-text']);
            const expected = await tokens(page, preset === 'default'
              ? ['--cg-color-action-primary-background-default', '--cg-color-action-primary-text-default', '--cg-overlay-accent-light',
                  '--cg-color-action-primary-border-default', '--cg-color-accent-text']
              : ['--cg-color-action-primary-background-default', '--cg-color-action-primary-text-default', '--cg-color-state-selected',
                  '--cg-color-state-text', '--cg-color-state-text']);
            expect(actual).toEqual(expected);
            if (preset === 'neutral') for (const v of actual) expect(neutral(v), v).toBe(true);
            await page.close();
          });

          if (preset === 'neutral') {
            it('neutral calendar: a selected day / range end is solid primary (opaque), in-range days an opaque grey distinct from hover, today a ring only; hover never replaces a selection', async () => {
              const page = await open(preset, theme);
              const [primary, onPrimary, hover] = await tokens(page, ['--cg-color-action-primary-background-default', '--cg-color-action-primary-text-default', '--cg-color-state-hover']);
              const opaque = (c: string) => c.startsWith('rgb(');
              const day = await style(page, IN('single', '.day.selected'), ['background-color', 'color']);
              expect(day).toEqual({ 'background-color': primary, color: onPrimary });
              expect(opaque(primary), primary).toBe(true);
              const inRange = (await style(page, IN('range', '.day.in-range'), ['background-color']))['background-color']!;
              expect(opaque(inRange), inRange).toBe(true);
              expect(inRange).not.toBe(hover);
              const today = await style(page, IN('single', '.day.today:not(.selected)'), ['background-color', 'box-shadow']);
              expect(today['background-color']).toBe('rgba(0, 0, 0, 0)');
              expect(today['box-shadow']).not.toBe('none');
              for (const [id, sel] of [['single', '.day.selected'], ['range', '.day.range-start'], ['range', '.day.range-end']] as const) {
                await page.locator(`#${id}`).locator(sel).hover();
                await settleStyles(page);
                expect((await style(page, IN(id, sel), ['background-color']))['background-color'], `${id} ${sel} hovered`).toBe(primary);
              }
              await page.close();
            });
          }

          it('calendar: the selected day, range ends and in-range days, and today use the selection tokens', async () => {
            const page = await open(preset, theme);
            const [sel, selText, subtle, indicator, current] = await tokens(page, ['--cg-color-selected-background', '--cg-color-selected-text',
              '--cg-color-selected-subtle', '--cg-color-current-indicator', '--cg-color-current-text']);
            expect(await style(page, IN('single', '.day.selected'), ['background-color', 'color'])).toEqual({ 'background-color': sel, color: selText });
            for (const end of ['.day.range-start', '.day.range-end']) {
              expect(await style(page, IN('range', end), ['background-color', 'color']), end).toEqual({ 'background-color': sel, color: selText });
            }
            expect((await style(page, IN('range', '.day.in-range'), ['background-color']))['background-color']).toBe(subtle);
            const today = await style(page, IN('single', '.day.today:not(.selected)'), ['color', 'box-shadow']);
            expect(today.color).toBe(current);
            expect(today['box-shadow']).toContain(indicator);
            await page.close();
          });

          it('tabs: the active label, its count and the underline use the current / selected tokens', async () => {
            const page = await open(preset, theme);
            const [subtle, indicator, current] = await tokens(page, ['--cg-color-selected-subtle', '--cg-color-current-indicator', '--cg-color-current-text']);
            expect((await style(page, IN('tabs', '.tab.active'), ['color'])).color).toBe(current);
            expect(await style(page, IN('tabs', '.tab.active .tab-count'), ['background-color', 'color'])).toEqual({ 'background-color': subtle, color: current });
            expect((await style(page, IN('tabs', '.indicator'), ['background-color']))['background-color']).toBe(indicator);
            await page.close();
          });

          it('steps: the current step circle and title use the selection tokens', async () => {
            const page = await open(preset, theme);
            const [sel, selText, indicator, current] = await tokens(page, ['--cg-color-selected-background', '--cg-color-selected-text',
              '--cg-color-current-indicator', '--cg-color-current-text']);
            expect(await style(page, IN('steps', '.circle.active'), ['background-color', 'color', 'border-top-color']))
              .toEqual({ 'background-color': sel, color: selText, 'border-top-color': indicator });
            expect((await style(page, IN('steps', '.title.active'), ['color'])).color).toBe(current);
            await page.close();
          });

          it('pagination, time picker and a pressed outline toggle use the selection tokens', async () => {
            const page = await open(preset, theme);
            const [sel, selText, indicator, current] = await tokens(page, ['--cg-color-selected-background', '--cg-color-selected-text',
              '--cg-color-current-indicator', '--cg-color-current-text']);
            expect(await style(page, IN('pages', '.page-btn.active'), ['background-color', 'color'])).toEqual({ 'background-color': sel, color: selText });
            await page.locator('#time').locator('.trigger').click();
            await settleStyles(page);
            expect(await style(page, IN('time', '.time-option.selected'), ['background-color', 'color'])).toEqual({ 'background-color': sel, color: selText });
            expect(await style(page, IN('toggle', 'button'), ['color', 'border-top-color'])).toEqual({ color: current, 'border-top-color': indicator });
            await page.close();
          });

          it('input: hover darkens the border one neutral step (never accent)', async () => {
            const page = await open(preset, theme);
            const [hover] = await tokens(page, ['--cg-color-input-border-hover']);
            expect(neutral(hover), hover).toBe(true);
            await page.locator('#input').hover();
            await settleStyles(page);
            expect((await style(page, IN('input', '.wrapper'), ['border-top-color']))['border-top-color']).toBe(hover);
            await page.close();
          });

          it(`no cg-* component paints an accent colour (colour, shadow or outline token) in a hover, focus or keyboard-highlight rule${preset === 'neutral' ? ', nor in a selected / active / open / current / expanded state' : ''}`, async () => {
            const cg = readdirSync(resolve(__dirname, '..', '..', 'components')).filter((d) => d.startsWith('cg-'));
            const page = await openPage(cg, '');
            await page.addStyleTag({ path: TOKENS_CSS });
            if (preset === 'neutral') await page.addStyleTag({ path: NEUTRAL_CSS });
            if (theme === 'dark') await page.evaluate(() => document.documentElement.setAttribute('data-theme', 'dark'));
            const offenders = await page.evaluate(({ tags, neutralPreset }) => {
              // Allowed: status colours (error / success fields), and an element that is primary / checked / selected / current
              // keeping its own colour or stepping it on hover — that is not an accent added by the state. In the neutral
              // preset the selection and primary tokens are themselves neutral, so the selected states are checked too.
              const OWN = /^--cg-(color-status-|shadow-focus-(error|success)$|color-action-primary-background-(hover|active)$|color-checkbox-background-hover$|color-slider-thumb-hover$|color-selected-|color-current-)/;
              const STATE = neutralPreset
                ? /:hover|:focus|\[data-active\]|\.option\.active|\.selected|\.active|\.open\b|\[aria-current|\[aria-selected="?true|\[aria-expanded="?true/
                : /:hover|:focus|\[data-active\]|\.option\.active/;
              const probe = document.createElement('div');
              document.body.append(probe);
              /** Every colour a token paints: a colour token, or the colours inside a shadow / outline / gradient token. */
              const colours = (name: string): string[] => {
                probe.style.setProperty('--probe', `var(${name})`);
                const text = getComputedStyle(probe).getPropertyValue('--probe');
                const found = text.match(/#[0-9a-f]{3,8}\b|(?:rgba?|hsla?|oklch|oklab|color-mix)\((?:[^()]|\([^()]*\))*\)/gi) ?? [];
                return found.map((c) => {
                  probe.style.backgroundColor = '';
                  probe.style.backgroundColor = c;
                  return getComputedStyle(probe).backgroundColor;
                });
              };
              const isNeutral = (c: string) => {
                const [r, g, b, a = 1] = c.match(/[\d.]+/g)!.map(Number);
                return a === 0 || Math.max(r!, g!, b!) - Math.min(r!, g!, b!) <= 12;
              };
              const out: string[] = [];
              const visit = (rules: CSSRuleList, tag: string) => {
                for (const r of Array.from(rules)) {
                  if (r instanceof CSSMediaRule || r instanceof CSSSupportsRule) visit(r.cssRules, tag);
                  else if (r instanceof CSSStyleRule && STATE.test(r.selectorText)) {
                    const body = r.cssText.slice(r.cssText.indexOf('{'));
                    for (const [, name] of body.matchAll(/var\((--cg-[\w-]+)/g)) {
                      if (!neutralPreset && OWN.test(name!)) continue;
                      if (neutralPreset && /^--cg-(color-status-|shadow-focus-(error|success)$)/.test(name!)) continue;
                      for (const c of colours(name!)) if (!isNeutral(c)) out.push(`${tag} ${r.selectorText} → ${name} = ${c}`);
                    }
                  }
                }
              };
              for (const tag of tags) {
                const styles = (customElements.get(tag) as unknown as { elementStyles?: Array<CSSStyleSheet | { styleSheet?: CSSStyleSheet }> }).elementStyles ?? [];
                for (const s of styles) {
                  const sheet = s instanceof CSSStyleSheet ? s : s.styleSheet;
                  if (sheet) visit(sheet.cssRules, tag);
                }
              }
              probe.remove();
              return [...new Set(out)];
            }, { tags: cg, neutralPreset: preset === 'neutral' });
            expect(offenders).toEqual([]);
            await page.close();
          });
        });
      }
    });
  }
});
