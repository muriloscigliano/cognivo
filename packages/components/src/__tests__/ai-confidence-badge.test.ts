import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { AiConfidenceBadge } from '../components/ai-confidence-badge/ai-confidence-badge.js';

// Register the custom element if not already registered
if (!customElements.get('ai-confidence-badge')) {
  customElements.define('ai-confidence-badge', AiConfidenceBadge);
}

describe('ai-confidence-badge', () => {
  let element: AiConfidenceBadge;

  beforeEach(async () => {
    element = document.createElement('ai-confidence-badge') as AiConfidenceBadge;
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

  it('renders a badge div', () => {
    const badge = element.shadowRoot!.querySelector('.badge');
    expect(badge).not.toBeNull();
  });

  it('defaults to score 0.85 (high confidence)', () => {
    expect(element.score).toBe(0.85);
    const badge = element.shadowRoot!.querySelector('.badge');
    expect(badge!.classList.contains('high')).toBe(true);
  });

  it('shows percentage by default', () => {
    const score = element.shadowRoot!.querySelector('.score');
    expect(score!.textContent).toBe('85%');
  });

  it('applies "high" class for score >= 0.8', async () => {
    element.score = 0.9;
    await element.updateComplete;

    const badge = element.shadowRoot!.querySelector('.badge');
    expect(badge!.classList.contains('high')).toBe(true);
  });

  it('applies "medium" class for score >= 0.5 and < 0.8', async () => {
    element.score = 0.65;
    await element.updateComplete;

    const badge = element.shadowRoot!.querySelector('.badge');
    expect(badge!.classList.contains('medium')).toBe(true);
    expect(badge!.classList.contains('high')).toBe(false);
  });

  it('applies "low" class for score < 0.5', async () => {
    element.score = 0.3;
    await element.updateComplete;

    const badge = element.shadowRoot!.querySelector('.badge');
    expect(badge!.classList.contains('low')).toBe(true);
    expect(badge!.classList.contains('high')).toBe(false);
    expect(badge!.classList.contains('medium')).toBe(false);
  });

  it('displays percentage text when showPercentage is true', async () => {
    element.score = 0.72;
    element.showPercentage = true;
    await element.updateComplete;

    const score = element.shadowRoot!.querySelector('.score');
    expect(score!.textContent).toBe('72%');
  });

  it('displays level text when showPercentage is false', async () => {
    element.score = 0.72;
    element.showPercentage = false;
    await element.updateComplete;

    const score = element.shadowRoot!.querySelector('.score');
    expect(score!.textContent).toBe('medium');
  });

  it('renders cg-icon with "check" for high confidence', () => {
    const icon = element.shadowRoot!.querySelector('cg-icon');
    expect(icon).toBeTruthy();
    expect(icon!.getAttribute('name')).toBe('check');
  });

  it('renders cg-icon with "info" for medium confidence', async () => {
    element.score = 0.6;
    await element.updateComplete;

    const icon = element.shadowRoot!.querySelector('cg-icon');
    expect(icon).toBeTruthy();
    expect(icon!.getAttribute('name')).toBe('info');
  });

  it('renders cg-icon with "warning" for low confidence', async () => {
    element.score = 0.3;
    await element.updateComplete;

    const icon = element.shadowRoot!.querySelector('cg-icon');
    expect(icon).toBeTruthy();
    expect(icon!.getAttribute('name')).toBe('warning');
  });

  it('has role="button" (interactive control)', () => {
    const badge = element.shadowRoot!.querySelector('.badge');
    expect(badge!.getAttribute('role')).toBe('button');
  });

  it('is not disabled by default and is focusable', () => {
    const badge = element.shadowRoot!.querySelector('.badge');
    expect(element.disabled).toBe(false);
    expect(badge!.getAttribute('tabindex')).toBe('0');
    expect(badge!.getAttribute('aria-disabled')).toBe('false');
  });

  it('reflects disabled: sets aria-disabled and removes from tab order', async () => {
    element.disabled = true;
    await element.updateComplete;
    const badge = element.shadowRoot!.querySelector('.badge');
    expect(badge!.getAttribute('tabindex')).toBe('-1');
    expect(badge!.getAttribute('aria-disabled')).toBe('true');
  });

  it('does not fire click event when disabled', async () => {
    element.disabled = true;
    await element.updateComplete;
    let fired = false;
    element.addEventListener('ai-confidence-badge-click', () => { fired = true; });
    const badge = element.shadowRoot!.querySelector('.badge') as HTMLElement;
    badge.click();
    expect(fired).toBe(false);
  });

  it('has aria-label with confidence info', () => {
    const badge = element.shadowRoot!.querySelector('.badge');
    expect(badge!.getAttribute('aria-label')).toBe('AI confidence: 85%, high');
  });

  it('fires ai-badge-click custom event on click', async () => {
    let eventDetail: unknown = null;
    element.addEventListener('ai-confidence-badge-click', ((e: CustomEvent) => {
      eventDetail = e.detail;
    }) as EventListener);

    const badge = element.shadowRoot!.querySelector('.badge') as HTMLElement;
    badge.click();

    expect(eventDetail).not.toBeNull();
    expect((eventDetail as { score: number }).score).toBe(0.85);
    expect((eventDetail as { level: string }).level).toBe('high');
  });

  it('event detail reflects current score and level', async () => {
    element.score = 0.4;
    await element.updateComplete;

    let eventDetail: unknown = null;
    element.addEventListener('ai-confidence-badge-click', ((e: CustomEvent) => {
      eventDetail = e.detail;
    }) as EventListener);

    const badge = element.shadowRoot!.querySelector('.badge') as HTMLElement;
    badge.click();

    expect((eventDetail as { score: number }).score).toBe(0.4);
    expect((eventDetail as { level: string }).level).toBe('low');
  });
});
