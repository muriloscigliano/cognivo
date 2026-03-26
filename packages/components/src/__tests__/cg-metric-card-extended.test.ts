import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { CgMetricCard } from '../components/cg-metric-card/cg-metric-card.js';

if (!customElements.get('cg-metric-card-ext')) {
  customElements.define('cg-metric-card-ext', class extends CgMetricCard {});
}

describe('cg-metric-card extended', () => {
  let el: CgMetricCard;

  beforeEach(async () => {
    el = document.createElement('cg-metric-card-ext') as CgMetricCard;
    el.title = 'Revenue';
    el.value = '$2.4M';
    document.body.appendChild(el);
    await el.updateComplete;
  });

  afterEach(() => el.remove());

  it('has role="figure" for accessibility', () => {
    const card = el.shadowRoot!.querySelector('.card');
    expect(card!.getAttribute('role')).toBe('figure');
  });

  it('has descriptive aria-label', () => {
    const card = el.shadowRoot!.querySelector('.card');
    expect(card!.getAttribute('aria-label')).toContain('Revenue');
    expect(card!.getAttribute('aria-label')).toContain('$2.4M');
  });

  it('renders loading skeleton', async () => {
    el.loading = true;
    await el.updateComplete;
    const skeleton = el.shadowRoot!.querySelector('.skeleton');
    expect(skeleton).not.toBeNull();
    expect(skeleton!.getAttribute('role')).toBe('status');
  });

  it('renders sparkline when data provided', async () => {
    el.sparkline = [10, 20, 15, 30, 25];
    await el.updateComplete;
    const sparkline = el.shadowRoot!.querySelector('.sparkline');
    expect(sparkline).not.toBeNull();
    const bars = el.shadowRoot!.querySelectorAll('.spark-bar');
    expect(bars.length).toBe(5);
  });

  it('does not render sparkline with < 2 items', async () => {
    el.sparkline = [10];
    await el.updateComplete;
    expect(el.shadowRoot!.querySelector('.sparkline')).toBeNull();
  });

  it('renders icon when provided', async () => {
    el.icon = '📊';
    await el.updateComplete;
    const icon = el.shadowRoot!.querySelector('.title-icon');
    expect(icon).not.toBeNull();
    expect(icon!.textContent).toBe('📊');
  });

  it('renders comparison text', async () => {
    el.delta = '+18%';
    el.trend = 'up';
    el.comparison = 'vs last quarter';
    await el.updateComplete;
    const comp = el.shadowRoot!.querySelector('.comparison');
    expect(comp).not.toBeNull();
    expect(comp!.textContent).toBe('vs last quarter');
  });

  it('is clickable when clickable=true', async () => {
    el.clickable = true;
    await el.updateComplete;
    const card = el.shadowRoot!.querySelector('.card');
    expect(card!.classList.contains('clickable')).toBe(true);
    expect(card!.getAttribute('tabindex')).toBe('0');
  });

  it('dispatches cg-metric-click on click', async () => {
    el.clickable = true;
    await el.updateComplete;
    let detail: any = null;
    el.addEventListener('cg-metric-click', ((e: CustomEvent) => { detail = e.detail; }) as EventListener);
    (el.shadowRoot!.querySelector('.card') as HTMLElement).click();
    expect(detail).not.toBeNull();
    expect(detail.title).toBe('Revenue');
    expect(detail.value).toBe('$2.4M');
  });

  it('does not dispatch click when not clickable', async () => {
    el.clickable = false;
    await el.updateComplete;
    let fired = false;
    el.addEventListener('cg-metric-click', () => { fired = true; });
    (el.shadowRoot!.querySelector('.card') as HTMLElement).click();
    expect(fired).toBe(false);
  });

  it('handles keyboard Enter when clickable', async () => {
    el.clickable = true;
    await el.updateComplete;
    let fired = false;
    el.addEventListener('cg-metric-click', () => { fired = true; });
    const card = el.shadowRoot!.querySelector('.card') as HTMLElement;
    card.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
    expect(fired).toBe(true);
  });

  it('shows correct trend arrow', async () => {
    el.delta = '+18%';
    el.trend = 'up';
    await el.updateComplete;
    const arrow = el.shadowRoot!.querySelector('.arrow');
    expect(arrow!.textContent).toBe('↑');
  });

  it('applies up delta class', async () => {
    el.delta = '+18%';
    el.trend = 'up';
    await el.updateComplete;
    const delta = el.shadowRoot!.querySelector('.delta');
    expect(delta!.classList.contains('up')).toBe(true);
  });
});
