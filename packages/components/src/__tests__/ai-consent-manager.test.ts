import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import type { CSSResult } from 'lit';
import { AiConsentManager, type ConsentItem } from '../components/ai-consent-manager/ai-consent-manager.js';

if (!customElements.get('ai-consent-manager')) {
  customElements.define('ai-consent-manager', AiConsentManager);
}

const cssText = (AiConsentManager.styles as CSSResult[]).map((s) => s.cssText).join('\n');

const CONSENTS: ConsentItem[] = [
  { id: 'essential', label: 'Essential', description: 'Required cookies', required: true },
  { id: 'analytics', label: 'Analytics', description: 'Usage tracking', checked: false },
];

describe('ai-consent-manager', () => {
  let el: AiConsentManager;

  beforeEach(async () => {
    el = document.createElement('ai-consent-manager') as AiConsentManager;
    el.consents = CONSENTS.map((c) => ({ ...c }));
    document.body.appendChild(el);
    await el.updateComplete;
  });

  afterEach(() => el.remove());

  it('gives each cg-switch an accessible name via aria-label matching its consent label', () => {
    const switches = el.shadowRoot!.querySelectorAll('cg-switch');
    expect(switches.length).toBe(2);
    expect(switches[0].getAttribute('aria-label')).toBe('Essential');
    expect(switches[1].getAttribute('aria-label')).toBe('Analytics');
  });

  it('renders an accessible empty-state panel (not nothing) when no consents are configured', async () => {
    el.consents = [];
    await el.updateComplete;
    const panel = el.shadowRoot!.querySelector('.panel');
    expect(panel).not.toBeNull();
    expect(panel!.getAttribute('role')).toBe('region');
    expect(el.shadowRoot!.querySelector('.empty-message')!.textContent).toContain('No consent options');
  });

  it('adds row dividers and hover/focus-within affordances with semantic tokens', () => {
    expect(cssText).toContain('.item + .item');
    expect(cssText).toContain('var(--cg-color-surface-base-divider)');
    expect(cssText).toContain(':focus-within');
    expect(cssText).toContain('var(--cg-color-surface-cards-subtle)');
  });

  it('empty-state message uses the semantic empty-state text token', () => {
    expect(cssText).toContain('var(--cg-color-empty-state-text-secondary)');
  });

  it('toggling a non-required consent dispatches ai-consent-change', () => {
    let detail: { id: string; checked: boolean } | null = null;
    el.addEventListener('ai-consent-change', ((e: CustomEvent) => { detail = e.detail; }) as EventListener);
    const analyticsSwitch = el.shadowRoot!.querySelectorAll('cg-switch')[1] as HTMLElement;
    analyticsSwitch.dispatchEvent(new CustomEvent('cg-change', { bubbles: true, composed: true, detail: { checked: true } }));
    expect(detail).toEqual({ id: 'analytics', checked: true });
  });
});
