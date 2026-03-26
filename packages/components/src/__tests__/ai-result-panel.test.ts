import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { AiResultPanel } from '../components/ai-result-panel/ai-result-panel.js';

// Register the custom element if not already registered
if (!customElements.get('ai-result-panel')) {
  customElements.define('ai-result-panel', AiResultPanel);
}

describe('ai-result-panel', () => {
  let element: AiResultPanel;

  beforeEach(async () => {
    element = document.createElement('ai-result-panel') as AiResultPanel;
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

  it('renders panel container', () => {
    const panel = element.shadowRoot!.querySelector('.panel');
    expect(panel).not.toBeNull();
  });

  it('shows empty state when no explanation is set', () => {
    const emptyState = element.shadowRoot!.querySelector('.empty');
    expect(emptyState).not.toBeNull();
    expect(emptyState!.textContent).toContain('No results yet');
  });

  it('defaults title to "AI Analysis"', () => {
    expect(element.title).toBe('AI Analysis');
  });

  it('displays explanation text when set', async () => {
    element.explanation = 'Revenue increased 15% due to seasonal demand.';
    await element.updateComplete;

    const explanation = element.shadowRoot!.querySelector('.explanation');
    expect(explanation).not.toBeNull();
    expect(explanation!.textContent).toBe('Revenue increased 15% due to seasonal demand.');
  });

  it('displays title when explanation is provided', async () => {
    element.explanation = 'Some analysis';
    await element.updateComplete;

    const title = element.shadowRoot!.querySelector('.title');
    expect(title).not.toBeNull();
    expect(title!.textContent).toBe('AI Analysis');
  });

  it('renders custom title', async () => {
    element.explanation = 'Some analysis';
    element.title = 'Custom Title';
    await element.updateComplete;

    const title = element.shadowRoot!.querySelector('.title');
    expect(title!.textContent).toBe('Custom Title');
  });

  it('has role="region" with aria-label when explanation is provided', async () => {
    element.explanation = 'Some analysis';
    await element.updateComplete;

    const panel = element.shadowRoot!.querySelector('.panel');
    expect(panel!.getAttribute('role')).toBe('region');
    expect(panel!.getAttribute('aria-label')).toBe('AI Analysis');
  });

  it('renders bullet points when provided', async () => {
    element.explanation = 'Analysis result';
    element.bullets = ['Point one', 'Point two', 'Point three'];
    await element.updateComplete;

    const bullets = element.shadowRoot!.querySelectorAll('.bullet');
    expect(bullets.length).toBe(3);
    expect(bullets[0]!.textContent).toContain('Point one');
    expect(bullets[1]!.textContent).toContain('Point two');
    expect(bullets[2]!.textContent).toContain('Point three');
  });

  it('does not render bullets list when bullets array is empty', async () => {
    element.explanation = 'Analysis result';
    element.bullets = [];
    await element.updateComplete;

    const bulletsList = element.shadowRoot!.querySelector('.bullets');
    expect(bulletsList).toBeNull();
  });

  it('renders drivers when provided', async () => {
    element.explanation = 'Analysis result';
    element.drivers = [
      { factor: 'Seasonality', impact: 75 },
      { factor: 'Marketing', impact: -30 },
    ];
    await element.updateComplete;

    const drivers = element.shadowRoot!.querySelectorAll('.driver');
    expect(drivers.length).toBe(2);

    const names = element.shadowRoot!.querySelectorAll('.driver-name');
    expect(names[0]!.textContent).toBe('Seasonality');
    expect(names[1]!.textContent).toBe('Marketing');
  });

  it('applies positive class for positive impact drivers', async () => {
    element.explanation = 'Analysis result';
    element.drivers = [{ factor: 'Growth', impact: 60 }];
    await element.updateComplete;

    const fill = element.shadowRoot!.querySelector('.driver-fill');
    expect(fill!.classList.contains('positive')).toBe(true);
  });

  it('applies negative class for negative impact drivers', async () => {
    element.explanation = 'Analysis result';
    element.drivers = [{ factor: 'Churn', impact: -40 }];
    await element.updateComplete;

    const fill = element.shadowRoot!.querySelector('.driver-fill');
    expect(fill!.classList.contains('negative')).toBe(true);
  });

  it('does not render drivers section when drivers array is empty', async () => {
    element.explanation = 'Analysis result';
    element.drivers = [];
    await element.updateComplete;

    const driversSection = element.shadowRoot!.querySelector('.drivers');
    expect(driversSection).toBeNull();
  });

  it('hides empty state when explanation is set', async () => {
    element.explanation = 'Some text';
    await element.updateComplete;

    const emptyState = element.shadowRoot!.querySelector('.empty');
    expect(emptyState).toBeNull();
  });
});
