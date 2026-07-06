import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { AiOnboarding } from '../components/ai-onboarding/ai-onboarding.js';

if (!customElements.get('ai-onboarding')) {
  customElements.define('ai-onboarding', AiOnboarding);
}

const steps = [
  { title: 'Welcome', description: 'Intro' },
  { title: 'Ask anything', description: 'Type a question' },
  { title: 'Done', description: 'Wrap up' },
];

describe('ai-onboarding', () => {
  let el: AiOnboarding;

  beforeEach(async () => {
    el = document.createElement('ai-onboarding') as AiOnboarding;
    el.steps = steps;
    el.progress = 'dots';
    document.body.appendChild(el);
    await el.updateComplete;
  });

  afterEach(() => el.remove());

  it('re-keys the step-content node on step change so the animation restarts (ONB-1)', async () => {
    const before = el.shadowRoot!.querySelector('.step-content')!;
    el.active = 1;
    await el.updateComplete;
    const after = el.shadowRoot!.querySelector('.step-content')!;
    // keyed() forces a fresh element identity per step
    expect(after).not.toBe(before);
    expect(after.getAttribute('data-direction')).toBe('forward');
  });

  it('uses a progress group, not a broken tablist without a tabpanel (ONB-5)', () => {
    const group = el.shadowRoot!.querySelector('.progress-dots')!;
    expect(group.getAttribute('role')).toBe('group');
    expect(el.shadowRoot!.querySelector('[role="tablist"]')).toBeNull();
    expect(el.shadowRoot!.querySelector('[role="tab"]')).toBeNull();
  });

  it('marks the active dot with aria-current=step and no aria-selected (ONB-5)', () => {
    const dots = el.shadowRoot!.querySelectorAll('.dot');
    const active = dots[0];
    expect(active.getAttribute('aria-current')).toBe('step');
    expect(active.hasAttribute('aria-selected')).toBe(false);
  });

  it('advances on ArrowRight only when the host itself is focused (ONB-6)', async () => {
    // Arrow from a descendant target must NOT advance
    const dot = el.shadowRoot!.querySelector('.dot') as HTMLElement;
    dot.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true, composed: true }));
    await el.updateComplete;
    expect(el.active).toBe(0);

    // Arrow targeting the host advances
    el.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight' }));
    await el.updateComplete;
    expect(el.active).toBe(1);
  });

  it('keeps Escape-to-dismiss global regardless of focus target (ONB-6)', async () => {
    let dismissed = 0;
    el.addEventListener('ai-onboarding-dismiss', () => dismissed++);
    const dot = el.shadowRoot!.querySelector('.dot') as HTMLElement;
    dot.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true, composed: true }));
    expect(dismissed).toBe(1);
  });

  it('tokenizes the focus-ring width and completed-dot hover opacity (ONB-2, ONB-4)', () => {
    const styleText = (el.constructor as typeof AiOnboarding).styles!.toString();
    expect(styleText).not.toContain('0 0 0 3px');
    expect(styleText).toContain('var(--cg-border-width-300) var(--cg-color-focus-ring)');
    expect(styleText).not.toContain('opacity: 0.85');
    expect(styleText).toContain('opacity: var(--cg-opacity-75)');
  });
});
