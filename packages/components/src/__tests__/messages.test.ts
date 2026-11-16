import { describe, it, expect, afterEach } from 'vitest';
import { CgInput } from '../components/cg-input/cg-input.js';
import { setMessages, clearMessages, englishMessages } from '../utils/messages.js';
import { ptBR } from '../locales/pt-BR.js';
import '../index.js';

if (!customElements.get('cg-input')) customElements.define('cg-input', CgInput);

/** The clear button's accessible name is the observable for the whole mechanism. */
async function clearLabel(attrs: Record<string, string> = {}, parentLang?: string): Promise<string | null> {
  const host = document.createElement('div');
  if (parentLang) host.lang = parentLang;
  const el = document.createElement('cg-input') as CgInput;
  for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v);
  el.clearable = true;
  el.value = 'x';
  host.append(el);
  document.body.append(host);
  await el.updateComplete;
  return el.shadowRoot!.querySelector('button.clear')!.getAttribute('aria-label');
}

describe('interface text (messages)', () => {
  afterEach(() => {
    clearMessages();
    document.body.innerHTML = '';
  });

  it('defaults to English', async () => {
    expect(await clearLabel()).toBe('Clear input');
  });

  it('the page-wide map translates every element', async () => {
    setMessages({ 'cg-input': { clear: 'Limpar campo' } });
    expect(await clearLabel()).toBe('Limpar campo');
  });

  it('the element attribute (JSON) wins over the page-wide map', async () => {
    setMessages({ 'cg-input': { clear: 'Limpar campo' } });
    expect(await clearLabel({ messages: '{"clear":"Apagar"}' })).toBe('Apagar');
  });

  it('live elements re-render when the page-wide map changes', async () => {
    await clearLabel();
    const el = document.querySelector('cg-input') as CgInput;
    setMessages({ 'cg-input': { clear: 'Limpar campo' } });
    await el.updateComplete;
    expect(el.shadowRoot!.querySelector('button.clear')!.getAttribute('aria-label')).toBe('Limpar campo');
    clearMessages();
    await el.updateComplete;
    expect(el.shadowRoot!.querySelector('button.clear')!.getAttribute('aria-label')).toBe('Clear input');
  });

  it('ships a complete pt-BR map: same tags and keys as English, same {placeholders}', () => {
    const en = englishMessages();
    const missing: string[] = [];
    const extra: string[] = [];
    const placeholders: string[] = [];
    const vars = (s: string) => [...s.matchAll(/\{(\w+)\}/g)].map((m) => m[1]).sort().join(',');
    for (const [tag, keys] of Object.entries(en)) {
      for (const [k, v] of Object.entries(keys)) {
        const pt = ptBR[tag]?.[k];
        if (pt === undefined) missing.push(`${tag}.${k}`);
        else if (vars(pt) !== vars(v)) placeholders.push(`${tag}.${k}`);
      }
    }
    for (const [tag, keys] of Object.entries(ptBR)) for (const k of Object.keys(keys)) if (en[tag]?.[k] === undefined) extra.push(`${tag}.${k}`);
    expect(Object.keys(en).length).toBeGreaterThan(50);
    expect({ missing, extra, placeholders }).toEqual({ missing: [], extra: [], placeholders: [] });
  });

  it('pt-BR applies end to end', async () => {
    setMessages(ptBR);
    expect(await clearLabel()).toBe(ptBR['cg-input']!.clear);
    expect(ptBR['cg-input']!.clear).not.toBe('Clear input');
  });
});
