import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { AiConfidenceSlider } from '../components/ai-confidence-slider/ai-confidence-slider.js';

if (!customElements.get('ai-confidence-slider')) {
  customElements.define('ai-confidence-slider', AiConfidenceSlider);
}

describe('ai-confidence-slider', () => {
  let element: AiConfidenceSlider;

  beforeEach(async () => {
    element = document.createElement('ai-confidence-slider') as AiConfidenceSlider;
    document.body.appendChild(element);
    await element.updateComplete;
  });

  afterEach(() => { element.remove(); });

  it('renders in the DOM with a shadow root', () => {
    expect(element).toBeDefined();
    expect(element.shadowRoot).toBeDefined();
  });

  it('renders a native range input', () => {
    const input = element.shadowRoot!.querySelector('input[type="range"]');
    expect(input).not.toBeNull();
  });

  it('has a static aria-label and no redundant range ARIA', () => {
    const input = element.shadowRoot!.querySelector('input[type="range"]')!;
    expect(input.getAttribute('aria-label')).toBe('Minimum confidence threshold');
    expect(input.hasAttribute('aria-valuemin')).toBe(false);
    expect(input.hasAttribute('aria-valuemax')).toBe(false);
    expect(input.hasAttribute('aria-valuenow')).toBe(false);
  });

  it('exposes value via native min/max/value attributes', () => {
    const input = element.shadowRoot!.querySelector('input[type="range"]') as HTMLInputElement;
    expect(input.getAttribute('min')).toBe('0');
    expect(input.getAttribute('max')).toBe('100');
    expect(input.value).toBe('50');
  });

  it('fires ai-confidence-change when a preset is clicked', async () => {
    let detail: unknown = null;
    element.addEventListener('ai-confidence-change', ((e: CustomEvent) => { detail = e.detail; }) as EventListener);
    const preset = element.shadowRoot!.querySelector('.preset-btn') as HTMLElement;
    preset.click();
    expect((detail as { value: number }).value).toBe(30);
    expect(element.value).toBe(30);
  });

  it('renders distribution bars with percentage heights (no raw px)', async () => {
    element.distribution = [2, 5, 10];
    await element.updateComplete;
    const bars = element.shadowRoot!.querySelectorAll('.dist-bar');
    expect(bars.length).toBe(3);
    // Tallest bar should be 100% of the container; heights are percentages, not px.
    const styles = Array.from(bars).map(b => (b as HTMLElement).getAttribute('style') ?? '');
    expect(styles.some(s => s.includes('height: 100%'))).toBe(true);
    expect(styles.every(s => !/height:\s*\d+px/.test(s))).toBe(true);
  });
});
