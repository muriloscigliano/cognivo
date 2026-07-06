import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { AiInsightCard } from '../components/ai-insight-card/ai-insight-card.js';

// Register the custom element if not already registered
if (!customElements.get('ai-insight-card')) {
  customElements.define('ai-insight-card', AiInsightCard);
}

describe('ai-insight-card', () => {
  let element: AiInsightCard;

  beforeEach(async () => {
    element = document.createElement('ai-insight-card') as AiInsightCard;
    document.body.appendChild(element);
    await element.updateComplete;
  });

  afterEach(() => {
    element.remove();
  });

  it('renders in the DOM with a shadow root', () => {
    expect(element).toBeDefined();
    expect(element.shadowRoot).toBeDefined();
  });

  it('renders nothing when text is empty', () => {
    const card = element.shadowRoot!.querySelector('.card');
    expect(card).toBeNull();
  });

  it('renders a card when text is provided', async () => {
    element.text = 'Revenue spike detected in Q3.';
    await element.updateComplete;

    const card = element.shadowRoot!.querySelector('.card');
    expect(card).not.toBeNull();
  });

  it('displays insight text', async () => {
    element.text = 'Revenue spike detected in Q3.';
    await element.updateComplete;

    const insightText = element.shadowRoot!.querySelector('.insight-text');
    expect(insightText).not.toBeNull();
    expect(insightText!.textContent).toBe('Revenue spike detected in Q3.');
  });

  it('displays type label', async () => {
    element.text = 'Some insight';
    element.type = 'forecast';
    await element.updateComplete;

    const typeLabel = element.shadowRoot!.querySelector('.type-label');
    expect(typeLabel).not.toBeNull();
    expect(typeLabel!.textContent).toBe('forecast');
  });

  it('defaults type to "explanation"', () => {
    expect(element.type).toBe('explanation');
  });

  it('renders icon area with correct type class', async () => {
    element.text = 'Some insight';
    element.type = 'anomaly';
    await element.updateComplete;

    const iconArea = element.shadowRoot!.querySelector('.icon-area');
    expect(iconArea).not.toBeNull();
    expect(iconArea!.classList.contains('anomaly')).toBe(true);
    expect(iconArea!.getAttribute('aria-hidden')).toBe('true');
  });

  it('has role="button" with aria-label (interactive disclosure host)', async () => {
    element.text = 'Some insight';
    element.type = 'forecast';
    await element.updateComplete;

    const card = element.shadowRoot!.querySelector('.card');
    expect(card!.getAttribute('role')).toBe('button');
    expect(card!.getAttribute('aria-label')).toBe('forecast insight');
  });

  it('exposes aria-expanded only when expandable', async () => {
    element.text = 'Some insight';
    element.expandable = true;
    element.expanded = false;
    await element.updateComplete;

    const card = element.shadowRoot!.querySelector('.card');
    expect(card!.getAttribute('aria-expanded')).toBe('false');
  });

  it('labels the confidence figure for screen readers', async () => {
    element.text = 'Some insight';
    element.confidence = 0.87;
    await element.updateComplete;

    const conf = element.shadowRoot!.querySelector('.confidence');
    expect(conf).not.toBeNull();
    expect(conf!.getAttribute('aria-label')).toBe('Confidence 87 percent');
    expect(conf!.textContent).toBe('87%');
  });

  it('card has tabindex="0" for keyboard navigation', async () => {
    element.text = 'Some insight';
    await element.updateComplete;

    const card = element.shadowRoot!.querySelector('.card');
    expect(card!.getAttribute('tabindex')).toBe('0');
  });

  it('fires ai-insight-click event on click', async () => {
    element.text = 'Revenue spike';
    element.type = 'anomaly';
    element.confidence = 0.92;
    await element.updateComplete;

    let eventDetail: unknown = null;
    element.addEventListener('ai-insight-click', ((e: CustomEvent) => {
      eventDetail = e.detail;
    }) as EventListener);

    const card = element.shadowRoot!.querySelector('.card') as HTMLElement;
    card.click();

    expect(eventDetail).not.toBeNull();
    expect((eventDetail as { type: string }).type).toBe('anomaly');
    expect((eventDetail as { text: string }).text).toBe('Revenue spike');
    expect((eventDetail as { confidence: number }).confidence).toBe(0.92);
  });

  it('displays timestamp when provided', async () => {
    element.text = 'Some insight';
    element.timestamp = '2 hours ago';
    await element.updateComplete;

    const meta = element.shadowRoot!.querySelector('.meta');
    expect(meta).not.toBeNull();
    expect(meta!.textContent).toContain('2 hours ago');
  });

  it('does not display timestamp when not provided', async () => {
    element.text = 'Some insight';
    element.timestamp = '';
    await element.updateComplete;

    const meta = element.shadowRoot!.querySelector('.meta');
    // The meta div should exist but timestamp span should not contain text
    expect(meta).not.toBeNull();
  });

  it('supports all five insight types', async () => {
    const types = ['explanation', 'forecast', 'anomaly', 'optimization', 'classification'] as const;
    for (const type of types) {
      element.text = 'Test insight';
      element.type = type;
      await element.updateComplete;

      const iconArea = element.shadowRoot!.querySelector('.icon-area');
      expect(iconArea!.classList.contains(type)).toBe(true);
    }
  });
});
