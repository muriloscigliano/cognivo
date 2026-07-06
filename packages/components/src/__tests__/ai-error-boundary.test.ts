import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import '../components/ai-error-boundary/ai-error-boundary.js';
import type { AiErrorBoundary } from '../components/ai-error-boundary/ai-error-boundary.js';

describe('ai-error-boundary', () => {
  let element: AiErrorBoundary;

  beforeEach(async () => {
    element = document.createElement('ai-error-boundary') as AiErrorBoundary;
    element.error = 'Model returned an empty response';
    document.body.appendChild(element);
    await element.updateComplete;
  });

  afterEach(() => {
    element.remove();
  });

  it('renders the error message text', () => {
    const msg = element.shadowRoot!.querySelector('.message')!;
    expect(msg.textContent).toContain('empty response');
  });

  it('colors the primary message with the base body-text token (aeb-1)', () => {
    const css = [(element.constructor as typeof AiErrorBoundary).styles].flat().join('\n');
    const messageRule = css.slice(css.indexOf('.message {'), css.indexOf('.message {') + 200);
    expect(messageRule).toContain('color: var(--cg-color-surface-base-text)');
    expect(messageRule).not.toContain('surface-container-outlined');
  });

  it('renders the warning icon svg at 24px and has no dead font-size (aeb-2)', () => {
    const svg = element.shadowRoot!.querySelector('.icon svg')!;
    expect(svg.getAttribute('width')).toBe('24');
    expect(svg.getAttribute('height')).toBe('24');
    const css = [(element.constructor as typeof AiErrorBoundary).styles].flat().join('\n');
    const iconRule = css.slice(css.indexOf('.icon {'), css.indexOf('.icon {') + 120);
    expect(iconRule).not.toContain('font-size');
  });

  it('dispatches ai-error-retry when retry clicked', async () => {
    let fired = false;
    element.addEventListener('ai-error-retry', () => { fired = true; });
    const btn = element.shadowRoot!.querySelector('.retry-btn') as HTMLElement;
    btn.click();
    expect(fired).toBe(true);
  });

  it('dispatches ai-error-dismiss when dismiss clicked', async () => {
    let fired = false;
    element.addEventListener('ai-error-dismiss', () => { fired = true; });
    const btn = element.shadowRoot!.querySelector('.dismiss-btn') as HTMLElement;
    btn.click();
    expect(fired).toBe(true);
  });

  it('renders nothing when there is no error', async () => {
    element.error = '';
    await element.updateComplete;
    expect(element.shadowRoot!.querySelector('.error-card')).toBeNull();
  });
});
