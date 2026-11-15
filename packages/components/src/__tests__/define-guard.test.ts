import { describe, it, expect, vi } from 'vitest';
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { customElement, defineElement } from '../utils/define.js';
import { CgInput } from '../components/cg-input/cg-input.js';

/**
 * Double registration: two bundles (an embed + the host app, or a lazy chunk
 * loaded twice) each carrying `@cognivo/components` used to throw
 * "the name cg-input has already been used with this registry" and abort the
 * second bundle. Registration is now first-wins and never throws.
 */
describe('custom element double-registration guard', () => {
  it('re-registering the same class is a silent no-op', () => {
    expect(customElements.get('cg-input')).toBe(CgInput);
    expect(() => defineElement('cg-input', CgInput)).not.toThrow();
    expect(customElements.get('cg-input')).toBe(CgInput);
  });

  it('a second copy (different class, same tag) does not throw; the first definition wins and a warning names the tag', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    class SecondCopy extends HTMLElement {}
    expect(() => customElement('cg-input')(SecondCopy)).not.toThrow();
    expect(customElements.get('cg-input')).toBe(CgInput);
    expect(warn).toHaveBeenCalledTimes(1);
    expect(String(warn.mock.calls[0]?.[0])).toContain('cg-input');
    warn.mockRestore();
  });

  it('defines a new tag normally (legacy and standard decorator call shapes)', () => {
    class Fresh extends HTMLElement {}
    customElement('cg-define-guard-fresh')(Fresh);
    expect(customElements.get('cg-define-guard-fresh')).toBe(Fresh);

    class Fresh2 extends HTMLElement {}
    const inits: Array<() => void> = [];
    customElement('cg-define-guard-fresh-2')(Fresh2, { kind: 'class', addInitializer: (f: () => void) => inits.push(f) } as unknown as ClassDecoratorContext);
    inits.forEach((f) => f());
    expect(customElements.get('cg-define-guard-fresh-2')).toBe(Fresh2);
  });

  it('no component registers through the throwing lit decorator or a bare customElements.define', () => {
    const root = join(__dirname, '..', 'components');
    const offenders: string[] = [];
    for (const dir of readdirSync(root)) {
      const full = join(root, dir);
      if (!statSync(full).isDirectory()) continue;
      for (const f of readdirSync(full)) {
        if (!f.endsWith('.ts')) continue;
        const src = readFileSync(join(full, f), 'utf8');
        if (/import\s*\{[^}]*\bcustomElement\b[^}]*\}\s*from\s*'lit\/decorators\.js'/.test(src)) offenders.push(`${dir}/${f} (lit customElement)`);
        if (/customElements\.define\(/.test(src)) offenders.push(`${dir}/${f} (customElements.define)`);
      }
    }
    expect(offenders).toEqual([]);
  });
});
