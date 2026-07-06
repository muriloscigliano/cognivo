import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { AiChartSummary } from '../components/ai-chart-summary/ai-chart-summary.js';

if (!customElements.get('ai-chart-summary')) {
  customElements.define('ai-chart-summary', AiChartSummary);
}

describe('ai-chart-summary', () => {
  let element: AiChartSummary;

  beforeEach(async () => {
    element = document.createElement('ai-chart-summary') as AiChartSummary;
    document.body.appendChild(element);
    await element.updateComplete;
  });

  afterEach(() => { element.remove(); });

  it('renders in the DOM with a shadow root', () => {
    expect(element).toBeDefined();
    expect(element.shadowRoot).toBeDefined();
  });

  it('renders nothing when summary is empty', () => {
    expect(element.shadowRoot!.querySelector('.card')).toBeNull();
  });

  it('renders summary container when summary text is provided', async () => {
    element.summary = 'Revenue is trending up by 15%.';
    await element.updateComplete;
    expect(element.shadowRoot!.querySelector('.card')).not.toBeNull();
  });

  it('displays the summary text', async () => {
    element.summary = 'Revenue is trending up by 15%.';
    await element.updateComplete;
    const text = element.shadowRoot!.querySelector('.summary-text');
    expect(text!.textContent).toBe('Revenue is trending up by 15%.');
  });

  it('renders AI Insight label', async () => {
    element.summary = 'Some insight';
    await element.updateComplete;
    const label = element.shadowRoot!.querySelector('.header-label');
    expect(label!.textContent).toBe('AI Insight');
  });

  it('renders ai-dot indicator', async () => {
    element.summary = 'Some insight';
    await element.updateComplete;
    const dot = element.shadowRoot!.querySelector('.ai-dot');
    expect(dot).not.toBeNull();
  });

  it('has role="complementary" with aria-label', async () => {
    element.summary = 'Some insight';
    await element.updateComplete;
    const div = element.shadowRoot!.querySelector('.card');
    expect(div!.getAttribute('role')).toBe('complementary');
    expect(div!.getAttribute('aria-label')).toBe('AI chart insight');
  });

  it('shows only refresh button when collapsible is false', async () => {
    element.summary = 'Some insight';
    element.collapsible = false;
    await element.updateComplete;
    const buttons = element.shadowRoot!.querySelectorAll('.icon-btn');
    expect(buttons.length).toBe(1); // Only refresh
  });

  it('shows toggle button when collapsible is true', async () => {
    element.summary = 'Some insight';
    element.collapsible = true;
    await element.updateComplete;
    const buttons = element.shadowRoot!.querySelectorAll('.icon-btn');
    expect(buttons.length).toBe(2); // Refresh + toggle
  });

  it('toggles collapsed state when toggle button is clicked', async () => {
    element.summary = 'Some insight';
    element.collapsible = true;
    await element.updateComplete;
    const buttons = element.shadowRoot!.querySelectorAll('.icon-btn');
    const toggleBtn = buttons[1] as HTMLElement; // Second button is toggle
    toggleBtn.click();
    await element.updateComplete;
    const div = element.shadowRoot!.querySelector('.card');
    expect(div!.classList.contains('collapsed')).toBe(true);
  });

  it('fires ai-summary-toggle event when toggled', async () => {
    element.summary = 'Some insight';
    element.collapsible = true;
    await element.updateComplete;
    let eventDetail: unknown = null;
    element.addEventListener('ai-summary-toggle', ((e: CustomEvent) => { eventDetail = e.detail; }) as EventListener);
    const buttons = element.shadowRoot!.querySelectorAll('.icon-btn');
    (buttons[1] as HTMLElement).click();
    expect(eventDetail).not.toBeNull();
    expect((eventDetail as { collapsed: boolean }).collapsed).toBe(true);
  });

  it('renders trend items', async () => {
    element.summary = 'Some insight';
    element.trends = [
      { label: 'Revenue', direction: 'up', value: '+15%' },
      { label: 'Churn', direction: 'down', value: '-3%' },
      { label: 'Retention', direction: 'neutral', value: '0%' },
    ];
    await element.updateComplete;
    expect(element.shadowRoot!.querySelectorAll('.trend').length).toBe(3);
  });

  it('applies correct direction class to trends', async () => {
    element.summary = 'Some insight';
    element.trends = [
      { label: 'Revenue', direction: 'up', value: '+15%' },
      { label: 'Churn', direction: 'down', value: '-3%' },
    ];
    await element.updateComplete;
    const trends = element.shadowRoot!.querySelectorAll('.trend');
    expect(trends[0]!.classList.contains('up')).toBe(true);
    expect(trends[1]!.classList.contains('down')).toBe(true);
  });

  it('does not render trends when array is empty', async () => {
    element.summary = 'Some insight';
    element.trends = [];
    await element.updateComplete;
    expect(element.shadowRoot!.querySelector('.trends')).toBeNull();
  });

  it('activates a trend via Enter key (keyboard operability)', async () => {
    element.summary = 'Some insight';
    element.trends = [{ label: 'Revenue', direction: 'up', value: '+15%' }];
    await element.updateComplete;
    let detail: unknown = null;
    element.addEventListener('ai-summary-trend-click', ((e: CustomEvent) => { detail = e.detail; }) as EventListener);
    const trend = element.shadowRoot!.querySelector('.trend') as HTMLElement;
    trend.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
    expect((detail as { label: string }).label).toBe('Revenue');
  });

  it('activates a trend via Space key', async () => {
    element.summary = 'Some insight';
    element.trends = [{ label: 'Churn', direction: 'down', value: '-3%' }];
    await element.updateComplete;
    let fired = false;
    element.addEventListener('ai-summary-trend-click', () => { fired = true; });
    const trend = element.shadowRoot!.querySelector('.trend') as HTMLElement;
    trend.dispatchEvent(new KeyboardEvent('keydown', { key: ' ', bubbles: true }));
    expect(fired).toBe(true);
  });

  it('ignores non-activation keys on a trend', async () => {
    element.summary = 'Some insight';
    element.trends = [{ label: 'Revenue', direction: 'up', value: '+15%' }];
    await element.updateComplete;
    let fired = false;
    element.addEventListener('ai-summary-trend-click', () => { fired = true; });
    const trend = element.shadowRoot!.querySelector('.trend') as HTMLElement;
    trend.dispatchEvent(new KeyboardEvent('keydown', { key: 'a', bubbles: true }));
    expect(fired).toBe(false);
  });
});
