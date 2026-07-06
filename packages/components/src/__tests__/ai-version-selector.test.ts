import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { AiVersionSelector, type VersionEntry } from '../components/ai-version-selector/ai-version-selector.js';

if (!customElements.get('ai-version-selector')) {
  customElements.define('ai-version-selector', AiVersionSelector);
}

const VERSIONS: VersionEntry[] = [
  { id: 'v1', label: 'v1.0', status: 'active', rolloutPercent: 100, date: 'Jan 1' },
  { id: 'v2', label: 'v2.0', status: 'canary', rolloutPercent: 20, date: 'Feb 1' },
  { id: 'v3', label: 'v3.0', status: 'deprecated', date: 'Mar 1' },
];

describe('ai-version-selector', () => {
  let el: AiVersionSelector;

  beforeEach(async () => {
    el = document.createElement('ai-version-selector') as AiVersionSelector;
    el.versions = VERSIONS;
    el.selected = 'v2';
    document.body.appendChild(el);
    await el.updateComplete;
  });

  afterEach(() => el.remove());

  it('uses aria-checked (not aria-selected) for radio state', async () => {
    const radios = el.shadowRoot!.querySelectorAll('[role="radio"]');
    expect(radios.length).toBe(3);
    // No radio should carry aria-selected.
    radios.forEach((r) => expect(r.hasAttribute('aria-selected')).toBe(false));
    // The selected one is aria-checked=true, others false.
    const checked = Array.from(radios).map((r) => r.getAttribute('aria-checked'));
    expect(checked).toEqual(['false', 'true', 'false']);
  });

  it('exposes exactly one tab stop (roving tabindex) at the selected item', async () => {
    const radios = Array.from(el.shadowRoot!.querySelectorAll<HTMLElement>('[role="radio"]'));
    const tabbable = radios.filter((r) => r.getAttribute('tabindex') === '0');
    expect(tabbable.length).toBe(1);
    // Selected is v2 (index 1).
    expect(radios[1]!.getAttribute('tabindex')).toBe('0');
  });

  it('ArrowDown moves the roving tab stop', async () => {
    const list = el.shadowRoot!.querySelector('.version-list')!;
    list.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
    await el.updateComplete;
    const radios = Array.from(el.shadowRoot!.querySelectorAll<HTMLElement>('[role="radio"]'));
    // Was index 1 (v2); ArrowDown -> index 2.
    expect(radios[2]!.getAttribute('tabindex')).toBe('0');
    expect(radios[1]!.getAttribute('tabindex')).toBe('-1');
  });

  it('ArrowUp wraps from the first item to the last', async () => {
    el.selected = 'v1';
    await el.updateComplete;
    const list = el.shadowRoot!.querySelector('.version-list')!;
    list.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp', bubbles: true }));
    await el.updateComplete;
    const radios = Array.from(el.shadowRoot!.querySelectorAll<HTMLElement>('[role="radio"]'));
    expect(radios[2]!.getAttribute('tabindex')).toBe('0');
  });

  it('emits ai-version-select on click', async () => {
    let detail: { id: string; label: string } | null = null;
    el.addEventListener('ai-version-select', ((e: CustomEvent) => { detail = e.detail; }) as EventListener);
    const first = el.shadowRoot!.querySelector<HTMLElement>('[role="radio"]')!;
    first.click();
    expect(detail).not.toBeNull();
    expect(detail!.id).toBe('v1');
  });

  it('does not use a raw letter-spacing literal', () => {
    const styles = (el.constructor as typeof AiVersionSelector).styles as { cssText: string }[];
    const cssText = styles.map((s) => s.cssText).join('\n');
    expect(cssText).toContain('var(--cg-letter-spacing-wider)');
    expect(cssText).not.toContain('0.05em');
  });
});
