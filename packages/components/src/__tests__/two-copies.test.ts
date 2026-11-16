import { describe, it, expect, vi, afterEach } from 'vitest';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { defineElement } from '../utils/define.js';
import { VERSION } from '../utils/version.js';

/**
 * Two copies of @cognivo/components on one page (an embed bundle + the host
 * app). Registration is first-wins, so the elements on the page run the FIRST
 * copy's code — but `setMessages()` / `setValidationMessages()` called through
 * the SECOND copy wrote into that copy's private module maps, which the
 * running elements never read: translations silently did nothing. The
 * page-wide maps now live on `globalThis` under `Symbol.for` keys, shared by
 * every copy.
 */
const VERSION_KEY = Symbol.for('cognivo.version');

/** A fresh, independent module instance — what a second bundle would carry. */
async function secondCopy<T>(path: string): Promise<T> {
  vi.resetModules();
  return (await import(path)) as T;
}

type ValidationModule = typeof import('../utils/validation.js');
type MessagesModule = typeof import('../utils/messages.js');

describe('two copies of the package on one page', () => {
  afterEach(async () => {
    (await import('../utils/messages.js')).clearMessages();
  });

  it('validation messages set through one copy are read by the other', async () => {
    const a = await secondCopy<ValidationModule>('../utils/validation.js');
    const b = await secondCopy<ValidationModule>('../utils/validation.js');
    expect(a).not.toBe(b);
    b.setValidationMessages({ typeMismatch: 'E-mail inválido' });
    expect(a.messageFor('typeMismatch', null, 'native')).toBe('E-mail inválido');
  });

  it('interface messages set through one copy reach elements of the other (and re-render them)', async () => {
    const a = await secondCopy<MessagesModule>('../utils/messages.js');
    const b = await secondCopy<MessagesModule>('../utils/messages.js');
    expect(a).not.toBe(b);
    const en = a.defineMessages('cg-two-copies-probe', { close: 'Close' });
    const host = Object.assign(document.createElement('div'), {
      updates: 0,
      addController() {},
      removeController() {},
      requestUpdate() { this.updates++; },
      updateComplete: Promise.resolve(true),
    });
    const i18n = new a.Messages(host as never, en);
    i18n.hostConnected();
    b.setMessages({ 'cg-two-copies-probe': { close: 'Fechar' } });
    expect(i18n.t('close')).toBe('Fechar');
    expect(host.updates).toBe(1);
    b.clearMessages();
    expect(i18n.t('close')).toBe('Close');
    i18n.hostDisconnected();
  });

  it('VERSION is the package version', () => {
    const pkg = JSON.parse(readFileSync(join(__dirname, '..', '..', 'package.json'), 'utf8')) as { version: string };
    expect(VERSION).toBe(pkg.version);
  });

  it('every registered class is stamped with its copy\'s version', () => {
    class Stamped extends HTMLElement {}
    defineElement('cg-two-copies-stamped', Stamped);
    expect((customElements.get('cg-two-copies-stamped') as unknown as Record<symbol, string>)[VERSION_KEY]).toBe(VERSION);
  });

  it('the double-registration warning names both versions (and an unstamped, older first copy)', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    class First extends HTMLElement {}
    Object.defineProperty(First, VERSION_KEY, { value: '0.9.0' });
    customElements.define('cg-two-copies-old', First);
    defineElement('cg-two-copies-old', class extends HTMLElement {});
    expect(String(warn.mock.calls[0]?.[0])).toContain('0.9.0');
    expect(String(warn.mock.calls[0]?.[0])).toContain(VERSION);

    customElements.define('cg-two-copies-unstamped', class extends HTMLElement {});
    defineElement('cg-two-copies-unstamped', class extends HTMLElement {});
    expect(String(warn.mock.calls[1]?.[0])).toMatch(/unknown/);
    expect(String(warn.mock.calls[1]?.[0])).toContain(VERSION);
    warn.mockRestore();
  });
});
