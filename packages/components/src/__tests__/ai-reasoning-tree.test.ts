import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { AiReasoningTree, type ReasoningNode } from '../components/ai-reasoning-tree/ai-reasoning-tree.js';

if (!customElements.get('ai-reasoning-tree')) {
  customElements.define('ai-reasoning-tree', AiReasoningTree);
}

const NODES: ReasoningNode[] = [
  { id: 'n1', type: 'thought', content: 'First thought', confidence: 0 },
  { id: 'n2', type: 'conclusion', content: 'Final answer', confidence: 0.9 },
];

describe('ai-reasoning-tree', () => {
  let el: AiReasoningTree;

  beforeEach(async () => {
    el = document.createElement('ai-reasoning-tree') as AiReasoningTree;
    el.nodes = NODES;
    el.collapsed = false;
    document.body.appendChild(el);
    await el.updateComplete;
  });

  afterEach(() => el.remove());

  it('makes each step keyboard-operable (role=button + tabindex=0)', () => {
    const steps = el.shadowRoot!.querySelectorAll<HTMLElement>('.step');
    expect(steps.length).toBe(2);
    steps.forEach((s) => {
      expect(s.getAttribute('role')).toBe('button');
      expect(s.getAttribute('tabindex')).toBe('0');
    });
  });

  it('activates a step via Enter/Space keydown (art-1)', () => {
    const events: string[] = [];
    el.addEventListener('ai-reasoning-node-click', ((e: CustomEvent) => events.push(e.detail.id)) as EventListener);
    const step = el.shadowRoot!.querySelector<HTMLElement>('.step')!;
    step.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
    step.dispatchEvent(new KeyboardEvent('keydown', { key: ' ', bubbles: true }));
    expect(events).toEqual(['n1', 'n1']);
  });

  it('renders 0% confidence badge (art-2 truthiness bug)', () => {
    const confs = Array.from(el.shadowRoot!.querySelectorAll('.conf')).map((c) => c.textContent);
    expect(confs).toEqual(['0%', '90%']);
  });

  it('toggle button references the steps region via aria-controls (art-6)', () => {
    const toggle = el.shadowRoot!.querySelector('.toggle')!;
    expect(toggle.getAttribute('aria-controls')).toBe('art-steps');
    expect(el.shadowRoot!.querySelector('#art-steps')).not.toBeNull();
  });

  it('applies highlighted class to nodes in highlightPath', async () => {
    el.highlightPath = ['n2'];
    await el.updateComplete;
    const steps = el.shadowRoot!.querySelectorAll('.step');
    expect(steps[0].classList.contains('highlighted')).toBe(false);
    expect(steps[1].classList.contains('highlighted')).toBe(true);
  });

  it('renders nothing when there are no nodes', async () => {
    el.nodes = [];
    await el.updateComplete;
    expect(el.shadowRoot!.querySelector('.reasoning')).toBeNull();
  });
});
