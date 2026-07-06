import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { AiProgressSteps, type ProgressPhase } from '../components/ai-progress-steps/ai-progress-steps.js';

if (!customElements.get('ai-progress-steps')) {
  customElements.define('ai-progress-steps', AiProgressSteps);
}

const PHASES: ProgressPhase[] = [
  { label: 'Retrieve', status: 'complete', duration: '0.3s' },
  { label: 'Analyze', status: 'active' },
  { label: 'Generate', status: 'pending' },
];

describe('ai-progress-steps', () => {
  let el: AiProgressSteps;

  beforeEach(async () => {
    el = document.createElement('ai-progress-steps') as AiProgressSteps;
    el.phases = PHASES;
    document.body.appendChild(el);
    await el.updateComplete;
  });

  afterEach(() => el.remove());

  it('keeps the native button role by putting listitem on a wrapper, not the button', () => {
    const items = el.shadowRoot!.querySelectorAll('.step-item');
    expect(items.length).toBe(3);
    items.forEach(i => expect(i.getAttribute('role')).toBe('listitem'));
    const buttons = el.shadowRoot!.querySelectorAll('button.step');
    expect(buttons.length).toBe(3);
    // Button must NOT carry a role override.
    buttons.forEach(b => expect(b.getAttribute('role')).toBeNull());
  });

  it('marks the active step with aria-current and positional accessible names', () => {
    const buttons = el.shadowRoot!.querySelectorAll('button.step');
    expect(buttons[1].getAttribute('aria-current')).toBe('step');
    expect(buttons[0].getAttribute('aria-current')).toBeNull();
    expect(buttons[0].getAttribute('aria-label')).toBe('Step 1 of 3: Retrieve, complete');
    expect(buttons[1].getAttribute('aria-label')).toBe('Step 2 of 3: Analyze, active');
  });

  it('does not set a redundant tabindex on the native button', () => {
    const buttons = el.shadowRoot!.querySelectorAll('button.step');
    buttons.forEach(b => expect(b.getAttribute('tabindex')).toBeNull());
  });

  it('gives the active dot a filled accent so it wins the visual hierarchy', () => {
    const styles = (AiProgressSteps.styles as unknown[]).map(String).join('\n');
    const activeBlock = styles.slice(styles.indexOf('.dot[data-status="active"]'));
    expect(activeBlock).toContain('background: var(--cg-color-action-primary-background-default)');
    // Complete dot's on-primary foreground now uses the dedicated text token.
    expect(styles).toContain('color: var(--cg-color-action-primary-text-default)');
  });

  it('renders nothing when phases is empty (no bare labelled empty list)', async () => {
    el.phases = [];
    await el.updateComplete;
    expect(el.shadowRoot!.querySelector('.steps')).toBeNull();
  });

  it('fires ai-progress-phase-click with label, status and index', () => {
    let detail: { label: string; status: string; index: number } | undefined;
    el.addEventListener('ai-progress-phase-click', (e) => { detail = (e as CustomEvent).detail; });
    el.shadowRoot!.querySelectorAll<HTMLButtonElement>('button.step')[1].click();
    expect(detail).toEqual({ label: 'Analyze', status: 'active', index: 1 });
  });
});
