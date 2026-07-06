import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import '../components/ai-guardrail/ai-guardrail.js';
import type { AiGuardrail } from '../components/ai-guardrail/ai-guardrail.js';

describe('ai-guardrail', () => {
  let element: AiGuardrail;

  beforeEach(async () => {
    element = document.createElement('ai-guardrail') as AiGuardrail;
    document.body.appendChild(element);
    await element.updateComplete;
  });

  afterEach(() => {
    element.remove();
  });

  it('uses role="status" with polite live region on the panel (AG-2)', () => {
    const panel = element.shadowRoot!.querySelector('.panel')!;
    expect(panel.getAttribute('role')).toBe('status');
    expect(panel.getAttribute('aria-live')).toBe('polite');
  });

  it('makes the reveal control keyboard-operable (AG-1)', async () => {
    element.blockedContent = 'secret';
    await element.updateComplete;
    const reveal = element.shadowRoot!.querySelector('.blocked-content')!;
    expect(reveal.getAttribute('role')).toBe('button');
    expect(reveal.getAttribute('tabindex')).toBe('0');
    expect(reveal.getAttribute('aria-expanded')).toBe('false');
  });

  it('toggles reveal on Enter/Space and fires ai-guardrail-reveal (AG-1)', async () => {
    element.blockedContent = 'secret';
    await element.updateComplete;
    let revealed: boolean | undefined;
    element.addEventListener('ai-guardrail-reveal', (e: Event) => {
      revealed = (e as CustomEvent).detail.revealed;
    });
    const reveal = element.shadowRoot!.querySelector('.blocked-content') as HTMLElement;
    reveal.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
    await element.updateComplete;
    expect(revealed).toBe(true);
    expect(reveal.getAttribute('aria-expanded')).toBe('true');
  });

  it('gives high severity a distinct treatment from medium (AG-5)', async () => {
    element.status = 'blocked';
    element.severityLevel = 'high';
    await element.updateComplete;
    const sev = element.shadowRoot!.querySelector('.severity')!;
    expect(sev.classList.contains('high')).toBe(true);
  });

  it('has no bare-px filter or focus values in its stylesheet (AG-3, AG-4)', () => {
    const css = [(element.constructor as typeof AiGuardrail).styles].flat().join('\n');
    expect(css).toContain('blur(var(--cg-spacing-4))');
    expect(css).not.toContain('blur(4px)');
    expect(css).not.toContain('0 0 0 3px');
  });

  it('applies a focus-visible style to the reveal control (AG-6)', () => {
    const css = [(element.constructor as typeof AiGuardrail).styles].flat().join('\n');
    expect(css).toContain('.blocked-content:focus-visible');
  });
});
