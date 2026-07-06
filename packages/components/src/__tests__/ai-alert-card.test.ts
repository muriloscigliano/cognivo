import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import type { CSSResult } from 'lit';
import { AiAlertCard } from '../components/ai-alert-card/ai-alert-card.js';

if (!customElements.get('ai-alert-card')) {
  customElements.define('ai-alert-card', AiAlertCard);
}

const cssText = (AiAlertCard.styles as CSSResult[]).map((s) => s.cssText).join('\n');

describe('ai-alert-card', () => {
  let el: AiAlertCard;

  beforeEach(async () => {
    el = document.createElement('ai-alert-card') as AiAlertCard;
    el.title = 'Token budget exceeded';
    el.message = 'Context window is at 98% capacity.';
    el.urgency = 'urgent';
    document.body.appendChild(el);
    await el.updateComplete;
  });

  afterEach(() => el.remove());

  it('renders an alert with the urgency class and message', () => {
    const card = el.shadowRoot!.querySelector('.card')!;
    expect(card.getAttribute('role')).toBe('alert');
    expect(card.classList.contains('urgent')).toBe(true);
    expect(el.shadowRoot!.querySelector('.message')!.textContent).toContain('98%');
  });

  it('dispatches ai-alert-action with title and urgency', async () => {
    el.actionLabel = 'Truncate';
    await el.updateComplete;
    let detail: { title: string; urgency: string } | null = null;
    el.addEventListener('ai-alert-action', ((e: CustomEvent) => { detail = e.detail; }) as EventListener);
    (el.shadowRoot!.querySelector('.body cg-button') as HTMLElement).click();
    expect(detail).toEqual({ title: 'Token budget exceeded', urgency: 'urgent' });
  });

  it('dismisses via Escape and enters the dismissing state', async () => {
    let dismissed = false;
    el.addEventListener('ai-alert-dismiss', () => { dismissed = true; });
    const card = el.shadowRoot!.querySelector('.card') as HTMLElement;
    card.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    await el.updateComplete;
    expect(dismissed).toBe(true);
    expect(el.shadowRoot!.querySelector('.card')!.classList.contains('dismissing')).toBe(true);
  });

  it('uses the saturated error text token for the urgent stripe and icon (no border-token-as-color)', () => {
    expect(cssText).toContain('.card.urgent  { border-left-color: var(--cg-color-status-error-text-default); }');
    expect(cssText).toContain('.icon.urgent  { color: var(--cg-color-status-error-text-default); }');
  });

  it('has tokenized focus ring, exit transform, and pulse duration (no raw px / raw scale / 300ms strobe)', () => {
    expect(cssText).toContain('var(--cg-focus-ring-offset)');
    expect(cssText).toContain('var(--cg-focus-ring-width)');
    expect(cssText).not.toContain('0 0 0 2px');
    expect(cssText).toContain('scale(var(--cg-interaction-press-scale))');
    expect(cssText).not.toContain('scale(0.97)');
    expect(cssText).toContain('pulse-glow var(--cg-ai-effect-shimmer-duration)');
    // dead opacity-pulse keyframes no longer shipped
    expect(cssText).not.toMatch(/@keyframes pulse\s*\{/);
  });

  it('only draws the message divider when an action follows', async () => {
    // message is last child when no actionLabel → divider styles scoped to :not(:last-child)
    expect(cssText).toContain('.message:not(:last-child)');
    // no divider styles on the base .message rule anymore
    expect(cssText).not.toMatch(/\.message \{[^}]*border-bottom/s);
    const msg = el.shadowRoot!.querySelector('.message')!;
    expect(msg.nextElementSibling).toBeNull();
    el.actionLabel = 'Truncate';
    await el.updateComplete;
    expect(el.shadowRoot!.querySelector('.message')!.nextElementSibling?.tagName.toLowerCase()).toBe('cg-button');
  });
});
