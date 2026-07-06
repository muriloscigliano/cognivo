import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { AiScenarioPanel } from '../components/ai-scenario-panel/ai-scenario-panel.js';

if (!customElements.get('ai-scenario-panel')) {
  customElements.define('ai-scenario-panel', AiScenarioPanel);
}

const scenarios = [
  { id: 'a', label: 'Base case', probability: 0.6, status: 'idle' as const },
  { id: 'b', label: 'Optimistic', probability: 0.3, status: 'running' as const },
  { id: 'c', label: 'Pessimistic', probability: 0.1, status: 'error' as const },
];

describe('ai-scenario-panel', () => {
  let el: AiScenarioPanel;

  beforeEach(async () => {
    el = document.createElement('ai-scenario-panel') as AiScenarioPanel;
    document.body.appendChild(el);
    await el.updateComplete;
  });

  afterEach(() => el.remove());

  it('renders empty state with no scenarios', () => {
    expect(el.shadowRoot!.querySelector('.empty')).not.toBeNull();
  });

  it('active row is visually distinct via accent overlay + accent bar', () => {
    const css = (el.constructor as typeof AiScenarioPanel).styles!.toString();
    const activeBlock = css.slice(css.indexOf('.scenario.active'), css.indexOf('.scenario.active') + 200);
    expect(activeBlock).toContain('--cg-overlay-accent-medium');
    expect(activeBlock).toContain('--cg-color-action-primary-background-default');
    // active must not reuse the container fill token
    expect(activeBlock).not.toContain('--cg-overlay-dark-subtle');
  });

  it('uses roving tabindex — one tab stop across options', async () => {
    el.scenarios = scenarios;
    await el.updateComplete;
    const opts = [...el.shadowRoot!.querySelectorAll('.scenario')];
    const tabbable = opts.filter(o => o.getAttribute('tabindex') === '0');
    expect(tabbable.length).toBe(1);
    // default focus stop is first option
    expect(opts[0]!.getAttribute('tabindex')).toBe('0');
  });

  it('ArrowDown moves the roving tab stop', async () => {
    el.scenarios = scenarios;
    await el.updateComplete;
    const list = el.shadowRoot!.querySelector('[role="listbox"]')!;
    list.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
    await el.updateComplete;
    const opts = [...el.shadowRoot!.querySelectorAll('.scenario')];
    expect(opts[1]!.getAttribute('tabindex')).toBe('0');
    expect(opts[0]!.getAttribute('tabindex')).toBe('-1');
  });

  it('Enter selects the focused scenario and fires ai-scenario-select', async () => {
    el.scenarios = scenarios;
    await el.updateComplete;
    let selectedId: string | null = null;
    el.addEventListener('ai-scenario-select', (e) => {
      selectedId = (e as CustomEvent).detail.id;
    });
    const list = el.shadowRoot!.querySelector('[role="listbox"]')!;
    list.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
    expect(selectedId).toBe('a');
    expect(el.activeScenario).toBe('a');
  });

  it('provides a text alternative for each status dot', async () => {
    el.scenarios = scenarios;
    await el.updateComplete;
    const dots = el.shadowRoot!.querySelectorAll('.status-dot');
    dots.forEach(d => expect(d.getAttribute('aria-hidden')).toBe('true'));
    const srTexts = [...el.shadowRoot!.querySelectorAll('.cg-sr-only')].map(n => n.textContent);
    expect(srTexts).toContain('Status: running');
    expect(srTexts).toContain('Status: error');
  });
});
