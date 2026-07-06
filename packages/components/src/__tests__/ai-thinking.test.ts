import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { AiThinking } from '../components/ai-thinking/ai-thinking.js';

// Register the custom element if not already registered
if (!customElements.get('ai-thinking')) {
  customElements.define('ai-thinking', AiThinking);
}

describe('ai-thinking', () => {
  let element: AiThinking;

  beforeEach(async () => {
    element = document.createElement('ai-thinking') as AiThinking;
    element.delay = 0; // Skip delay for tests
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

  it('renders a container div', () => {
    const container = element.shadowRoot!.querySelector('.container');
    expect(container).not.toBeNull();
  });

  it('shows default text "Thinking"', () => {
    const textEl = element.shadowRoot!.querySelector('.text');
    expect(textEl).not.toBeNull();
    expect(textEl!.textContent).toBe('Thinking');
  });

  it('updates displayed text when text property changes', async () => {
    element.text = 'Analyzing';
    await element.updateComplete;

    const textEl = element.shadowRoot!.querySelector('.text');
    expect(textEl!.textContent).toBe('Analyzing');
  });

  it('renders dots element for animation', () => {
    const dots = element.shadowRoot!.querySelector('.dots');
    expect(dots).not.toBeNull();
  });

  it('renders dots element for default variant', () => {
    const dots = element.shadowRoot!.querySelectorAll('.dot');
    expect(dots.length).toBe(3);
  });

  it('does not apply shimmer class by default', () => {
    const container = element.shadowRoot!.querySelector('.container');
    expect(container!.classList.contains('shimmer')).toBe(false);
  });

  it('applies shimmer class when shimmer property is true', async () => {
    element.shimmer = true;
    await element.updateComplete;

    const container = element.shadowRoot!.querySelector('.container');
    expect(container!.classList.contains('shimmer')).toBe(true);
  });

  it('has role="status" for accessibility', () => {
    const container = element.shadowRoot!.querySelector('.container');
    expect(container!.getAttribute('role')).toBe('status');
  });

  it('has aria-live="polite" for screen readers', () => {
    const container = element.shadowRoot!.querySelector('.container');
    expect(container!.getAttribute('aria-live')).toBe('polite');
  });

  it('has aria-label matching the text property', async () => {
    const container = element.shadowRoot!.querySelector('.container');
    expect(container!.getAttribute('aria-label')).toBe('Thinking');

    element.text = 'Processing';
    await element.updateComplete;

    const updatedContainer = element.shadowRoot!.querySelector('.container');
    expect(updatedContainer!.getAttribute('aria-label')).toBe('Processing');
  });

  it('marks dots as aria-hidden', () => {
    const dots = element.shadowRoot!.querySelector('.dots');
    expect(dots!.getAttribute('aria-hidden')).toBe('true');
  });

  it('falls back to a non-empty aria-label when text is blanked (F4)', async () => {
    element.text = '';
    await element.updateComplete;
    const container = element.shadowRoot!.querySelector('.container');
    expect(container!.getAttribute('aria-label')).toBe('Thinking');
  });

  it('resets the reflected shimmer variant animation under reduced motion (F1)', () => {
    const css = (AiThinking as unknown as { styles: Array<{ cssText: string }> }).styles
      .map((s) => s.cssText).join('\n');
    expect(css).toContain(':host([variant="shimmer"]) .text');
    expect(css).toMatch(/\.shimmer \.text,\s*:host\(\[variant="shimmer"\]\) \.text \{ animation: none/);
  });

  it('disables the tool materialize entrance under reduced motion (F2)', () => {
    const css = (AiThinking as unknown as { styles: Array<{ cssText: string }> }).styles
      .map((s) => s.cssText).join('\n');
    expect(css).toMatch(/\.tool\.loading \.tool-icon, \.tool \{ animation: none/);
  });

  it('right-aligns the cancel button in the lg column layout (F3)', () => {
    const css = (AiThinking as unknown as { styles: Array<{ cssText: string }> }).styles
      .map((s) => s.cssText).join('\n');
    expect(css).toMatch(/:host\(\[size="lg"\]\) \.cancel \{[^}]*align-self: flex-end/);
  });
});
