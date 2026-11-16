// @vitest-environment node
/**
 * Issue: `cg-input type="email"` accepted "not-an-email" (only valueMissing
 * was ever reported), and every validation text was hard-coded English
 * ("This field is required") inside the components.
 */
import { describe, it, expect, afterAll } from 'vitest';
import { browserAvailable, openPage, closeBrowser, settle } from './harness.js';

const TAGS = ['cg-input', 'cg-checkbox', 'cg-select', 'cg-textarea', 'cg-radio'];
const MODULES = ['utils/validation.ts', 'locales/pt-BR.ts'];

type Field = HTMLElement & { value: string; validity: ValidityState; validationMessage: string; checkValidity(): boolean };

describe.skipIf(!browserAvailable)('validation (real browser)', { timeout: 30_000 }, () => {
  afterAll(closeBrowser);

  it('type="email" and type="url" validate natively (typeMismatch blocks the form)', async () => {
    const page = await openPage(TAGS, `
      <form id="f">
        <cg-input id="email" name="email" type="email" label="E-mail"></cg-input>
        <cg-input id="url" name="site" type="url" label="Site"></cg-input>
      </form>`, MODULES);
    await page.locator('#email input').fill('not-an-email');
    await page.locator('#url input').fill('not a url');
    await settle(page);
    const bad = await page.evaluate(() => ({
      email: (document.getElementById('email') as Field).validity.typeMismatch,
      url: (document.getElementById('url') as Field).validity.typeMismatch,
      form: (document.getElementById('f') as HTMLFormElement).checkValidity(),
    }));
    expect(bad).toEqual({ email: true, url: true, form: false });

    await page.locator('#email input').fill('ana@example.com');
    await page.locator('#url input').fill('https://example.com');
    await settle(page);
    expect(await page.evaluate(() => (document.getElementById('f') as HTMLFormElement).checkValidity())).toBe(true);
    await page.close();
  });

  it('default messages are the browser\'s own (localised) messages, not component strings', async () => {
    const page = await openPage(TAGS, `
      <cg-input id="req" required label="Name"></cg-input>
      <cg-input id="email" type="email" label="E-mail"></cg-input>
      <cg-checkbox id="cb" required label="Consent"></cg-checkbox>
      <cg-select id="sel" required label="Pick"></cg-select>
      <cg-textarea id="ta" required label="Bio"></cg-textarea>
      <input id="n-req" required><input id="n-email" type="email" value="x"><input id="n-cb" type="checkbox" required><select id="n-sel" required></select>`, MODULES);
    await page.locator('#email input').fill('x');
    await settle(page);
    const msgs = await page.evaluate(() => {
      const m = (id: string) => (document.getElementById(id) as unknown as Field).validationMessage;
      return {
        req: [m('req'), m('n-req')],
        email: [m('email'), m('n-email')],
        cb: [m('cb'), m('n-cb')],
        sel: [m('sel'), m('n-sel')],
        ta: [m('ta'), m('n-req')],
      };
    });
    for (const [name, [ours, native]] of Object.entries(msgs)) {
      expect(native, name).not.toBe('');
      expect(ours, name).toBe(native);
    }
    await page.close();
  });

  it('messages are translatable per element (validation-messages attribute) and page-wide (setValidationMessages)', async () => {
    const page = await openPage(TAGS, `
      <cg-input id="email" type="email" required label="E-mail"
        validation-messages='{"valueMissing":"Informe seu e-mail","typeMismatch":"E-mail inválido"}'></cg-input>
      <cg-checkbox id="cb" required label="Aceito"></cg-checkbox>`, MODULES);
    const empty = await page.evaluate(() => (document.getElementById('email') as Field).validationMessage);
    await page.locator('#email input').fill('nope');
    await settle(page);
    const mismatch = await page.evaluate(() => (document.getElementById('email') as Field).validationMessage);
    const pageWide = await page.evaluate(async () => {
      (window as unknown as { __cg: { setValidationMessages(m: Record<string, string>): void } }).__cg
        .setValidationMessages({ valueMissingCheckbox: 'Marque para continuar' });
      const cb = document.getElementById('cb') as Field & { required: boolean; updateComplete: Promise<unknown> };
      cb.required = false; await cb.updateComplete; cb.required = true; await cb.updateComplete;
      return cb.validationMessage;
    });
    expect({ empty, mismatch, pageWide }).toEqual({
      empty: 'Informe seu e-mail',
      mismatch: 'E-mail inválido',
      pageWide: 'Marque para continuar',
    });
    await page.close();
  });

  it('a page-wide (pt-BR) valueMissing is for text fields: checkbox, radio and select keep a message of their own kind', async () => {
    const page = await openPage(TAGS, `
      <cg-input id="t" required label="Nome"></cg-input>
      <cg-checkbox id="cb" required label="Aceito"></cg-checkbox>
      <cg-radio id="r" name="r" value="a" required label="A"></cg-radio>
      <cg-select id="s" required label="Estado"></cg-select>
      <cg-checkbox id="own" required label="Termos" validation-messages='{"valueMissing":"Aceite os termos"}'></cg-checkbox>`, MODULES);
    type Cg = { setValidationMessages(m: Record<string, string>): void; ptBRValidation: Record<string, string> };
    const refresh = async () => {
      for (const id of ['t', 'cb', 'r', 's', 'own']) {
        const el = document.getElementById(id) as HTMLElement & { required: boolean; updateComplete: Promise<unknown> };
        el.required = false; await el.updateComplete; el.required = true; await el.updateComplete;
      }
    };
    const read = () => Object.fromEntries(['t', 'cb', 'r', 's', 'own'].map((id) => [id, (document.getElementById(id) as unknown as Field).validationMessage]));
    const native = await page.evaluate(read);

    // An app's generic page-wide message: text fields only; the others keep the browser's own.
    const generic = await page.evaluate(async ({ refreshSrc, readSrc }) => {
      (window as unknown as { __cg: Cg }).__cg.setValidationMessages({ valueMissing: 'Campo obrigatório' });
      await (0, eval)(refreshSrc)();
      return (0, eval)(readSrc)();
    }, { refreshSrc: `(${refresh.toString()})`, readSrc: `(${read.toString()})` });
    expect(generic).toEqual({ t: 'Campo obrigatório', cb: native.cb, r: native.r, s: native.s, own: 'Aceite os termos' });

    // The pt-BR locale: a message of each control's own kind.
    const ptBR = await page.evaluate(async ({ refreshSrc, readSrc }) => {
      const cg = (window as unknown as { __cg: Cg }).__cg;
      cg.setValidationMessages(cg.ptBRValidation);
      await (0, eval)(refreshSrc)();
      return { got: (0, eval)(readSrc)(), want: cg.ptBRValidation };
    }, { refreshSrc: `(${refresh.toString()})`, readSrc: `(${read.toString()})` });
    expect(ptBR.got).toEqual({
      t: ptBR.want.valueMissing,
      cb: ptBR.want.valueMissingCheckbox,
      r: ptBR.want.valueMissingRadio,
      s: ptBR.want.valueMissingSelect,
      own: 'Aceite os termos',
    });
    expect(new Set([ptBR.got.t, ptBR.got.cb, ptBR.got.r, ptBR.got.s]).size).toBe(4);
    await page.close();
  });
});
