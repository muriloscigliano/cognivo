/**
 * Focused tests for <ai-feature-flag>, covering the audit fixes:
 * Space-key activation on flag rows (aff-2), tokenized focus outlines (aff-1),
 * and the toggle event wiring.
 */
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { AiFeatureFlag, type FeatureFlag } from '../components/ai-feature-flag/ai-feature-flag.js';

if (!customElements.get('ai-feature-flag')) {
  customElements.define('ai-feature-flag', AiFeatureFlag);
}

const flags: FeatureFlag[] = [
  { id: 'rag', name: 'RAG Pipeline', enabled: true, description: 'Vector search retrieval' },
  { id: 'streaming', name: 'Streaming', enabled: false, description: 'Token streaming' },
];

describe('ai-feature-flag', () => {
  let element: AiFeatureFlag;

  beforeEach(async () => {
    element = document.createElement('ai-feature-flag') as AiFeatureFlag;
    element.flags = flags;
    document.body.appendChild(element);
    await element.updateComplete;
  });

  afterEach(() => element.remove());

  it('activates a flag row on Space and prevents default scroll (aff-2)', async () => {
    const row = element.shadowRoot!.querySelector<HTMLElement>('.flag-item')!;
    let clickedId: string | undefined;
    element.addEventListener('ai-flag-click', (e) => {
      clickedId = (e as CustomEvent).detail.id;
    });

    const ev = new KeyboardEvent('keydown', { key: ' ', bubbles: true, cancelable: true });
    row.dispatchEvent(ev);
    await element.updateComplete;

    expect(clickedId).toBeTruthy();
    expect(ev.defaultPrevented).toBe(true);
  });

  it('activates a flag row on Enter (aff-2)', async () => {
    const row = element.shadowRoot!.querySelector<HTMLElement>('.flag-item')!;
    let fired = false;
    element.addEventListener('ai-flag-click', () => (fired = true));

    row.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
    await element.updateComplete;
    expect(fired).toBe(true);
  });

  it('does not activate on other keys', async () => {
    const row = element.shadowRoot!.querySelector<HTMLElement>('.flag-item')!;
    let fired = false;
    element.addEventListener('ai-flag-click', () => (fired = true));

    row.dispatchEvent(new KeyboardEvent('keydown', { key: 'a', bubbles: true }));
    await element.updateComplete;
    expect(fired).toBe(false);
  });

  it('uses tokenized focus outlines with no bare 2px (aff-1)', () => {
    const cssText = (element.constructor as typeof AiFeatureFlag).styles
      .map((s) => (typeof s === 'object' && 'cssText' in s ? (s as { cssText: string }).cssText : ''))
      .join('\n');
    expect(cssText).toContain('outline: var(--cg-border-width-100) solid var(--cg-color-focus-ring)');
    expect(cssText).not.toMatch(/outline:\s*2px/);
  });

  it('fires ai-flag-toggle with the inverted enabled state', async () => {
    const input = element.shadowRoot!.querySelector<HTMLInputElement>('.toggle-switch input')!;
    let detail: { id: string; enabled: boolean } | undefined;
    element.addEventListener('ai-flag-toggle', (e) => {
      detail = (e as CustomEvent).detail;
    });

    input.dispatchEvent(new Event('change', { bubbles: true }));
    await element.updateComplete;
    // First rendered row is the enabled RAG flag, so toggling reports enabled:false.
    expect(detail?.id).toBe('rag');
    expect(detail?.enabled).toBe(false);
  });

  it('filters flags by search query', async () => {
    element['_search'] = 'streaming';
    await element.updateComplete;
    const names = [...element.shadowRoot!.querySelectorAll('.flag-name')].map((n) => n.textContent);
    expect(names).toEqual(['Streaming']);
  });
});
