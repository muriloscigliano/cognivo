import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { AiBadge } from '../components/ai-badge/ai-badge.js';

if (!customElements.get('ai-badge-ext')) {
  customElements.define('ai-badge-ext', class extends AiBadge {});
}

describe('ai-badge extended features', () => {
  let el: AiBadge;

  beforeEach(async () => {
    el = document.createElement('ai-badge-ext') as AiBadge;
    document.body.appendChild(el);
    await el.updateComplete;
  });

  afterEach(() => el.remove());

  it('has tabindex="0" for keyboard access', () => {
    const badge = el.shadowRoot!.querySelector('.badge');
    expect(badge!.getAttribute('tabindex')).toBe('0');
  });

  it('renders tooltip on hover', () => {
    const tooltip = el.shadowRoot!.querySelector('.tooltip');
    expect(tooltip).not.toBeNull();
    expect(tooltip!.getAttribute('role')).toBe('tooltip');
  });

  it('tooltip contains confidence level', () => {
    const tooltip = el.shadowRoot!.querySelector('.tooltip');
    expect(tooltip!.textContent).toContain('High confidence');
  });

  it('renders explanation in tooltip when provided', async () => {
    el.explanation = 'Based on 5 data sources';
    await el.updateComplete;
    const explanation = el.shadowRoot!.querySelector('.tooltip-explanation');
    expect(explanation).not.toBeNull();
    expect(explanation!.textContent).toBe('Based on 5 data sources');
  });

  it('renders sparkline when history provided', async () => {
    el.history = [0.5, 0.6, 0.7, 0.8, 0.9];
    await el.updateComplete;
    const sparkline = el.shadowRoot!.querySelector('.sparkline');
    expect(sparkline).not.toBeNull();
    const bars = el.shadowRoot!.querySelectorAll('.spark-bar');
    expect(bars.length).toBe(5);
  });

  it('does not render sparkline with < 2 history items', async () => {
    el.history = [0.5];
    await el.updateComplete;
    expect(el.shadowRoot!.querySelector('.sparkline')).toBeNull();
  });

  it('respects custom thresholds', async () => {
    el.score = 0.6;
    el.highThreshold = 0.9;
    el.lowThreshold = 0.3;
    await el.updateComplete;
    const badge = el.shadowRoot!.querySelector('.badge');
    expect(badge!.classList.contains('medium')).toBe(true);
  });

  it('renders lg size with bar', async () => {
    el.size = 'lg';
    await el.updateComplete;
    const bar = el.shadowRoot!.querySelector('.bar-track');
    expect(bar).not.toBeNull();
    const fill = el.shadowRoot!.querySelector('.bar-fill');
    expect(fill).not.toBeNull();
  });

  it('renders sm size', async () => {
    el.size = 'sm';
    await el.updateComplete;
    const badge = el.shadowRoot!.querySelector('.badge');
    expect(badge).not.toBeNull();
  });

  it('dispatches ai-badge-click with score and level', async () => {
    el.score = 0.95;
    await el.updateComplete;
    let detail: any = null;
    el.addEventListener('ai-badge-click', ((e: CustomEvent) => { detail = e.detail; }) as EventListener);
    (el.shadowRoot!.querySelector('.badge') as HTMLElement).click();
    expect(detail).not.toBeNull();
    expect(detail.score).toBe(0.95);
    expect(detail.level).toBe('high');
  });

  it('handles keyboard Enter', async () => {
    let clicked = false;
    el.addEventListener('ai-badge-click', () => { clicked = true; });
    const badge = el.shadowRoot!.querySelector('.badge') as HTMLElement;
    badge.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
    expect(clicked).toBe(true);
  });
});
