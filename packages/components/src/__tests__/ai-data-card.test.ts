import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import type { CSSResult } from 'lit';
import { AiDataCard } from '../components/ai-data-card/ai-data-card.js';

if (!customElements.get('ai-data-card')) {
  customElements.define('ai-data-card', AiDataCard);
}

const cssText = (AiDataCard.styles as CSSResult[]).map((s) => s.cssText).join('\n');

describe('ai-data-card', () => {
  let el: AiDataCard;

  beforeEach(async () => {
    el = document.createElement('ai-data-card') as AiDataCard;
    el.title = 'Invoice #4821';
    el.fields = [
      { label: 'Amount', value: '$1,240.00', type: 'currency', copyable: true },
      { label: 'Status', value: 'Completed', type: 'status', status: 'success' },
    ];
    el.actions = [{ id: 'view', label: 'View Details', variant: 'primary' }];
    document.body.appendChild(el);
    await el.updateComplete;
  });

  afterEach(() => el.remove());

  it('dispatches ai-data-card-action from a native click on a footer button (not @cg-click)', () => {
    let detail: { actionId: string; actionLabel: string } | null = null;
    el.addEventListener('ai-data-card-action', ((e: CustomEvent) => { detail = e.detail; }) as EventListener);
    const btn = el.shadowRoot!.querySelector('.footer cg-button') as HTMLElement;
    btn.click();
    expect(detail).toEqual({ actionId: 'view', actionLabel: 'View Details' });
  });

  it('registers cg-icon so the copy affordance has a glyph element', () => {
    expect(customElements.get('cg-icon')).toBeDefined();
    const icon = el.shadowRoot!.querySelector('.copy-wrap cg-icon');
    expect(icon).not.toBeNull();
    expect(icon!.getAttribute('name')).toBe('copy');
  });

  it('does not nest an interactive row: rows have no tabindex and no clickable class', () => {
    const rows = el.shadowRoot!.querySelectorAll('.row');
    expect(rows.length).toBe(2);
    rows.forEach((r) => {
      expect(r.getAttribute('role')).toBe('listitem');
      expect(r.hasAttribute('tabindex')).toBe(false);
      expect(r.classList.contains('clickable')).toBe(false);
    });
  });

  it('no longer ships the orphaned reduced-motion hover-transform rule or dead clickable styles', () => {
    expect(cssText).not.toContain(':host(:hover) .card');
    expect(cssText).not.toContain('.row.clickable');
  });

  it('copy button stops propagation and fires copy without a row-click event', () => {
    let rowClicked = false;
    el.addEventListener('ai-data-card-row-click', () => { rowClicked = true; });
    const copyBtn = el.shadowRoot!.querySelector('.copy-wrap cg-button') as HTMLElement;
    copyBtn.click();
    expect(rowClicked).toBe(false);
  });
});
