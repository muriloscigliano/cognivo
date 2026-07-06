import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import type { CSSResult } from 'lit';
import { AiNotificationCenter } from '../components/ai-notification-center/ai-notification-center.js';

if (!customElements.get('ai-notification-center')) {
  customElements.define('ai-notification-center', AiNotificationCenter);
}

const cssText = (AiNotificationCenter.styles as CSSResult[]).map((s) => s.cssText).join('\n');

describe('ai-notification-center', () => {
  let el: AiNotificationCenter;

  beforeEach(async () => {
    el = document.createElement('ai-notification-center') as AiNotificationCenter;
    el.notifications = [
      { id: '1', title: 'Model updated', message: 'GPT-4 Turbo available', type: 'system', timestamp: Date.now() - 60_000 },
      { id: '2', title: 'Job done', message: 'Export complete', type: 'system', timestamp: Date.now() - 120_000, read: true },
    ];
    document.body.appendChild(el);
    await el.updateComplete;
  });

  afterEach(() => el.remove());

  it('does not nest a button inside a button (no invalid HTML)', () => {
    const rows = el.shadowRoot!.querySelectorAll('.notification');
    rows.forEach((row) => {
      expect(row.tagName.toLowerCase()).not.toBe('button');
      expect(row.getAttribute('role')).toBe('button');
    });
    // dismiss is the only real <button>
    el.shadowRoot!.querySelectorAll('button').forEach((b) => {
      expect(b.querySelector('button')).toBeNull();
    });
  });

  it('keeps listitem role on a wrapper, not on the actionable row', () => {
    const listitem = el.shadowRoot!.querySelector('[role="listitem"]')!;
    expect(listitem).not.toBeNull();
    expect(listitem.classList.contains('notification')).toBe(false);
    expect(listitem.querySelector('.notification[role="button"]')).not.toBeNull();
  });

  it('activates the row on Enter/Space via keydown', async () => {
    let clicked: string | null = null;
    el.addEventListener('ai-notification-click', ((e: CustomEvent) => { clicked = e.detail.id; }) as EventListener);
    const row = el.shadowRoot!.querySelector('.notification') as HTMLElement;
    row.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
    expect(clicked).toBe('1');
  });

  it('fires ai-notification-dismiss without triggering the row click', () => {
    let dismissed: string | null = null;
    let rowClicked = false;
    el.addEventListener('ai-notification-dismiss', ((e: CustomEvent) => { dismissed = e.detail.id; }) as EventListener);
    el.addEventListener('ai-notification-click', () => { rowClicked = true; });
    (el.shadowRoot!.querySelector('.dismiss-btn') as HTMLElement).click();
    expect(dismissed).toBe('1');
    expect(rowClicked).toBe(false);
  });

  it('uses the 2-layer offset focus ring and token-based sizing (no raw px)', () => {
    expect(cssText).toContain('var(--cg-focus-ring-offset)');
    expect(cssText).toContain('calc(var(--cg-focus-ring-offset) + var(--cg-focus-ring-width))');
    expect(cssText).toContain('max-height: var(--cg-spacing-480)');
    expect(cssText).toContain('width: var(--cg-icon-size-300)');
    expect(cssText).not.toContain('max-height: 480px');
  });
});
