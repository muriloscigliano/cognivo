import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { AiLabelingBoard } from '../components/ai-labeling-board/ai-labeling-board.js';

if (!customElements.get('ai-labeling-board')) {
  customElements.define('ai-labeling-board', AiLabelingBoard);
}

const labels = [
  { id: 'positive', name: 'Positive', color: '#4ade80' },
  { id: 'negative', name: 'Negative', color: '#f87171' },
];

describe('ai-labeling-board', () => {
  let el: AiLabelingBoard;

  beforeEach(async () => {
    el = document.createElement('ai-labeling-board') as AiLabelingBoard;
    el.labels = labels;
    el.items = [
      { id: '1', content: 'Great product', label: 'positive' },
      { id: '2', content: 'Needs work' },
    ];
    document.body.appendChild(el);
    await el.updateComplete;
  });

  afterEach(() => el.remove());

  it('has no nested interactive controls: rows are non-interactive listitems (F1)', () => {
    const rows = el.shadowRoot!.querySelectorAll('.item-row');
    rows.forEach((row) => {
      expect(row.getAttribute('role')).toBe('listitem');
      expect(row.getAttribute('tabindex')).toBe('-1');
      // exactly one button (the pill) per row
      const buttons = row.querySelectorAll('[role="button"]');
      expect(buttons.length).toBe(1);
    });
  });

  it('gives the items container role=list in list mode so listitems are valid (F4)', async () => {
    el.mode = 'list';
    await el.updateComplete;
    const container = el.shadowRoot!.querySelector('.items')!;
    expect(container.getAttribute('role')).toBe('list');
  });

  it('drops role=list in click mode (mirrors conditional listitem) (F4)', async () => {
    el.mode = 'click';
    await el.updateComplete;
    const container = el.shadowRoot!.querySelector('.items')!;
    expect(container.getAttribute('role')).toBeNull();
  });

  it('gives pills item-contextual accessible names (F3)', () => {
    const pills = el.shadowRoot!.querySelectorAll('.item-label-pill');
    const labeled = Array.from(pills).find((p) => !p.classList.contains('unlabeled'))!;
    const unlabeled = Array.from(pills).find((p) => p.classList.contains('unlabeled'))!;
    expect(labeled.getAttribute('aria-label')).toBe('Change label for: Great product');
    expect(unlabeled.getAttribute('aria-label')).toBe('Assign label to: Needs work');
  });

  it('uses an input surface (not a border token) for the select background (F2)', () => {
    const styleText = (el.constructor as typeof AiLabelingBoard).styles!.toString();
    expect(styleText).toContain('.label-select');
    expect(styleText).toContain('background: var(--cg-color-input-background-default)');
  });

  it('cycles a label when the pill is activated', async () => {
    const events: Array<{ itemId: string; labelId?: string }> = [];
    el.addEventListener('ai-label-assign', (e) => events.push((e as CustomEvent).detail));
    const unlabeledPill = Array.from(el.shadowRoot!.querySelectorAll('.item-label-pill'))
      .find((p) => p.classList.contains('unlabeled')) as HTMLElement;
    unlabeledPill.click();
    expect(events[0]?.itemId).toBe('2');
    expect(events[0]?.labelId).toBe('positive');
  });
});
