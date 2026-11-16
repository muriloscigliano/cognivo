// @vitest-environment node
/**
 * cg-input type="date": a native date control inside the field, so the
 * browser's date picker, keyboard entry and min/max validation apply, and
 * the ISO value (YYYY-MM-DD) reaches FormData.
 */
import { describe, it, expect, afterAll } from 'vitest';
import { browserAvailable, openPage, closeBrowser, settle } from './harness.js';

const TAGS = ['cg-input', 'cg-button'];
const MODULES = ['utils/validation.ts'];

type Field = HTMLElement & { value: string; min: string; max: string; validity: ValidityState; validationMessage: string; checkValidity(): boolean };

describe.skipIf(!browserAvailable)('cg-input type="date" (real browser)', { timeout: 30_000 }, () => {
  afterAll(closeBrowser);

  it('renders a native date control with min/max, named by its label, with the label kept floated', async () => {
    const page = await openPage(TAGS, `<cg-input type="date" label="Close date" min="2026-01-01" max="2026-12-31"></cg-input>`);
    const info = await page.evaluate(() => {
      const root = document.querySelector('cg-input')!.shadowRoot!;
      const input = root.querySelector('input')!;
      return { type: input.type, min: input.min, max: input.max, floated: root.querySelector('.field')!.classList.contains('floated') };
    });
    expect(info).toEqual({ type: 'date', min: '2026-01-01', max: '2026-12-31', floated: true });
    await expect(page.getByLabel('Close date').count()).resolves.toBe(1);
    await page.close();
  });

  it('is form-associated: the ISO value reaches FormData; typing it works', async () => {
    const page = await openPage(TAGS, `<form id="f"><cg-input type="date" name="close" label="Close date"></cg-input></form>`);
    await page.getByLabel('Close date').fill('2026-03-15');
    await settle(page);
    const data = await page.evaluate(() => ({
      value: (document.querySelector('cg-input') as Field).value,
      form: Object.fromEntries(new FormData(document.getElementById('f') as HTMLFormElement)),
    }));
    expect(data).toEqual({ value: '2026-03-15', form: { close: '2026-03-15' } });
    await page.close();
  });

  it('min/max validate natively (rangeUnderflow / rangeOverflow block the form) with page-wide messages', async () => {
    const page = await openPage(TAGS, `
      <form id="f">
        <cg-input type="date" name="close" label="Close date" min="2026-01-01" max="2026-12-31"></cg-input>
        <cg-button type="submit">Save</cg-button>
      </form>`, MODULES);
    await page.evaluate(() => {
      (window as unknown as { __cg: { setValidationMessages: (m: unknown) => void } }).__cg.setValidationMessages({
        rangeUnderflow: 'A data é anterior ao início do ano',
        rangeOverflow: 'A data é posterior ao fim do ano',
      });
      (window as unknown as { __submits: number }).__submits = 0;
      document.getElementById('f')!.addEventListener('submit', (e) => { e.preventDefault(); (window as unknown as { __submits: number }).__submits++; });
    });
    const state = async (value: string) => {
      await page.evaluate((v) => { (document.querySelector('cg-input') as Field).value = v; }, value);
      await settle(page);
      return page.evaluate(() => {
        const el = document.querySelector('cg-input') as Field;
        return { under: el.validity.rangeUnderflow, over: el.validity.rangeOverflow, message: el.validationMessage, form: (document.getElementById('f') as HTMLFormElement).checkValidity() };
      });
    };
    expect(await state('2025-12-31')).toEqual({ under: true, over: false, message: 'A data é anterior ao início do ano', form: false });
    expect(await state('2027-01-01')).toEqual({ under: false, over: true, message: 'A data é posterior ao fim do ano', form: false });
    await page.getByRole('button', { name: 'Save' }).click();
    expect(await page.evaluate(() => (window as unknown as { __submits: number }).__submits)).toBe(0);
    expect(await state('2026-06-30')).toEqual({ under: false, over: false, message: '', form: true });
    await page.getByRole('button', { name: 'Save' }).click();
    expect(await page.evaluate(() => (window as unknown as { __submits: number }).__submits)).toBe(1);
    await page.close();
  });

  it('a date range is two fields whose min/max follow each other', async () => {
    const page = await openPage(TAGS, `
      <form id="f">
        <cg-input id="from" type="date" name="from" label="From"></cg-input>
        <cg-input id="to" type="date" name="to" label="To"></cg-input>
      </form>`);
    // The documented pattern (README): link the pair on cg-input.
    await page.evaluate(() => {
      const from = document.getElementById('from') as Field;
      const to = document.getElementById('to') as Field;
      from.addEventListener('cg-input', () => { to.min = from.value; });
      to.addEventListener('cg-input', () => { from.max = to.value; });
    });
    await page.getByLabel('From').fill('2026-05-10');
    await page.getByLabel('To').fill('2026-05-01');
    await settle(page);
    const r = await page.evaluate(() => ({
      toUnder: (document.getElementById('to') as Field).validity.rangeUnderflow,
      form: (document.getElementById('f') as HTMLFormElement).checkValidity(),
    }));
    expect(r).toEqual({ toUnder: true, form: false });
    await page.close();
  });
});
